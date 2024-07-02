import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import dayjs from "dayjs";
import { FunctionComponent, Suspense, useContext, useState } from "react";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { AlertNotification } from "@lms/components/osprey/ui/alert-notification/view/AlertNotification";
import { TrainingRequirement } from "@lms/utilities/stores/training-notice-store";
import { HistoryContext } from "../../history-data-table/HistoryDataTable";
import { BatchWithEmployees, EmployeeWithRequirements } from "../../recent-data-table/RecentDataTable";

export const HistoryRequirementsSummaryModal: FunctionComponent = () => {
  const { requirementsModalIsOpen, setRequirementsModalIsOpen, id, requirements } = useContext(HistoryContext);
  const [employeeWithRequirements, setEmployeeWithRequirements] = useState<Array<EmployeeWithRequirements>>([]);
  const [attendeesCount, setattendeesCount] = useState<number>(0);
  const [attendeesCompleteCount, setattendeesCompleteCount] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ["training-requirements", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${id}/requirements`);
      if (data?.batches.length > 0) {
        let attendeesCount: number = 0;
        let attendeesCompleteCount: number = 0;
        let allEmployees: Array<EmployeeWithRequirements> = [];
        data.batches.map((batch: BatchWithEmployees) => {
          // map per employee
          batch.employees.map((emp) => {
            let employeeStatusCount: number = 0;
            let employeeStatus: string = "";
            let employeeRequirementsCount: number = 0;

            // map per employee requirement
            emp.requirements
              .sort((a, b) => (a.document > b.document ? 1 : -1))
              .map((req) => {
                if (req.isSelected === true) employeeStatusCount++;
                if (req.isSelected !== null) employeeRequirementsCount++;
              });

            if (employeeStatusCount === employeeRequirementsCount) {
              employeeStatus = "Complete";
              attendeesCompleteCount++;
            } else employeeStatus = "Incomplete";
            attendeesCount++;
            return allEmployees.push({ ...emp, status: employeeStatus });
          });
        });
        setattendeesCompleteCount(attendeesCompleteCount);
        setattendeesCount(attendeesCount);
        setEmployeeWithRequirements(allEmployees);
      }
      return data;
    },
    enabled: !!id && requirementsModalIsOpen !== false,
  });

  return (
    <Modal
      isOpen={requirementsModalIsOpen}
      setIsOpen={setRequirementsModalIsOpen}
      size={requirements.length > 5 ? "xl" : "lg"}
    >
      <ModalContent>
        <ModalContent.Title>
          <div className="px-10 py-3">
            <p className="text-lg font-semibold text-gray-700">Requirements Summary</p>
            <div className="flex gap-2"></div>
          </div>
        </ModalContent.Title>
        <ModalContent.Body>
          <div className="px-10  w-auto flex">
            <AlertNotification
              alertType="info"
              notifMessage={`${attendeesCompleteCount} out of ${attendeesCount} ${
                attendeesCount > 1 ? "attendees" : "attendee"
              } completed all the requirements`}
            />
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center w-full h-full">
                <Spinner />
              </div>
            }
          >
            <div className="px-10 py-5">
              <div className="relative overflow-x-auto rounded-lg shadow-md ">
                <table className="w-full table-fixed">
                  {/* <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500"> */}
                  <thead className="text-gray-700 bg-gray-300">
                    <tr className="text-sm">
                      <th className="p-2 font-medium border ">Employee Name</th>

                      {data?.requirements
                        .sort((a: TrainingRequirement, b: TrainingRequirement) => (a.document > b.document ? 1 : -1))
                        .map((req: TrainingRequirement, idx: number) => {
                          if (req.isSelected !== null)
                            return (
                              <th key={idx} className="p-2 font-medium border">
                                {req.document}
                              </th>
                            );
                        })}
                      <th className="p-2 font-medium border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeWithRequirements?.map((employee) => {
                      return (
                        <tr
                          className={`${
                            employee.status === "Complete"
                              ? "bg-emerald-200/70 "
                              : "even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80 "
                          }`}
                          key={employee.employeeId}
                        >
                          <td className="p-2 text-sm font-light border text-center items-center border-gray-300">
                            {employee.name}
                          </td>
                          {employee.requirements
                            // .filter((req) => req.isSelected === null)
                            .sort((a, b) => (a.document > b.document ? 1 : -1))
                            .map((requirements, idx) => {
                              if (requirements.isSelected !== null)
                                return (
                                  <td
                                    className="p-2 text-sm font-light  text-center items-center border border-gray-300 hover:bg-indigo-200 "
                                    key={idx}
                                  >
                                    <Checkbox
                                      id={`checkbox-${idx}-${requirements.document.toLowerCase()}`}
                                      checked={requirements.isSelected ? true : false}
                                      readOnly
                                    />
                                  </td>
                                );
                            })}
                          <td className="p-2  border border-gray-300 items-center text-center select-none">
                            <span
                              className={`${employee.status === "Complete" ? "text-emerald-700" : "text-gray-500"}`}
                            >
                              {employee.status}
                            </span>
                            {/* <span>{employee.status}</span> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Suspense>
        </ModalContent.Body>
        <ModalContent.Footer>
          <div className="flex justify-end gap-2 px-10 py-3">
            {/* <button className="text-white bg-red-500 rounded w-[15rem] px-3 py-3 uppercase text-center text-md">
              Close this Training
            </button> */}
          </div>
        </ModalContent.Footer>
      </ModalContent>
    </Modal>
  );
};
