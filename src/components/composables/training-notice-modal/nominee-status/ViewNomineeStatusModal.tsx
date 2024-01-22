import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Recommendation, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { EmployeeWithStatus, EmployeeWithSupervisor, TrainingNomineeStatus } from "@lms/utilities/types/training";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

//todo REMOVE
// const employeesWithSupervisor: EmployeeWithSupervisor[] = [
//   {
//     employeeId: "001",
//     name: "Richard Vincent Narvaez",
//     status: TrainingNomineeStatus.PENDING,
//     supervisor: { supervisorId: "123", name: "Michael Gabales" },
//   },
//   {
//     employeeId: "002",
//     name: "Hafez Benanben Saiyou",
//     status: TrainingNomineeStatus.PENDING,
//     supervisor: { supervisorId: "123", name: "Michael Gabales" },
//   },
//   {
//     employeeId: "003",
//     name: "Jan Freigseg Lared",
//     status: TrainingNomineeStatus.DECLINED,
//     supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
//   },
//   {
//     employeeId: "004",
//     name: "Xavier Dale Dabuco",
//     status: TrainingNomineeStatus.PENDING,
//     supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
//   },
//   {
//     employeeId: "005",
//     name: "Paul Ryner Uchiha",
//     status: TrainingNomineeStatus.ACCEPTED,
//     supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
//   },
//   {
//     employeeId: "006",
//     name: "Joel Amoguis",
//     status: TrainingNomineeStatus.DECLINED,
//     supervisor: { supervisorId: "345", name: "Anjo Turija" },
//   },
//   {
//     employeeId: "007",
//     name: "Mark Leandre Gamutin",
//     status: TrainingNomineeStatus.ACCEPTED,
//     supervisor: { supervisorId: "345", name: "Anjo Turija" },
//   },
//   {
//     employeeId: "008",
//     name: "Ralph Mari Dayot",
//     status: TrainingNomineeStatus.ACCEPTED,
//     supervisor: { supervisorId: "345", name: "Anjo Turija" },
//   },
//   {
//     employeeId: "009",
//     name: "Louise Mae Soledad",
//     status: TrainingNomineeStatus.PENDING,
//     supervisor: { supervisorId: "345", name: "Anjo Turija" },
//   },
// ];

export const ViewNomineeStatusModal: FunctionComponent = () => {
  const setTrainingId = useTrainingNoticeStore((state) => state.setId);
  const [countEmployees, setCountEmployees] = useState<number>(0);
  const [acceptedEmployees, setAcceptedEmployees] = useState<EmployeeWithStatus[]>([]);
  const [nominatedEmployees, setNominatedEmployees] = useState<EmployeeWithStatus[]>([]);
  const [declinedEmployees, setDeclinedEmployees] = useState<EmployeeWithStatus[]>([]);
  const { id, nomineeStatusIsOpen, setNomineeStatusIsOpen, employeesWithStatus, setEmployeesWithStatus } =
    useContext(TrainingNoticeContext);
  const [countIsDone, setCountIsDone] = useState<boolean>(false);
  const trainingId = useTrainingNoticeStore((state) => state.id);

  // per training notice query
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["training-nominees", trainingId],
    enabled: !!trainingId && nomineeStatusIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training-nominees/${id}`)) as any;
        if (!isEmpty(data)) {
          setEmployeesWithStatus(data);
        }

        return data;
      } catch (error) {
        return error;
      }
    },
  });

  useEffect(() => {
    if (employeesWithStatus.length > 0 && countIsDone === false) {
      let tempCountEmployees = 0;
      let newAcceptedEmployees = [...acceptedEmployees];
      let newDeclinedEmployees = [...declinedEmployees];
      let newNominatedEmployees = [...nominatedEmployees];
      employeesWithStatus
        .map((employee) => {
          tempCountEmployees += 1;
          if (employee.status === TrainingNomineeStatus.ACCEPTED) {
            newAcceptedEmployees.push(employee);
          } else if (employee.status === TrainingNomineeStatus.DECLINED) {
            newDeclinedEmployees.push(employee);
          } else if (employee.status === TrainingNomineeStatus.PENDING) {
            newNominatedEmployees.push(employee);
          }

          return employee;
        })
        .sort((a, b) =>
          a.supervisor.name! > b.supervisor.name! ? -1 : a.supervisor.name! < b.supervisor.name! ? 1 : -1
        );

      setAcceptedEmployees(newAcceptedEmployees);
      setDeclinedEmployees(newDeclinedEmployees);
      setNominatedEmployees(newNominatedEmployees);
      setCountEmployees(tempCountEmployees);
      setCountIsDone(true);
    }
  }, [employeesWithStatus, countIsDone]);

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingId) && !isEmpty(id)) {
      setTrainingId(id);
    }
  }, [id, trainingId]);

  return (
    <>
      <Modal
        isOpen={nomineeStatusIsOpen}
        setIsOpen={setNomineeStatusIsOpen}
        size="2md"
        animate={false}
        isStatic
        onClose={() => {
          setTrainingId(null);
          setEmployeesWithStatus([]);
          setCountIsDone(false);
          setNomineeStatusIsOpen(false);
          setAcceptedEmployees([]);
          setDeclinedEmployees([]);
          setNominatedEmployees([]);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Training Nominee Status</h3>
              </div>
              <p className="text-sm text-gray-400">Details are as follows</p>
            </header>
          </ModalContent.Title>

          <ModalContent.Body>
            {isEmpty(data) || isLoading || isFetching ? (
              <div className="flex justify-center w-full h-full overflow-hidden">
                <Spinner size="large" borderSize={2} />
              </div>
            ) : (
              <main className="px-2 space-y-4">
                <div className="flex items-end justify-between">
                  <div className="flex flex-col border-4 border-dashed border-zinc-200 bg-zinc-50  w-[12rem] py-2 px-4 rounded">
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          className=" fill-green-500"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 uppercase">{acceptedEmployees.length} accepted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          className=" fill-gray-500"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 uppercase">{nominatedEmployees.length} pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          className=" fill-red-500"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 uppercase">{declinedEmployees.length} declined</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700">
                    <span className="font-medium text-md ">
                      {acceptedEmployees.length} out of {countEmployees} accepted
                    </span>
                  </div>
                </div>

                <div className="relative overflow-x-auto rounded-lg shadow-md">
                  <table className="w-full text-left table-fixed">
                    <thead className="text-white rounded-t bg-sky-600">
                      <tr>
                        <th className="p-2 font-medium border">Employee Name</th>
                        <th className="p-2 font-medium border">Supervisor</th>
                        <th className="p-2 font-medium text-center border">Status</th>
                        <th className="p-2 font-medium text-center border">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeesWithStatus.length > 0 &&
                        employeesWithStatus.map((employee) => {
                          return (
                            <tr className="even:bg-inherit odd:bg-zinc-50" key={employee.employeeId}>
                              <td className="p-2 text-sm font-light border ">{employee.name}</td>
                              <td className="p-2 text-sm font-light border ">{employee.supervisor.name}</td>
                              <td className="p-2 text-sm font-light border ">{BadgePill(employee.status!)}</td>
                              <td className="p-2 text-sm font-light text-center border ">
                                {employee.remarks ? (
                                  <Tooltip content={employee.remarks}>
                                    <div className="text-left truncate hover:cursor-wait">{employee.remarks}</div>
                                  </Tooltip>
                                ) : (
                                  <span className="text-center">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </main>
            )}
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  size="small"
                  variant="white"
                  onClick={() => {
                    setNomineeStatusIsOpen(false);
                    setTrainingId(null);
                    setEmployeesWithStatus([]);
                    setCountIsDone(false);
                    setAcceptedEmployees([]);
                    setDeclinedEmployees([]);
                    setNominatedEmployees([]);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};

const BadgePill = (status: TrainingNomineeStatus) => {
  if (status === TrainingNomineeStatus.PENDING)
    return (
      <div className="py-0.5 text-sm text-center bg-gray-300 rounded shadow-md font-medium border border-zinc-400 text-zinc-700">
        Pending
      </div>
    );
  else if (status === TrainingNomineeStatus.DECLINED)
    return (
      <div className="py-0.5 text-sm text-center bg-red-300 font-medium text-red-700  rounded shadow-md border border-red-500">
        Declined
      </div>
    );
  else if (status === TrainingNomineeStatus.ACCEPTED)
    return (
      <div className="py-0.5 text-sm text-center bg-green-300 font-medium border border-green-500 rounded shadow-md text-green-800">
        Accepted
      </div>
    );
};
