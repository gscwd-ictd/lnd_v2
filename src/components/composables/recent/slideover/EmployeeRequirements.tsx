import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { ChangeEvent, FunctionComponent, useContext, useEffect, useState } from "react";
import { BatchWithEmployees, RecentContext } from "../../recent-data-table/RecentDataTable";
import { TrainingRequirement } from "@lms/utilities/stores/training-notice-store";

export const EmployeeRequirements: FunctionComponent = () => {
  const { requirements, selectedBatch, setSelectedBatch, batchAttendanceIsOpen } = useContext(RecentContext);
  const [previousSelectedBatch, setPreviousSelectedBatch] = useState<BatchWithEmployees>(selectedBatch);
  // const [newSelectedBatch, setNewSelectedBatch] = useState<BatchWithEmployees>({} as BatchWithEmployees);
  const [checkAllAttendance, setCheckAllAttendance] = useState<boolean>(false);
  const [checkAllLap, setCheckAllLap] = useState<boolean>(false);
  const [checkAllPtr, setCheckAllPtr] = useState<boolean>(false);
  const [checkAllPostTest, setCheckAllPostTest] = useState<boolean>(false);
  const [checkAllPreTest, setCheckAllPreTest] = useState<boolean>(false);
  const [checkAllCoa, setCheckAllCoa] = useState<boolean>(false);
  const [allRequirements, setAllRequirements] = useState<Array<TrainingRequirement>>(
    requirements.map((req) => {
      if (req.isSelected !== null) {
        return { document: req.document, isSelected: false };
      } else return { document: req.document, isSelected: req.isSelected };
    })
  );

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
    setPreviousSelectedBatch({ ...previousSelectedBatch, employees: newEmployees });
  };

  const onChangeSelectAllByRequirement = (e: ChangeEvent<HTMLInputElement>, currentReq: TrainingRequirement) => {
    // { document: "Attendance", isSelected: true },
    //                           { document: "Certificate of Appearance", isSelected: false },
    //                           { document: "Certificate of Training", isSelected: false },
    //                           { document: "Course Evaluation Report", isSelected: false },
    //                           { document: "Course Materials", isSelected: false },
    //                           { document: "Learning Application Plan", isSelected: false },
    //                           { document: "Post Training Report", isSelected: false },
    //                           { document: "Post-test", isSelected: false },
    //                           { document: "Pre-test", isSelected: false },
    //                           { document: "Program", isSelected: false },
    /**
     *
     */
    // if (document === "Attendance") {
    //   e.currentTarget.checked === true ? setCheckAllAttendance(true) : setCheckAllAttendance(false);
    // }

    const newTraininRequirements = [...allRequirements];
    setAllRequirements(
      newTraininRequirements.map((req) => {
        if (req.document === "Attendance" && currentReq.document === "Attendance" && req.isSelected !== null) {
          setCheckAllAttendance(e.currentTarget.checked);

          setSelectedBatch({
            ...selectedBatch,
            employees: selectedBatch.employees.map((emp) => {
              return {
                ...emp,
                requirements: emp.requirements.map((emprequi) => {
                  return {
                    document: emprequi.document,
                    isSelected: emprequi.document === "Attendance" ? e.currentTarget.checked : emprequi.isSelected,
                  };
                }),
              };
            }),
          });
        } else if (req.document === "Certificate of Appearance") {
          setCheckAllLap(e.currentTarget.checked);
          setSelectedBatch({
            ...selectedBatch,
            employees: selectedBatch.employees.map((emp) => {
              return {
                ...emp,
                requirements: emp.requirements.map((emprequi) => {
                  return {
                    document: emprequi.document,
                    isSelected:
                      emprequi.document === "Certificate of Appearance" ? e.currentTarget.checked : emprequi.isSelected,
                  };
                }),
              };
            }),
          });
          //
        } else if (req.document === "Learning Application Plan" && req.isSelected !== null) {
          setCheckAllLap(e.currentTarget.checked);

          setSelectedBatch({
            ...selectedBatch,
            employees: selectedBatch.employees.map((emp) => {
              return {
                ...emp,
                requirements: emp.requirements.map((emprequi) => {
                  return {
                    document: emprequi.document,
                    isSelected:
                      emprequi.document === "Learning Application Plan" ? e.currentTarget.checked : emprequi.isSelected,
                  };
                }),
              };
            }),
          });
        } else if (req.document === "Post Training Report" && req.isSelected !== null) {
          setCheckAllPtr(e.currentTarget.checked);
          setSelectedBatch({
            ...selectedBatch,
            employees: selectedBatch.employees.map((emp) => {
              return {
                ...emp,
                requirements: emp.requirements.map((emprequi) => {
                  return {
                    document: emprequi.document,
                    isSelected:
                      emprequi.document === "Post Training Report" ? e.currentTarget.checked : emprequi.isSelected,
                  };
                }),
              };
            }),
          });
        } else if (req.document === "Post-test" && req.isSelected !== null) {
          setCheckAllPostTest(e.currentTarget.checked);
          setSelectedBatch({
            ...selectedBatch,
            employees: selectedBatch.employees.map((emp) => {
              return {
                ...emp,
                requirements: emp.requirements.map((emprequi) => {
                  return {
                    document: emprequi.document,
                    isSelected: emprequi.document === "Post-test" ? e.currentTarget.checked : emprequi.isSelected,
                  };
                }),
              };
            }),
          });
        } else if (req.document === "Pre-test") {
          setCheckAllPreTest(e.currentTarget.checked);
          setSelectedBatch({
            ...selectedBatch,
            employees: selectedBatch.employees.map((emp) => {
              return {
                ...emp,
                requirements: emp.requirements.map((emprequi) => {
                  return {
                    document: emprequi.document,
                    isSelected: emprequi.document === "Pre-test" ? e.currentTarget.checked : emprequi.isSelected,
                  };
                }),
              };
            }),
          });
        }

        // if (e.currentTarget.checked === false) setSelectedBatch(previousSelectedBatch);
        return {
          document: req.document,
          isSelected: currentReq.document === req.document ? e.currentTarget.checked : req.isSelected,
        };
      })
    );
  };

  // check if state is blah blah blah
  // const checkAllState = (allRequirements: Array<TrainingRequirement>) => {
  //   allRequirements.map((req: TrainingRequirement) => {
  //     if (req.document === "Attendance" && req.isSelected !== null) {
  //       console.log("NISULOD SA ATTENDANCE", req.isSelected);
  //       setCheckAllAttendance(req.isSelected!);
  //     } else if (req.document === "Certificate of Appearance") {
  //       //
  //     } else if (req.document === "Learning Application Plan" && req.isSelected !== null) {
  //       setCheckAllLap(req.isSelected!);
  //     } else if (req.document === "Post Training Report" && req.isSelected !== null) {
  //       setCheckAllPtr(req.isSelected!);
  //     } else if (req.document === "Post-test" && req.isSelected !== null) {
  //       setCheckAllPostTest(req.isSelected!);
  //     } else if (req.document === "Pre-test") {
  //       setCheckAllPreTest(req.isSelected!);
  //     }
  //   });
  // };

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
                              color="green"
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
            {/* <tr className="text-sm">
              <td className="p-2 font-medium border"></td>

              {allRequirements
                .sort((a, b) => (a.document > b.document ? 1 : -1))
                .map((req, idx) => {
                  if (req.isSelected !== null)
                    return (
                      <td className="p-2 font-medium border text-xs text-center text-gray-700" key={idx}>
                        <div className="flex flex-col gap-2 items-center text-center justify-center">
                          <label htmlFor={`checkbox-${req.document}-${idx}`} className="w-full"></label>
                          <Checkbox
                            id={`checkbox-${req.document}-${idx}`}
                            checked={req.isSelected}
                            onChange={(e) => onChangeSelectAllByRequirement(e, req)}
                          />
                        </div>
                      </td>
                    );
                })}
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* <button onClick={() => console.log(selectedBatch.employees)} className="bg-blue-500 border px-2 py-3 text-white">
        Employees
      </button>
      <button onClick={() => console.log(allRequirements)} className="bg-blue-500 border px-2 py-3 text-white">
        Sec
      </button>
      Attendance: {checkAllAttendance ? "true" : "false"}
      Lap: {checkAllLap ? "true" : "false"} */}
    </div>
  );
};
