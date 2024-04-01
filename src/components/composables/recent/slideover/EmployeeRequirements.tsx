import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { FunctionComponent, useContext, useState } from "react";
import { BatchWithEmployees, RecentContext } from "../../recent-data-table/RecentDataTable";

export const EmployeeRequirements: FunctionComponent = () => {
  const { requirements, selectedBatch, setSelectedBatch } = useContext(RecentContext);

  const onChangeDocument = (emp_index: number, index: number) => {
    const newEmployees = [...selectedBatch.employees];
    newEmployees[emp_index].requirements[index].isSelected = !newEmployees[emp_index].requirements[index].isSelected;

    setSelectedBatch({ ...selectedBatch, employees: newEmployees });
  };

  return (
    <div className="px-3 py-5">
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-fixed ">
          <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500">
            <tr>
              <th className="p-2 font-medium border">Employee Name</th>
              {requirements.map((req, idx) => {
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
            {selectedBatch?.employees.map((employee, emp_idx) => {
              return (
                <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/50 " key={employee.employeeId}>
                  <td className="p-2 text-sm font-light border text-center">{employee.name}</td>
                  {employee.requirements.map((req, idx) => {
                    return (
                      <td key={req.document} className="text-center border hover:bg-indigo-200">
                        <Checkbox
                          id={`checkbox-${req.document.toLowerCase()}-${idx}`}
                          checked={req.isSelected ? true : false}
                          // readOnly
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
    </div>
  );
};
