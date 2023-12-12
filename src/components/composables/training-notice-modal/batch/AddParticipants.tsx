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
import dayjs from "dayjs";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";

export const employeesWithSupervisor: EmployeeWithSupervisor[] = [
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
  const {
    selectedBatch,
    selectedBatchModalIsOpen,
    employeePool,
    setEmployeePool,
    setSelectedBatch,
    setSelectedBatchModalIsOpen,
    batches,
  } = useContext(TrainingNoticeContext);

  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeWithSupervisor[]>([]);
  const [searchEmployee, setSearchEmployee] = useState<string>("");
  const [tempEmployeePool, setTempEmployeePool] = useState<EmployeeWithSupervisor[]>(employeePool);
  const [initialLoadedEmp, setInitialLoadedEmp] = useState<boolean>(false);
  const { totalSelectedEmployees, setTotalSelectedEmployees } = useContext(TrainingNoticeContext);
  const trainingStart = useTrainingNoticeStore((state) => state.trainingStart);
  const trainingEnd = useTrainingNoticeStore((state) => state.trainingEnd);

  // filtered facilitators
  const filteredEmployees =
    searchEmployee === ""
      ? tempEmployeePool
      : tempEmployeePool?.filter((emp) => emp.name.toLowerCase().includes(searchEmployee.toLowerCase()));

  useEffect(() => {
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
      setTempEmployeePool(employeePool);
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
              <div className="flex items-center gap-5">
                <h3 className="text-lg font-semibold text-gray-600">Batch {selectedBatch.number}</h3>
              </div>
              <div className="flex text-sm ">
                <div className="text-gray-600 ">{dayjs(trainingStart).format("MMMM DD, YYYY")}</div>
                <span>
                  &nbsp;
                  {dayjs(trainingStart).format("MMMM DD, YYYY") !== dayjs(trainingEnd).format("MMMM DD, YYYY") && "to"}
                  &nbsp;
                </span>
                {dayjs(trainingStart).format("MMMM DD, YYYY") !== dayjs(trainingEnd).format("MMMM DD, YYYY") && (
                  <div className="text-gray-600 ">{dayjs(trainingEnd).format("MMMM DD, YYYY")}</div>
                )}
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
                      const newValues = tempEmployeePool.filter((x) => !value.includes(x));

                      setSelectedEmployees(value.sort((a, b) => (a.name > b.name ? 1 : -1)));
                      // setEmployeePool(newValues);
                      setTempEmployeePool(newValues);
                    }}
                  >
                    <Combobox.Input as={React.Fragment}>
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
                    <thead className="text-white bg-indigo-700 rounded-t">
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
                                    const newEmployees = [...tempEmployeePool];
                                    newEmployees.push(employee);
                                    setTempEmployeePool(
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

                    const currentUpdatedEmployees = batches.find(
                      (batch) => batch.number === selectedBatch.number
                    )?.employees;

                    const tempBatches = [...batches];

                    let selectedEmployeesPool: EmployeeWithSupervisor[] = [];

                    tempBatches.map((batch) => {
                      if (batch.number !== selectedBatch.number && batch.employees) {
                        selectedEmployeesPool.push(...batch.employees);
                      }
                    });

                    const joinedEmployees = currentUpdatedEmployees?.concat(selectedEmployeesPool);

                    setTotalSelectedEmployees(joinedEmployees!.sort((a, b) => (a.name > b.name ? 1 : -1)));

                    // this logic here should not only be adding but comparing the current selected employees
                    setSelectedBatchModalIsOpen(false);
                    setInitialLoadedEmp(false);
                    setSelectedEmployees([]);
                    setEmployeePool(tempEmployeePool);
                    setSelectedBatch({ employees: [], number: 1, date: { to: undefined, from: "" } });
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
