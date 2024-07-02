import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";

import { useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { useBenchmarkingSlideOver, useBenchmarkingToastOptions } from "../data-table/BenchmarkingDataTable";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { AlertNotification } from "@lms/components/osprey/ui/alert-notification/view/AlertNotification";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { EmployeeFlatWithSupervisor } from "@lms/utilities/types/training";

export const BenchmarkingRequirementsModal: FunctionComponent = () => {
  const title = useBenchmarkingStore((state) => state.title);
  const dateFrom = useBenchmarkingStore((state) => state.dateFrom);
  const dateTo = useBenchmarkingStore((state) => state.dateTo);
  const id = useBenchmarkingStore((state) => state.id);
  const [participantsCompleteCount, setParticipantsCompleteCount] = useState<number>(0);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [previousParticipants, setPreviousParticipants] = useState<Array<EmployeeFlatWithSupervisor>>([]);

  const {
    participantsModalIsOpen,
    setParticipantsModalIsOpen,
    hasFetchedParticipantsWithRequirements,
    setHasFetchedParticipantsWithRequirements,
    participantsWithRequirements,
    setParticipantsWithRequirements,
  } = useBenchmarkingSlideOver();

  const { setToastOptions } = useBenchmarkingToastOptions();

  // query id
  const { data, isLoading, isFetching, isError, isFetched } = useQuery({
    queryKey: ["benchmarking-participant-requirements", id],
    enabled: !!id && hasFetchedParticipantsWithRequirements !== true && participantsModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/benchmark/${id}/participant/requirements`);
      return data;
    },
    onSuccess: (data) => {
      let count: number = 0;
      data.map((emp: any) => {
        if (emp.learningApplicationPlan === true) {
          count++;
        }
      });

      setParticipantsCompleteCount(count);
      setParticipantsWithRequirements(data);
      setHasFetchedParticipantsWithRequirements(true);
    },
    onError: () => {
      setParticipantsWithRequirements([]);
    },
  });

  // per checkbox on change
  const onChangeRequirements = (emp_idx: number) => {
    const newParticipantsWithRequirements = [...participantsWithRequirements];
    newParticipantsWithRequirements[emp_idx].learningApplicationPlan =
      !newParticipantsWithRequirements[emp_idx].learningApplicationPlan;

    setParticipantsWithRequirements(newParticipantsWithRequirements);
    counter(newParticipantsWithRequirements);

    if (participantsCompleteCount! == participantsWithRequirements.length) {
      setCheckAll(false);
    } else if (participantsCompleteCount === participantsWithRequirements.length) {
      setCheckAll(true);
    }
  };

  // counts the number of participants who accomplished
  const counter = (participants: Array<EmployeeFlatWithSupervisor>) => {
    let count: number = 0;
    participants.map((emp: any) => {
      if (emp.learningApplicationPlan === true) {
        count++;
      }
    });

    setParticipantsCompleteCount(count);
  };

  // check all checkboxes
  const checkAllCheckboxes = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setPreviousParticipants(participantsWithRequirements);

      const newParticipants = [...participantsWithRequirements];
      setParticipantsWithRequirements(
        newParticipants.map((emp) => {
          return { ...emp, learningApplicationPlan: true };
        })
      );

      counter(
        newParticipants.map((emp) => {
          return { ...emp, learningApplicationPlan: true };
        })
      );

      // reverse
      setCheckAll(true);
    } else {
      setParticipantsWithRequirements(previousParticipants);

      counter(previousParticipants);
      setCheckAll(false);
    }
  };

  // mutate function
  const participantsMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(
        `${url}/benchmark/${id}/participant/requirements`,
        {
          participants: participantsWithRequirements.map((participant) => {
            return {
              benchmarkParticipants: participant.benchmarkParticipants,
              learningApplicationPlan: participant.learningApplicationPlan,
            };
          }),
        },
        { withCredentials: true }
      );

      return data;
    },
    onSuccess: () => {
      setCheckAll(false);
      setToastOptions("success", "Success", "You have successfully updated the participants requirements.");
      setParticipantsModalIsOpen(false);
      setHasFetchedParticipantsWithRequirements(false);
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong. Please try again in a few seconds.");
    },
  });

  return (
    <>
      <Modal
        isOpen={participantsModalIsOpen}
        setIsOpen={setParticipantsModalIsOpen}
        size="3md"
        isStatic
        animate={false}
        onClose={() => {
          setCheckAll(false);
          setHasFetchedParticipantsWithRequirements(false);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
              <div className="flex gap-2">
                {dayjs(dateFrom).isSame(dayjs(dateTo), "day") === true ? (
                  <span className="text-sm text-gray-600">{dayjs(dateFrom).format("MMM DD, YYYY")}</span>
                ) : dayjs(dateFrom).isSame(dayjs(dateTo), "day") === false ? (
                  <span className="text-sm text-gray-600">
                    {dayjs(dateFrom).format("MMM DD, YYYY")}-{dayjs(dateTo).format("MMM DD, YYYY")}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="max-h-[44rem] relative">
              <div className="sticky top-0 z-[50]">
                <AlertNotification
                  alertType={
                    participantsCompleteCount / participantsWithRequirements.length >= 0.5 &&
                    participantsCompleteCount / participantsWithRequirements.length < 1
                      ? "warning"
                      : participantsCompleteCount / participantsWithRequirements.length < 0.5
                      ? "error"
                      : participantsCompleteCount / participantsWithRequirements.length === 1
                      ? "success"
                      : "info"
                  }
                  notifMessage={`${participantsCompleteCount} out of ${participantsWithRequirements.length} ${
                    participantsWithRequirements.length > 1 ? "participants" : "participant"
                  } completed all the requirements`}
                  className="w-auto flex"
                />
              </div>
              {!data || isLoading || isFetching ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-center w-full h-full">
                    <Spinner size="medium" />
                  </div>
                  <div className="flex items-center justify-center w-full h-full font-sans tracking-widest animate-pulse">
                    Loading...
                  </div>
                </div>
              ) : isError ? (
                <></>
              ) : isFetched ? (
                <>
                  <div className="flex w-full px-2 justify-end">
                    <div>
                      <label
                        htmlFor="checkbox-lap-all"
                        className="text-xs pr-2 select-none cursor-pointer text-gray-700 w-[5rem] "
                      >
                        {checkAll ? "Undo" : "Check all"}
                      </label>
                      <Checkbox
                        id="checkbox-lap-all"
                        checked={checkAll ? true : false}
                        onChange={(e) => checkAllCheckboxes(e)}
                      />
                    </div>
                  </div>
                  <div className="relative overflow-x-auto rounded-lg shadow-md">
                    <table className="w-full  ">
                      {/* <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500"> */}
                      <thead className="text-gray-700 bg-gray-300">
                        <tr className="text-sm">
                          <th className="p-2 font-medium border"></th>
                          <th className="p-2 font-medium border">Employee Name</th>

                          <th className="p-2 font-medium border">Learner's Journal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participantsWithRequirements &&
                          participantsWithRequirements.map((employee, emp_idx) => {
                            return (
                              <tr
                                className={`hover:cursor-pointer ${
                                  employee.learningApplicationPlan === true
                                    ? "bg-emerald-200 hover:bg-emerald-100 "
                                    : "even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80 "
                                }`}
                                onClick={() => onChangeRequirements(emp_idx)}
                                key={employee.employeeId}
                              >
                                <td className={`p-2 font-light border border-gray-300 text-center `}>
                                  <span className="text-xs ">{emp_idx + 1}</span>
                                </td>
                                <td
                                  className={`p-2 text-sm font-light text-gray-900 border border-gray-300  text-left px-2  `}
                                >
                                  {employee.name}
                                </td>

                                <td
                                  className={`p-2 text-sm font-light  text-center items-center border border-gray-300  `}
                                  key={employee.employeeId}
                                >
                                  <Checkbox
                                    id={`checkbox-${employee.employeeId}-lap`}
                                    checked={employee.learningApplicationPlan ? true : false}
                                  />
                                </td>

                                {/* <td className="text-sm text-center text-gray-600 border hover:cursor-pointer">-</td> */}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : null}
            </main>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex justify-end">
              <Button onClick={() => participantsMutation.mutateAsync()}>Submit</Button>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
