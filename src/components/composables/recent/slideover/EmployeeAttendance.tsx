import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { BatchEmployee, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { ListOfAllRequirements } from "../modal/RecentRequirementsModal";
type EmployeeAttendanceProps = {
  employeeAttendance: Array<BatchEmployee>;
  setEmployeeAttendance: Dispatch<SetStateAction<Array<BatchEmployee>>>;
};

export const EmployeeAttendance: FunctionComponent<EmployeeAttendanceProps> = ({
  employeeAttendance,
  setEmployeeAttendance,
}) => {
  const trainingRequirements = useTrainingNoticeStore((state) => state.trainingRequirements);

  const onChangeAttendance = (idx: number) => {
    const newEmployeeAttendance = [...employeeAttendance];
    newEmployeeAttendance[idx].isCompleteAttendance = !newEmployeeAttendance[idx].isCompleteAttendance;
    setEmployeeAttendance(newEmployeeAttendance);
  };

  return (
    <div className="px-3 py-5">
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-fixed ">
          <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500">
            <tr>
              <th className="p-2 font-medium border">Employee Name</th>
              {ListOfAllRequirements.map((req, idx) => {
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
            {employeeAttendance?.map((employee, emp_idx) => {
              return (
                <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/50 " key={employee.employeeId}>
                  <td className="p-2 text-sm font-light border text-center">{employee.name}</td>

                  {/* <td className="text-center border hover:bg-indigo-200">
                    {trainingRequirements.some((element) => element.document === "Pre-test") === true ? (
                      <Checkbox
                        id={`checkbox-pt-${emp_idx}`}
                        // checked={employee.isCompleteAttendance}
                        readOnly
                        // onChange={() => onChangeAttendance(idx)}
                      />
                    ) : (
                      <div className="flex w-full h-full bg-black"></div>
                    )}
                  </td> */}
                  {ListOfAllRequirements.map((req, idx) => {
                    return (
                      <td key={idx} className="text-center border hover:bg-indigo-200">
                        <Checkbox
                          id={`checkbox-${req.document.toLowerCase()}-${idx}`}
                          // checked={employee.isCompleteAttendance}
                          readOnly
                          // onChange={() => onChangeAttendance(idx)}
                        />
                      </td>
                    );
                  })}

                  {/* <td className="text-center border hover:bg-indigo-200">
                    {trainingRequirements.some((element) => element.document === "Post-test") === true ? (
                      <Checkbox
                        id={`checkbox-postt-${emp_idx}`}
                        // checked={employee.isCompleteAttendance}
                        readOnly
                        // onChange={() => onChangeAttendance(idx)}
                      />
                    ) : (
                      <div className="flex w-full h-full bg-black"></div>
                    )}
                  </td> */}
                  <td className="text-sm text-center text-gray-600 border hover:cursor-pointer">Incomplete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
