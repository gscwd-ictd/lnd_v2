"use client";

import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { Batch, useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { BatchNumbering } from "./BatchNumbering";
import { EmployeeWithSupervisor, TrainingStatus } from "@lms/utilities/types/training";
import dayjs from "dayjs";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Button } from "@lms/components/osprey/ui/button/view/Button";

export const BatchModal: FunctionComponent = () => {
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const trainingStart = useTrainingNoticeStore((state) => state.trainingStart);
  const trainingEnd = useTrainingNoticeStore((state) => state.trainingEnd);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [hasFetchedDetails, setHasFetchedDetails] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // this function checks if a batch is empty
  const checkBatchForEmptyEmployees = (batches: Batch[]) => {
    let emptyEmployeesBatch: number = 0;
    batches.map((batch) => {
      if (batch.employees.length === 0) emptyEmployeesBatch++;
      return batch;
    });

    return emptyEmployeesBatch;
  };

  // set the toast option according to the type color, and title
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const {
    id,
    employeePool,
    batches,
    trainingStatus,
    setTrainingStatus,
    setBatches,
    setEmployeePool,
    setTotalSelectedEmployees,
    batchingModalIsOpen,
    setBatchingModalIsOpen,
  } = useContext(TrainingNoticeContext);

  // execute this function when submit is clicked
  const submitBatching = useMutation({
    mutationFn: async (batches: Batch[]) => {
      const newBatches = batches.map((batch) => {
        const { isOneDayTraining, ...restOfBatch } = batch;
        const emp = restOfBatch.employees.map((employee) => {
          return { nomineeId: employee.nomineeId };
        });
        return { ...restOfBatch, employees: emp };
      });

      const trainingWithBatches = {
        trainingId: id,
        batches: newBatches,
      };

      const data = await axios.post(`${url}/training-nominees/batch`, trainingWithBatches, { withCredentials: true });
      return data;
    },

    onSuccess: async () => {
      setBatchingModalIsOpen(false);

      const getTrainingNotice = await axios.get(`${url}/training-details`, { withCredentials: true });

      queryClient.setQueryData(["training-notice"], getTrainingNotice.data.items);

      setToastOptions("success", "Success", "The changes you've made have been saved.");
      setHasFetchedDetails(false);
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong. Please try again later");
    },
  });

  // execute this function when submit is clicked
  const updateBatching = useMutation({
    mutationFn: async (batches: Batch[]) => {
      const newBatches = batches.map((batch) => {
        const { isOneDayTraining, ...restOfBatch } = batch;
        const emp = restOfBatch.employees.map((employee) => {
          return { nomineeId: employee.nomineeId };
        });
        return { ...restOfBatch, employees: emp };
      });
      const trainingWithBatches = {
        trainingId: id,
        batches: newBatches,
      };

      const data = await axios.patch(`${url}/training-nominees/batch`, trainingWithBatches, { withCredentials: true });
      return data;
    },

    onSuccess: () => {
      setBatchingModalIsOpen(false);
      setTotalSelectedEmployees([]);
      setToastOptions("success", "Success", "The changes you've made have been saved.");
      setHasFetchedDetails(false);
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong. Please try again later");
    },
  });

  // this is to fetch the training details
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["training-details", trainingNoticeId],
    enabled: !!trainingNoticeId && batchingModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${url}/training-details/${id}`, { withCredentials: true });
        setHasFetchedDetails(true);
        if (!isEmpty(data)) {
          setNumberOfParticipants(data.numberOfParticipants);
          setCourseTitle(data.courseTitle);
          setTrainingStart(data.trainingStart);
          setTrainingEnd(data.trainingEnd);
          setBatches([{ batchNumber: 1, employees: [], trainingDate: { from: "", to: "" }, isOneDayTraining: false }]);
        }
        return data;
      } catch (error) {
        return error;
      }
    },
  });

  // this is to check if the status for batching and fetch the accepted nominees
  useQuery({
    queryKey: ["training-details-nominees-accepted", trainingNoticeId],
    enabled:
      !!trainingNoticeId &&
      hasFetchedDetails === true &&
      batchingModalIsOpen !== false &&
      trainingStatus === TrainingStatus.FOR_BATCHING,

    onError: () => {
      setToastOptions("danger", "Error", "Failed to fetch accepted nominees. Please try again later");
    },
    onSuccess: () => {
      setToastOptions("success", "Success", "Fetched the accepted nominees.");
    },
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data: acceptedNominees } = (await axios.get(`${url}/training-nominees/${id}/accepted`, {
          withCredentials: true,
        })) as any;
        setEmployeePool(acceptedNominees);
        setTotalSelectedEmployees([]);

        return acceptedNominees;
      } catch (error) {
        return error;
      }
    },
  });

  // this is to check the status if it already has batching and fetch the batches
  useQuery({
    queryKey: ["training-details-nominees-batches", trainingNoticeId],
    enabled:
      !!trainingNoticeId &&
      hasFetchedDetails === true &&
      batchingModalIsOpen !== false &&
      trainingStatus === TrainingStatus.DONE_BATCHING,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training-nominees/${id}/batch`);

      let updatedSelectedEmployees: EmployeeWithSupervisor[] = [];
      const fetchedBatches = data.map((batch: Batch) => {
        if (batch.employees) {
          updatedSelectedEmployees.push(...batch.employees);
        }
        return {
          batchNumber: batch.batchNumber,
          trainingDate: {
            from: dayjs(batch.trainingDate.from).format("YYYY-MM-DD hh:mm"),
            to: dayjs(batch.trainingDate.to).format("YYYY-MM-DD hh:mm"),
          },
          isOneDayTraining:
            dayjs(batch.trainingDate.from).isSame(dayjs(batch.trainingDate.to), "day") === true ? true : false,
          employees: batch.employees,
        };
      });

      setBatches(fetchedBatches);

      setTotalSelectedEmployees(updatedSelectedEmployees.sort((a, b) => (a.name > b.name ? 1 : -1)));
      setEmployeePool([]);

      return batches;
    },
  });

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingNoticeId) && !isEmpty(id)) {
      setTrainingNoticeId(id);
    }
  }, [id, trainingNoticeId, batchingModalIsOpen]);

  return (
    <>
      <Modal
        isOpen={batchingModalIsOpen}
        setIsOpen={setBatchingModalIsOpen}
        size="3md"
        animate={false}
        isStatic
        onClose={() => {
          setTrainingNoticeId(null);
          setHasFetchedDetails(false);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="px-8">
              <div className="flex items-start gap-2">
                <h3 className="text-2xl font-sans font-bold text-gray-700 ">{courseTitle}</h3>
              </div>

              {isEmpty(trainingStart) ? null : (
                <div className="flex text-sm text-center font-sans">
                  <div className="text-gray-600 ">{dayjs(trainingStart).format("MMMM DD, YYYY")}</div>
                  <div>
                    &nbsp;
                    {dayjs(trainingStart).format("MMMM DD, YYYY") !== dayjs(trainingEnd).format("MMMM DD, YYYY") &&
                      "to"}
                    &nbsp;
                  </div>
                  {dayjs(trainingStart).format("MMMM DD, YYYY") !== dayjs(trainingEnd).format("MMMM DD, YYYY") && (
                    <div className="text-gray-600 ">{dayjs(trainingEnd).format("MMMM DD, YYYY")}</div>
                  )}
                </div>
              )}
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="space-y-4">
              {/* <BatchNumbering /> */}

              {isLoading || isEmpty(data) || isFetching ? (
                <div className="flex justify-center w-full h-full overflow-hidden">
                  <Spinner borderSize={4} size="large" />
                </div>
              ) : (
                <BatchNumbering />
              )}
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-5 pt-2 pb-5">
              <div className="flex items-center justify-end w-full gap-2">
                {trainingStatus === TrainingStatus.FOR_BATCHING ? (
                  <Button
                    variant="solid"
                    size="default"
                    disabled={employeePool.length === 0 ? false : true}
                    onClick={() => {
                      if (checkBatchForEmptyEmployees(batches) > 0)
                        setToastOptions(
                          "danger",
                          "Error",
                          ` ${
                            checkBatchForEmptyEmployees(batches) > 1
                              ? `${checkBatchForEmptyEmployees(batches)} batches are empty. Please check your input.`
                              : "A batch is empty. Please check your input."
                          }`
                        );
                      else submitBatching.mutateAsync(batches);
                    }}
                  >
                    Submit
                  </Button>
                ) : trainingStatus === TrainingStatus.DONE_BATCHING ? (
                  <Button
                    variant="solid"
                    size="default"
                    disabled={employeePool.length === 0 ? false : true}
                    onClick={() => {
                      if (checkBatchForEmptyEmployees(batches) > 0)
                        setToastOptions(
                          "danger",
                          "Error",
                          ` ${
                            checkBatchForEmptyEmployees(batches) > 1
                              ? `${checkBatchForEmptyEmployees(batches)} batches are empty. Please check your input.`
                              : "A batch is empty. Please check your input."
                          }`
                        );
                      else updateBatching.mutateAsync(batches);
                    }}
                  >
                    Update
                  </Button>
                ) : null}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
      <Toast
        duration={2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};
