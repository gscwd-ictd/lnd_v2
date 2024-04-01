import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import dayjs from "dayjs";
import { FunctionComponent, Suspense, useContext, useEffect, useState } from "react";
import {
  BatchWithEmployees,
  EmployeeWithRequirements,
  NewTrainingRequirements,
  RecentContext,
} from "../../recent-data-table/RecentDataTable";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";

export const RecentRequirementsModal: FunctionComponent = () => {
  const { requirementsModalIsOpen, setRequirementsModalIsOpen, id, requirements } = useContext(RecentContext);
  const [employeeWithRequirements, setEmployeeWithRequirements] = useState<Array<EmployeeWithRequirements>>([]);

  const { data } = useQuery({
    queryKey: ["training-requirements", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${id}/requirements`);
      if (data?.batches.length > 0) {
        let allEmployees: Array<EmployeeWithRequirements> = [];
        data.batches.map((batch: BatchWithEmployees) => {
          // map per employee
          batch.employees.map((emp) => {
            let employeeStatusCount: number = 0;
            let employeeStatus: string = "";

            // map per employee requirement
            emp.requirements.map((req) => {
              if (req.isSelected === true) {
                employeeStatusCount++;
              }
            });

            if (employeeStatusCount === emp.requirements.length) employeeStatus = "Complete";
            else employeeStatus = "Incomplete";

            return allEmployees.push({ ...emp, status: employeeStatus });
          });
        });

        setEmployeeWithRequirements(allEmployees);
      }
      return data;
    },
    enabled: !!id && requirementsModalIsOpen !== false,
  });

  // useEffect(() => {

  // }, [data]);

  return (
    <Modal
      isOpen={requirementsModalIsOpen}
      setIsOpen={setRequirementsModalIsOpen}
      size={requirements.length > 5 ? "xl" : "lg"}
    >
      <ModalContent>
        <ModalContent.Title>
          <div className="p-3">
            <p className="text-lg font-semibold text-gray-700">Requirements Summary</p>
            <div className="flex gap-2"></div>
          </div>
        </ModalContent.Title>
        <ModalContent.Body>
          <Suspense
            fallback={
              <div className="flex justify-center w-full h-full">
                <Spinner />
              </div>
            }
          >
            <div className="px-3 py-5">
              <div className="relative overflow-x-auto rounded-lg shadow-md ">
                <table className="w-full table-fixed">
                  <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500">
                    <tr>
                      <th className="p-2 font-medium border ">Employee Name</th>

                      {data?.requirements.map((req: NewTrainingRequirements, idx: number) => {
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
                        <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80" key={employee.employeeId}>
                          <td className="p-2 text-sm font-light border ">{employee.name}</td>
                          {employee.requirements.map((requirements, idx) => {
                            return (
                              <td
                                className="p-2 text-sm font-light  text-center items-center border hover:bg-indigo-200 "
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
                          <td className="p-2 text-sm font-light border items-center text-center ">{employee.status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Suspense>
        </ModalContent.Body>
        <ModalContent.Footer></ModalContent.Footer>
      </ModalContent>
    </Modal>
  );
};
