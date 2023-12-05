"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { EmployeeWithSupervisor, TrainingNomineeStatus } from "@lms/utilities/types/training";
import { Combobox } from "@headlessui/react";
import React from "react";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { isEmpty } from "lodash";

const employeesWithSupervisor: EmployeeWithSupervisor[] = [
  {
    employeeId: "001",
    name: "Richard Vincent Narvaez",
    status: TrainingNomineeStatus.PENDING,
    supervisor: { supervisorId: "123", name: "Michael Gabales" },
  },
  {
    employeeId: "002",
    name: "Hafez Benanben Saiyou",
    status: TrainingNomineeStatus.PENDING,
    supervisor: { supervisorId: "123", name: "Michael Gabales" },
  },
  {
    employeeId: "003",
    name: "Jan Freigseg Lared",
    status: TrainingNomineeStatus.DECLINED,
    supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
  },
  {
    employeeId: "004",
    name: "Xavier Dale Dabuco",
    status: TrainingNomineeStatus.PENDING,
    supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
  },
  {
    employeeId: "005",
    name: "Paul Ryner Uchiha",
    status: TrainingNomineeStatus.ACCEPTED,
    supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
  },
  {
    employeeId: "006",
    name: "Joel Amoguis",
    status: TrainingNomineeStatus.DECLINED,
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
  {
    employeeId: "007",
    name: "Mark Leandre Gamutin",
    status: TrainingNomineeStatus.ACCEPTED,
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
  {
    employeeId: "008",
    name: "Ralph Mari Dayot",
    status: TrainingNomineeStatus.ACCEPTED,
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
  {
    employeeId: "009",
    name: "Louise Mae Soledad",
    status: TrainingNomineeStatus.PENDING,
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
];

export const AddParticipants: FunctionComponent = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeWithSupervisor[]>([]);
  // const [employees, setEmployees] = useState<EmployeeWithSupervisor[]>([]);
  const [searchEmployee, setSearchEmployee] = useState<string>("");
  const [initialLoadedEmp, setInitialLoadedEmp] = useState<boolean>(false);

  // const []
  const {
    id,
    selectedBatch,
    setSelectedBatch,
    selectedBatchModalIsOpen,
    employeePool,
    setEmployeePool,
    setSelectedBatchModalIsOpen,
    batches,
    setBatches,
  } = useContext(TrainingNoticeContext);

  // filtered facilitators
  const filteredEmployees =
    searchEmployee === ""
      ? employeePool
      : employeePool?.filter((emp) => emp.name.toLowerCase().includes(searchEmployee.toLowerCase()));

  // per training notice query
  //   useQuery({
  //     queryKey: ["training-details-sending", trainingNoticeId],
  //     enabled: !!trainingNoticeId && selectedBatchModalIsOpen !== false,
  //     staleTime: 2,
  //     refetchOnReconnect: false,
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //     queryFn: async () => {
  //       try {
  //         const { data } = (await axios.get(`${url}/training-details/${id}`)) as any;
  //         if (!isEmpty(data)) {
  //           console.log(data);
  //           setNumberOfParticipants(data.numberOfParticipants);
  //         }

  //         return data;
  //       } catch (error) {
  //         return error;
  //       }
  //     },
  //   });

  useEffect(() => {
    //todo Replace with get route
    // setEmployees(
    //   employeesWithSupervisor
    //     .sort((a, b) => (a.name > b.name ? 1 : -1))
    //     .sort((a, b) =>
    //       a.supervisor.name! > b.supervisor.name! ? 1 : a.supervisor.name! === b.supervisor.name ? 0 : -1
    //     )
    // );

    setEmployeePool(
      employeesWithSupervisor
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .sort((a, b) =>
          a.supervisor.name! > b.supervisor.name! ? 1 : a.supervisor.name! === b.supervisor.name ? 0 : -1
        )
    );
  }, []);

  useEffect(() => {
    if (selectedBatch.isOneDayTraining === true) {
      setSelectedBatch({
        ...selectedBatch,
        date: { ...selectedBatch.date, to: selectedBatch.date?.from },
      });
    } else if (selectedBatch.isOneDayTraining === false) {
      setSelectedBatch({ ...selectedBatch, date: { ...selectedBatch.date, to: "" } });
    }
  }, [selectedBatch.isOneDayTraining]);

  useEffect(() => {
    if (selectedBatchModalIsOpen === true) {
      console.log("NAG LOAD DIRI HA", initialLoadedEmp);
      if (batches.find((batch) => batch.number === selectedBatch.number)!.employees.length > 0) {
        setSelectedEmployees(batches.find((batch) => batch.number === selectedBatch.number)!.employees);
      }
      setInitialLoadedEmp(true);
    }
  }, [selectedBatchModalIsOpen]);

  return (
    <>
      <Modal
        isOpen={selectedBatchModalIsOpen}
        setIsOpen={setSelectedBatchModalIsOpen}
        size="2md"
        animate={false}
        isStatic
        onClose={() => {
          setSelectedBatchModalIsOpen(false);
          setSelectedBatch({ employees: [], number: 1, date: { from: "", to: "" } });
          setSelectedEmployees([]);
          setInitialLoadedEmp(false);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Batch {selectedBatch.number}</h3>
              </div>
            </header>
            <div className="flex items-center justify-between w-full gap-2 text-xs">
              <input
                className="w-full text-sm border rounded border-zinc-300"
                type="date"
                value={selectedBatch.date?.from}
                onChange={(e) =>
                  setSelectedBatch({
                    employees: selectedBatch.employees,
                    number: selectedBatch.number,
                    isOneDayTraining: selectedBatch.isOneDayTraining,
                    date: {
                      from: e.target.value,
                      to:
                        selectedBatch.isOneDayTraining === true
                          ? e.target.value
                          : selectedBatch.isOneDayTraining === false && !isEmpty(selectedBatch.date?.to)
                          ? selectedBatch.date.to
                          : "",
                    },
                  })
                }
              />
              <input
                className="w-full text-sm border rounded border-zinc-300"
                type="date"
                disabled={selectedBatch.isOneDayTraining}
                value={selectedBatch.date?.to!}
                onChange={(e) =>
                  setSelectedBatch({
                    employees: selectedBatch.employees,
                    number: selectedBatch.number,
                    isOneDayTraining: selectedBatch.isOneDayTraining,
                    date: {
                      ...selectedBatch.date,
                      to: selectedBatch.isOneDayTraining ? selectedBatch.date.from : e.target.value,
                    },
                  })
                }
              />
              <div className="flex items-center w-full gap-2">
                <Checkbox
                  id={`checkbox-same-day-training`}
                  label="Same day training?"
                  // disabled={isEmpty(selectedBatch.date?.from)}
                  checked={selectedBatch.isOneDayTraining}
                  onChange={() => {
                    setSelectedBatch({ ...selectedBatch, isOneDayTraining: !selectedBatch.isOneDayTraining });
                  }}
                />
              </div>
            </div>
          </ModalContent.Title>

          <ModalContent.Body>
            <main className="px-2 space-y-4 min-h-[22rem] max-h-[30rem]">
              <div className="mt-1">
                <div className="mb-2">
                  <label htmlFor="facilitator" className="block text-xs font-medium text-gray-700">
                    Participants
                    {/* <span className="text-red-600 text-md">*</span> */}
                  </label>
                  <p className="text-xs text-gray-500">The list of people who will participate in the training.</p>
                </div>

                <div className="relative">
                  <Combobox
                    value={selectedEmployees}
                    multiple
                    nullable={true}
                    onChange={(value) => {
                      const newValues = employeePool.filter((x) => !value.includes(x));
                      //   setSelectedEmployees(newValues);
                      // setSearchEmployee("");
                      setSelectedEmployees(value);
                      setEmployeePool(newValues);
                      // setFilteredEmployees(newValues);
                      //   if (value[0].type === "organization" && value.length === 1) {
                      //     setSelectedFacilitators(value);
                      //     setFacilitators(newValues);
                      //   } else if (value[0].type === "organization" && value.length > 1) {
                      //     setError("facilitators", { message: "Only 1 facilitator for organization is allowed" });
                      //   } else if (value[0].type === "individual") {
                      //     setSelectedFacilitators(value);
                      //     setFacilitators(newValues);
                      //   }
                    }}
                  >
                    <Combobox.Input
                      // displayValue={(fac: Array<Facilitator>) => fac.map((fac) => fac.name).join(", ")}
                      as={React.Fragment}
                    >
                      <Input
                        id="search-participant"
                        autoComplete="off"
                        onBlur={() => setSearchEmployee("")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => setSearchEmployee(e.target.value)}
                        size="small"
                        // color={!isEmpty(errors.facilitators) ? "error" : "primary"}
                        // helperText={errors.facilitators ? errors?.facilitators?.message : undefined}
                        placeholder="Search for participant"
                        className="placeholder:text-xs"
                      />
                    </Combobox.Input>

                    <Combobox.Options className="absolute max-h-52 z-[80] overflow-y-auto  bg-white w-full border rounded-md shadow-lg shadow-gray-100">
                      {filteredEmployees?.length === 0 ? (
                        <div className="flex items-center justify-center py-10">No results found</div>
                      ) : (
                        filteredEmployees.map((employee, index) => {
                          return (
                            <Combobox.Option key={index} value={employee}>
                              {({ active, selected }) => {
                                return (
                                  <div
                                    role="button"
                                    className={`${
                                      selected ? "bg-gray-300  text-white " : active ? "bg-gray-100" : ""
                                    } border-b  border-b-gray-100 px-2 py-1`}
                                  >
                                    <h3 className={`${selected ? "text-gray-700" : "text-gray-700"} font-medium`}>
                                      {selected ? "✓ " : null}
                                      {employee.name}
                                    </h3>
                                    <p className={`${selected ? "" : "text-gray-400"} text-xs`}>
                                      {employee.supervisor.name}
                                    </p>
                                  </div>
                                );
                              }}
                            </Combobox.Option>
                          );
                        })
                      )}
                    </Combobox.Options>
                  </Combobox>
                </div>

                <div className="relative overflow-x-auto rounded-lg shadow-md">
                  <table className="w-full text-left ">
                    <thead className="text-white bg-indigo-600 rounded-t">
                      <tr>
                        <th className="p-2 font-medium text-center border">#</th>
                        <th className="p-2 font-medium border">Participant Name</th>
                        <th className="p-2 font-medium border">Supervisor</th>
                        <th className="p-2 font-medium border"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEmployees.map((employee, idx) => {
                        return (
                          <tr className="even:bg-inherit odd:bg-zinc-50" key={employee.employeeId}>
                            <td className="p-2 text-sm font-light text-center border ">{idx + 1}</td>
                            <td className="p-2 text-sm font-light border ">{employee.name}</td>
                            <td className="p-2 text-sm font-light border ">{employee.supervisor.name}</td>
                            <td className="p-2 text-sm font-light border ">
                              <div className="text-center">
                                <button
                                  className="text-white bg-red-500 border rounded-lg hover:text-black hover:bg-red-200"
                                  type="button"
                                  onClick={() => {
                                    const newSelectedEmployees = [...selectedEmployees];
                                    newSelectedEmployees.splice(idx, 1);
                                    setSelectedEmployees(newSelectedEmployees);
                                    const newEmployees = [...employeePool];
                                    newEmployees.push(employee);
                                    setEmployeePool(
                                      newEmployees
                                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                                        .sort((a, b) =>
                                          a.supervisor.name! > b.supervisor.name!
                                            ? 1
                                            : a.supervisor.name! === b.supervisor.name
                                            ? 0
                                            : -1
                                        )
                                    );
                                    // setFilteredEmployees(
                                    //   newEmployees
                                    //     .sort((a, b) => (a.name > b.name ? 1 : -1))
                                    //     .sort((a, b) =>
                                    //       a.supervisor.name! > b.supervisor.name!
                                    //         ? 1
                                    //         : a.supervisor.name! === b.supervisor.name
                                    //         ? 0
                                    //         : -1
                                    //     )
                                    // );
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  size="small"
                  onClick={() => {
                    // assign the object to the specific array (selected batch number)

                    Object.assign(batches.find((batch) => batch.number === selectedBatch.number)!, {
                      date: { from: selectedBatch.date.from, to: selectedBatch.date.to },
                      number: selectedBatch.number,
                      employees: selectedEmployees,
                      isOneDayTraining: selectedBatch.isOneDayTraining,
                    });

                    setSelectedBatchModalIsOpen(false);
                    setInitialLoadedEmp(false);
                    setSelectedEmployees([]);
                    setSelectedBatch({ employees: [], number: 1, date: { to: undefined, from: "" } });
                  }}
                >
                  Apply
                </Button>

                {/* <Button
                  size="small"
                  variant="white"
                  onClick={() => {
                    setSelectedBatchModalIsOpen(false);
                    setSelectedBatch({ employees: [], number: 1, date: { to: undefined, from: "" } });
                  }}
                >
                  Close
                </Button> */}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};