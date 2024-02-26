import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { BatchEmployee, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
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
              <th className="p-2 font-medium border">Participant Name</th>
              <th className="p-2 font-medium border">Complete attendance?</th>
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
            {employeeAttendance?.map((employee, emp_idx) => {
              return (
                <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/50 " key={employee.employeeId}>
                  <td className="p-2 text-sm font-light border ">{employee.name}</td>
                  <td
                    className="text-center border hover:bg-indigo-200"
                    // onClick={() => onChangeAttendance(idx)}
                  >
                    <Checkbox
                      className=""
                      id={`checkbox-${emp_idx}`}
                      // checked={employee.isCompleteAttendance}
                      readOnly
                      // onChange={() => onChangeAttendance(idx)}
                    />
                  </td>
                  <td className="text-center border hover:bg-indigo-200">
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
                  </td>
                  <td className="text-center border hover:bg-indigo-200">
                    {trainingRequirements.some((element) => element.document === "Course Materials") === true ? (
                      <Checkbox
                        id={`checkbox-cm-${emp_idx}`}
                        // checked={employee.isCompleteAttendance}
                        readOnly
                        // onChange={() => onChangeAttendance(idx)}
                      />
                    ) : (
                      <div className="flex w-full h-full bg-black"></div>
                    )}
                  </td>
                  <td className="text-center border hover:bg-indigo-200">
                    {trainingRequirements.some((element) => element.document === "Post Training Report") === true ? (
                      <Checkbox
                        id={`checkbox-ptr-${emp_idx}`}
                        // checked={employee.isCompleteAttendance}
                        readOnly
                        // onChange={() => onChangeAttendance(idx)}
                      />
                    ) : (
                      <div className="flex w-full h-full bg-black"></div>
                    )}
                  </td>
                  <td className="text-center border hover:bg-indigo-200">
                    {trainingRequirements.some((element) => element.document === "Course Evaluation Report") ===
                    true ? (
                      <Checkbox
                        id={`checkbox-cer-${emp_idx}`}
                        // checked={employee.isCompleteAttendance}
                        readOnly
                        // onChange={() => onChangeAttendance(idx)}
                      />
                    ) : (
                      <div className="flex w-full h-full bg-black"></div>
                    )}
                  </td>
                  <td className="text-center border hover:bg-indigo-200">
                    {trainingRequirements.some((element) => element.document === "Learning Application Plan") ===
                    true ? (
                      <Checkbox
                        id={`checkbox-lap-${emp_idx}`}
                        // checked={employee.isCompleteAttendance}
                        readOnly
                        // onChange={() => onChangeAttendance(idx)}
                      />
                    ) : (
                      <div className="flex w-full h-full bg-black"></div>
                    )}
                  </td>
                  <td className="text-center border hover:bg-indigo-200">
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
                  </td>
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
