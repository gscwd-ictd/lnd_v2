import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { BatchWithEmployees, RecentContext } from "../../recent-data-table/RecentDataTable";

const TempRequirements = [
  { document: "Attendance", isSelected: true },
  { document: "Certificate of Appearance", isSelected: null },
  { document: "Certificate of Training", isSelected: null },
  { document: "Course Evaluation Report", isSelected: null },
  { document: "Course Materials", isSelected: null },
  { document: "Learning Application Plan", isSelected: true },
  { document: "Post Training Report", isSelected: true },
  { document: "Post-test", isSelected: true },
  { document: "Pre-test", isSelected: true },
  { document: "Program", isSelected: null },
];

export const EmployeeRequirements: FunctionComponent = () => {
  const { requirements, selectedBatch, setSelectedBatch, batchAttendanceIsOpen } = useContext(RecentContext);
  const [newSelectedBatch, setNewSelectedBatch] = useState<BatchWithEmployees>({} as BatchWithEmployees);

  const requirementsCount = requirements.map((req) => {
    let count = 0;
    if (req.isSelected !== null) {
      count++;
    }
    return count;
  });

  const onChangeDocument = (emp_index: number, index: number) => {
    const newEmployees = [...selectedBatch.employees];
    newEmployees[emp_index].requirements[index].isSelected = !newEmployees[emp_index].requirements[index].isSelected;

    setSelectedBatch({ ...selectedBatch, employees: newEmployees });
  };

  // useEffect(() => {
  //   if (selectedBatch) {
  //     let requirementsCount = 0;

  //     // count how many trues
  //     requirements.map((req) => {
  //       if (req.isSelected !== null) requirementsCount++;
  //     });

  //     // copy the array
  //     if (selectedBatch.employees.length > 0) {
  //       const copiedEmployees = [...selectedBatch.employees];

  //       // map the selectedBatch employees
  //       const newSelectedBatchEmployees = copiedEmployees.map((emp) => {
  //         let accomplishedCount: number = 0;

  //         // map the requirements
  //         emp.requirements.map((req) => {
  //           if (req.isSelected === true) accomplishedCount++;
  //           return req;
  //         });

  //         return { ...emp, status: accomplishedCount === requirementsCount ? "Complete" : "Incomplete" };

  //         // compare per employee accomplishment count vs requirement count
  //       });

  //       setNewSelectedBatch({ ...selectedBatch, employees: newSelectedBatchEmployees });
  //     }
  //   }
  // }, [selectedBatch, batchAttendanceIsOpen]);

  // useEffect(() => {
  //   setSelectedBatch(newSelectedBatch);
  // }, [newSelectedBatch]);

  return (
    <div className="px-10 py-5">
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-fixed ">
          {/* <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500"> */}
          <thead className="text-gray-700 bg-gray-300">
            <tr className="text-sm">
              <th className="p-2 font-medium border">Employee Name</th>
              {requirements
                .sort((a, b) => (a.document > b.document ? 1 : -1))
                .map((req, idx) => {
                  if (req.isSelected !== null)
                    return (
                      <th key={idx} className="p-2 font-medium border">
                        {req.document}
                      </th>
                    );
                })}
              {/* <th className="p-2 font-medium border">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {selectedBatch?.employees?.map((employee, emp_idx) => {
              return (
                <tr
                  className={`${
                    employee.status === "Complete"
                      ? "bg-emerald-200 "
                      : "even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80 "
                  }`}
                  key={employee.employeeId}
                >
                  <td
                    className={`p-2 text-sm font-light border text-center items-center ${
                      employee.status === "Complete"
                        ? "bg-green-300/75 hover:bg-green-400/75"
                        : "bg-gray-50 hover:bg-indigo-200"
                    }`}
                  >
                    {employee.name}
                  </td>
                  {/* {employee.requirements.reduce()} */}
                  {employee.requirements
                    // .filter((req) => req.isSelected !== null)
                    .sort((a, b) => (a.document > b.document ? 1 : -1))
                    .map((req, idx) => {
                      if (req.isSelected !== null)
                        return (
                          <td
                            className={`p-2 text-sm font-light  text-center items-center border  ${
                              employee.status === "Complete"
                                ? "bg-green-300/75 hover:bg-green-400/75"
                                : "bg-gray-50 hover:bg-indigo-200"
                            }`}
                            key={idx}
                          >
                            <Checkbox
                              id={`checkbox-${idx}-${req.document.toLowerCase()}`}
                              checked={req.isSelected ? true : false}
                              onChange={() => onChangeDocument(emp_idx, idx)}
                            />
                          </td>
                        );
                    })}

                  {/* <td className="text-sm text-center text-gray-600 border hover:cursor-pointer">-</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <button onClick={() => console.log(selectedBatch.employees)} className="bg-blue-500 border px-2 py-3 text-white">
        Employees
      </button>
      <button
        onClick={() =>
          console.log(
            selectedBatch.employees.map((emp) => {
              const something = emp.requirements
                // .filter((req) => req.isSelected !== null)
                .sort((a, b) => (a.document > b.document ? 1 : -1));
              return something;
            })
          )
        }
        className="bg-blue-500 border px-2 py-3 text-white"
      >
        Sec
      </button> */}
    </div>
  );
};
