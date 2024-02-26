import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import dayjs from "dayjs";
import { FunctionComponent, Suspense, useContext, useEffect, useState } from "react";
import { RecentContext } from "../../recent-data-table/RecentDataTable";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { EmployeeAttendance } from "../slideover/EmployeeAttendance";
import { BatchEmployee, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";

const ListOfAllRequirements = [
  { document: "Pre-test" },
  { document: "Course Materials" },
  { document: "Post Training Report" },
  { document: "Course Evaluation Report" },
  { document: "Learning Application Plan" },
  { document: "Post-test" },
];

export const RecentRequirementsModal: FunctionComponent = () => {
  const { batches, requirementsModalIsOpen, setRequirementsModalIsOpen } = useContext(RecentContext);
  const trainingRequirements = useTrainingNoticeStore((state) => state.trainingRequirements);
  const [employeeAttendance, setEmployeeAttendance] = useState<BatchEmployee[]>([]);

  // useEffect(() => {
  //   if (batchAttendanceIsOpen) {
  //     const newSelectedBatchEmployees = selectedBatch.employees.map((employee) => {
  //       return { ...employee, isCompleteAttendance: employee.isCompleteAttendance ?? false };
  //     });
  //     console.log("HERE");
  //     setEmployeeAttendance(newSelectedBatchEmployees ?? []);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 300);
  //   }
  // }, [selectedBatch.employees, batchAttendanceIsOpen]);

  useEffect(() => {}, [batches]);

  return (
    <Modal isOpen={requirementsModalIsOpen} setIsOpen={setRequirementsModalIsOpen} size="xl">
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
            {/* { document: "Pre-test", isSelected: false },
                      { document: "Course Materials", isSelected: false },
                    { document: "Post Training Report", isSelected: false },
                      { document: "Course Evaluation Report", isSelected: false },
                      { document: "Learning Application Plan", isSelected: false },
                      { document: "Post-test", isSelected: false }, */}
            <div className="px-3 py-5">
              <div className="relative overflow-x-auto rounded-lg shadow-md ">
                <table className="w-full table-fixed">
                  <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500">
                    <tr>
                      <th className="p-2 font-medium border">Participant Name</th>
                      <th className="p-2 font-medium border">Complete Attendance</th>
                      <th className="p-2 font-medium border">Pre-test</th>
                      <th className="p-2 font-medium border">Course Materials</th>
                      <th className="p-2 font-medium border">Post Training Report</th>
                      <th className="p-2 font-medium border">Course Evaluation Report</th>
                      <th className="p-2 font-medium border">Learning Application Plan</th>
                      <th className="p-2 font-medium border">Post-test</th>
                      <th className="p-2 font-medium border">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch) => {
                      return batch.employees.map((employee, emp_idx) => {
                        return (
                          <tr
                            className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/50"
                            key={employee.employeeId}
                          >
                            <td className="p-2 text-sm font-light border ">{employee.name}</td>
                            <td
                              className="text-center border hover:bg-indigo-200 "
                              // onClick={() => onChangeAttendance(idx)}
                            >
                              <Checkbox
                                id={`checkbox-${emp_idx}`}
                                checked={employee.isCompleteAttendance}
                                readOnly
                                // onChange={() => onChangeAttendance(idx)}
                              />
                            </td>
                            <td className="text-center border hover:bg-indigo-200">
                              <Checkbox
                                id={`checkbox-pt-${emp_idx}`}
                                // checked={employee.isCompleteAttendance}
                                readOnly
                                // onChange={() => onChangeAttendance(idx)}
                              />
                            </td>
                            <td className="text-center border hover:bg-indigo-200">
                              <Checkbox
                                id={`checkbox-cm-${emp_idx}`}
                                // checked={employee.isCompleteAttendance}
                                readOnly
                                // onChange={() => onChangeAttendance(idx)}
                              />
                            </td>
                            <td className="text-center border hover:bg-indigo-200">
                              <Checkbox
                                id={`checkbox-ptr-${emp_idx}`}
                                // checked={employee.isCompleteAttendance}
                                readOnly
                                // onChange={() => onChangeAttendance(idx)}
                              />
                            </td>
                            <td className="text-center border hover:bg-indigo-200">
                              <Checkbox
                                id={`checkbox-cer-${emp_idx}`}
                                // checked={employee.isCompleteAttendance}
                                readOnly
                                // onChange={() => onChangeAttendance(idx)}
                              />
                            </td>
                            <td className="text-center border hover:bg-indigo-200">
                              <Checkbox
                                id={`checkbox-lap-${emp_idx}`}
                                // checked={employee.isCompleteAttendance}
                                readOnly
                                // onChange={() => onChangeAttendance(idx)}
                              />
                            </td>
                            <td className="text-center border hover:bg-indigo-200">
                              <Checkbox
                                id={`checkbox-postt-${emp_idx}`}
                                // checked={employee.isCompleteAttendance}
                                readOnly
                                // onChange={() => onChangeAttendance(idx)}
                              />
                            </td>
                            <td className="text-sm text-center text-gray-600 border hover:cursor-pointer">
                              Incomplete
                            </td>
                          </tr>
                        );
                      });
                    })}

                    {employeeAttendance?.map((employee, idx) => {
                      return (
                        <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80" key={employee.employeeId}>
                          <td className="p-2 text-sm font-light border ">{employee.name}</td>
                          <td
                            className="text-center border hover:bg-indigo-200 "
                            // onClick={() => onChangeAttendance(idx)}
                          >
                            <Checkbox
                              id={`checkbox-${idx}`}
                              checked={employee.isCompleteAttendance}
                              readOnly
                              // onChange={() => onChangeAttendance(idx)}
                            />
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
          {/* <div className="flex justify-end w-full">
            <Button
              onClick={() => {
                // set this to false
                setRequirementsModalIsOpen(false);
              }}
            >
              Apply
            </Button>
          </div> */}
        </ModalContent.Footer>
      </ModalContent>
    </Modal>
  );
};
