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
import { getCapitalizedTrainingType } from "@lms/utilities/functions/getTrainingTypeFromString";
import { BatchModalTraining } from "./BatchModalTraining";

export const BatchModal: FunctionComponent = () => {
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const trainingStart = useTrainingNoticeStore((state) => state.trainingStart);
  const trainingEnd = useTrainingNoticeStore((state) => state.trainingEnd);
  const numberOfHours = useTrainingNoticeStore((state) => state.numberOfHours);
  const location = useTrainingNoticeStore((state) => state.location);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const selectedFacilitators = useTrainingNoticeStore((state) => state.selectedFacilitators);
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const setLocation = useTrainingNoticeStore((state) => state.setLocation);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setSelectedTags = useTrainingNoticeStore((state) => state.setSelectedTags);
  const setNumberOfHours = useTrainingNoticeStore((state) => state.setNumberOfHours);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const setSelectedFacilitators = useTrainingNoticeStore((state) => state.setSelectedFacilitators);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);

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
    batchingModalIsOpen,
    setBatches,
    setEmployeePool,
    setTrainingStatus,
    setTotalSelectedEmployees,
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

      const data = await axios.post(`${url}/training/batch`, trainingWithBatches, { withCredentials: true });
      return data;
    },

    onSuccess: async () => {
      setBatchingModalIsOpen(false);

      const getTrainingNotice = await axios.get(`${url}/training`, { withCredentials: true });

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

      const data = await axios.patch(`${url}/training/batch`, trainingWithBatches, { withCredentials: true });
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
  const { isLoading, isFetching, data, isError } = useQuery({
    queryKey: ["training-details", trainingNoticeId],
    enabled: !!trainingNoticeId && batchingModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${id}`, { withCredentials: true });
      setNumberOfParticipants(data.numberOfParticipants);
      setCourseTitle(data.courseTitle);
      setTrainingStart(data.trainingStart);
      setTrainingEnd(data.trainingEnd);
      setBatches([{ batchNumber: 1, employees: [], trainingDate: { from: "", to: "" }, isOneDayTraining: false }]);
      setNumberOfHours(data.numberOfHours);
      setSelectedTags(data.trainingTags);
      setLocation(data.location);
      setSelectedTrainingType(data.type);
      setSelectedFacilitators(data.trainingLspDetails);
      return data;
    },
    onSuccess: () => {
      setHasFetchedDetails(true);
    },
    onError: () => {
      setHasFetchedDetails(false);
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
      const { data: acceptedNominees } = await axios.get(`${url}/training/${id}/nominees/accepted`, {
        withCredentials: true,
      });
      console.log(acceptedNominees);
      setEmployeePool(acceptedNominees);
      setTotalSelectedEmployees([]);

      return acceptedNominees;
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
      const { data } = await axios.get(`${url}/training/${id}/batch`);

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
        size="lg"
        animate={false}
        isStatic
        onClose={() => {
          setTrainingNoticeId(null);
          setHasFetchedDetails(false);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            {/* <header className="px-8">
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
            </header> */}
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="max-h-[34rem]">
              {/* <BatchNumbering /> */}

              {isLoading || isFetching ? (
                <Spinner size="medium" />
              ) : isError ? (
                <div className="h-full flex justify-center items-center">
                  Something went wrong. Please try again in a few seconds.
                </div>
              ) : !isLoading && !isFetching && !isEmpty(data) ? (
                <div className="flex grid-cols-2 w-full px-3">
                  {/* COL 1 */}
                  <div className="w-[35%] px-2 font-sans">
                    <BatchModalTraining />
                  </div>

                  <div className="w-[65%] rounded-md p-3 border-2 border-dashed">
                    <BatchNumbering />
                  </div>
                </div>
              ) : null}
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-3 pt-2 pb-5">
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
