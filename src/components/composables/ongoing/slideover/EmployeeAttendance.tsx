import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { BatchEmployee } from "@lms/utilities/stores/training-notice-store";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
type EmployeeAttendanceProps = {
  employeeAttendance: Array<BatchEmployee>;
  setEmployeeAttendance: Dispatch<SetStateAction<Array<BatchEmployee>>>;
};

export const EmployeeAttendance: FunctionComponent<EmployeeAttendanceProps> = ({
  employeeAttendance,
  setEmployeeAttendance,
}) => {
  const onChangeAttendance = (idx: number) => {
    const newEmployeeAttendance = [...employeeAttendance];
    newEmployeeAttendance[idx].isCompleteAttendance = !newEmployeeAttendance[idx].isCompleteAttendance;
    setEmployeeAttendance(newEmployeeAttendance);
  };

  return (
    <div className="p-2">
      <table className="w-full ">
        <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500">
          <tr>
            <th className="p-2 font-medium border">Participant Name</th>

            <th className="p-2 font-medium border">Complete attendance?</th>
          </tr>
        </thead>
        <tbody>
          {employeeAttendance?.map((employee, idx) => {
            return (
              <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80" key={employee.employeeId}>
                <td className="p-2 text-sm font-light border ">{employee.name}</td>
                <td className="text-center border hover:cursor-pointer " onClick={() => onChangeAttendance(idx)}>
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
  );
};
