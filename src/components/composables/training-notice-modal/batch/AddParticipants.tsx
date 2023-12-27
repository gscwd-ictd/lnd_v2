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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

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

  const from = useTrainingNoticeStore((state) => state.trainingStart);
  const to = useTrainingNoticeStore((state) => state.trainingEnd);

  // validation schema
  const schema = yup.object({
    trainingStart: yup
      .string()
      .required()
      .nonNullable()
      .label("Training start")
      .test("test-training-start", (value, validationContext) => {
        const {
          createError,
          parent: { trainingEnd },
        } = validationContext;

        if (dayjs(from).isSame(dayjs(to), "day")) {
          if (dayjs(value).isBefore(dayjs(from), "day")) {
            return createError({
              message: `Date shouldn't be before the training date`,
            });
          } else if (dayjs(value).isAfter(dayjs(from), "day")) {
            return createError({
              message: `Date shouldn't be after the training date`,
            });
          } else return true;
        } else {
          if (!isEmpty(value) && !isEmpty(trainingEnd)) {
            if (dayjs(value).isBefore(dayjs(from), "day") || dayjs(value).isAfter(dayjs(to), "day")) {
              return createError({ message: `Date shouldn't be outside the training date` });
            } else if (dayjs(value).isAfter(dayjs(trainingEnd))) {
              return createError({ message: `Date from shouldn't be after the end of training date` });
            } else return true;
          } else if (!isEmpty(value) && isEmpty(trainingEnd)) {
            if (dayjs(value).isBefore(dayjs(from), "day") || dayjs(value).isAfter(dayjs(to), "day")) {
              return createError({ message: `Date shouldn't be outside the training date` });
            } else return true;
          }
        }
      }),
    trainingEnd: yup
      .string()
      .required()
      .nonNullable()
      .label("Training end")
      .test("test-training-end", (value, validationContext) => {
        const {
          createError,
          parent: { trainingStart },
        } = validationContext;

        if (dayjs(from).isSame(dayjs(to), "day")) {
          if (dayjs(value).isBefore(dayjs(to), "day")) {
            return createError({
              message: `Date shouldn't be before the training date`,
            });
          } else if (dayjs(value).isAfter(dayjs(to), "day")) {
            return createError({
              message: `Date shouldn't be after the training date`,
            });
          } else return true;
        } else {
          if (!isEmpty(value) && !isEmpty(trainingStart)) {
            if (dayjs(value).isBefore(dayjs(from), "day") || dayjs(value).isAfter(dayjs(to), "day")) {
              return createError({ message: `Date shouldn't be outside the training date` });
            } else if (dayjs(value).isBefore(dayjs(trainingStart))) {
              return createError({ message: `Date from shouldn't be before the start of training date` });
            } else return true;
          } else if (!isEmpty(value) && isEmpty(trainingStart)) {
            if (dayjs(value).isBefore(dayjs(from), "day") || dayjs(value).isAfter(dayjs(to), "day")) {
              return createError({ message: `Date shouldn't be outside the training date` });
            } else return true;
          }
        }
      }),

    employees: yup
      .array()
      .of(
        yup.object({
          nomineeId: yup.string().notRequired(),
          employeeId: yup.string().required(),
          name: yup.string().required(),
        })
      )
      .required()
      .test("test-employees", (value, validationContext) => {
        const { createError } = validationContext;
        if (value.length === 0) {
          createError({ message: "Employees should not be empty!" });
        } else return true;
      }),
  });

  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeWithSupervisor[]>([]);
  const [searchEmployee, setSearchEmployee] = useState<string>("");
  const [tempEmployeePool, setTempEmployeePool] = useState<EmployeeWithSupervisor[]>(employeePool);
  const [initialLoadedEmp, setInitialLoadedEmp] = useState<boolean>(false);
  const { totalSelectedEmployees, setTotalSelectedEmployees } = useContext(TrainingNoticeContext);
  const [fromIsLocked, setFromIsLocked] = useState<boolean>(false);
  const [toIsLocked, setToIsLocked] = useState<boolean>(false);
  const [sdtIsLocked, setSdtIsLocked] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    clearErrors,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    // defaultValues: { employees: [], trainingEnd: "", trainingStart: "" },

    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.employees.length > 0) {
      // assign the object to the specific array (selected batch number)
      Object.assign(batches.find((batch) => batch.batchNumber === selectedBatch.batchNumber)!, {
        trainingDate: { from: selectedBatch.trainingDate.from, to: selectedBatch.trainingDate.to },
        number: selectedBatch.batchNumber,
        employees: selectedEmployees,
        isOneDayTraining: selectedBatch.isOneDayTraining,
      });

      const currentUpdatedEmployees = batches.find(
        (batch) => batch.batchNumber === selectedBatch.batchNumber
      )?.employees;

      const tempBatches = [...batches];

      let selectedEmployeesPool: EmployeeWithSupervisor[] = [];

      tempBatches.map((batch) => {
        if (batch.batchNumber !== selectedBatch.batchNumber && batch.employees) {
          selectedEmployeesPool.push(...batch.employees);
        }
      });

      const joinedEmployees = currentUpdatedEmployees?.concat(selectedEmployeesPool);

      setTotalSelectedEmployees(joinedEmployees!.sort((a, b) => (a.name > b.name ? 1 : -1)));

      // this logic here should not only be adding but comparing the current selected employees
      setSelectedBatchModalIsOpen(false);
      setInitialLoadedEmp(false);
      // setValue("trainingEnd", "");
      // setValue("trainingStart", "");
      // setValue("employees", []);
      setSelectedEmployees([]);
      setEmployeePool(tempEmployeePool);
      setFromIsLocked(false);
      setToIsLocked(false);
      setSdtIsLocked(false);
      setSelectedBatch({ employees: [], batchNumber: 1, trainingDate: { to: undefined, from: "" } });
    }
  };

  // add all participants with this function
  const addAllParticipants = () => {
    const allEmployees = [...tempEmployeePool];
    const tempSelEmployees = [...selectedEmployees];
    tempSelEmployees.push(...allEmployees);
    setSelectedEmployees(
      tempSelEmployees
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .sort((a, b) =>
          a.supervisor.name! > b.supervisor.name! ? 1 : a.supervisor.name! === b.supervisor.name ? 0 : -1
        )
    );
    setValue(
      "employees",
      tempSelEmployees
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .sort((a, b) =>
          a.supervisor.name! > b.supervisor.name! ? 1 : a.supervisor.name! === b.supervisor.name ? 0 : -1
        )
    );
    setTempEmployeePool([]);
  };

  // filtered facilitators
  const filteredEmployees =
    searchEmployee === ""
      ? tempEmployeePool
      : tempEmployeePool?.filter((emp) => emp.name.toLowerCase().includes(searchEmployee.toLowerCase()));

  useEffect(() => {
    register("employees");
    register("trainingStart");
    register("trainingEnd");

    setEmployeePool(
      // employeesWithSupervisor
      employeePool
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
        trainingDate: { ...selectedBatch.trainingDate, to: selectedBatch.trainingDate?.from },
      });
      setValue("trainingEnd", selectedBatch.trainingDate.from!);
    } else if (selectedBatch.isOneDayTraining === false) {
      if (isEmpty(getValues("trainingEnd"))) {
        setValue("trainingEnd", "");
        setSelectedBatch({ ...selectedBatch, trainingDate: { ...selectedBatch.trainingDate, to: "" } });
      }
    }
  }, [selectedBatch.isOneDayTraining, selectedBatch]);

  useEffect(() => {
    if (selectedBatchModalIsOpen === true && initialLoadedEmp === false) {
      // setTempEmployeePool(employeePool);
      setTempEmployeePool(employeesWithSupervisor);
      if (batches.find((batch) => batch.batchNumber === selectedBatch.batchNumber)!.employees.length > 0) {
        setSelectedEmployees(batches.find((batch) => batch.batchNumber === selectedBatch.batchNumber)!.employees);
      }
      // if training date from and to is the same
      if (dayjs(from).isSame(dayjs(to), "day")) {
        setValue("trainingStart", dayjs(from).format("YYYY-MM-DD"));
        setValue("trainingEnd", dayjs(to).format("YYYY-MM-DD"));
        //
        setSelectedBatch({
          ...selectedBatch,
          isOneDayTraining: true,
          trainingDate: { from: dayjs(from).format("YYYY-MM-DD"), to: dayjs(to).format("YYYY-MM-DD") },
        });
        setFromIsLocked(true);
        setToIsLocked(true);
        setSdtIsLocked(true);
      }
      // if current training date from and to is  the same
      else if (dayjs(selectedBatch.trainingDate.from).isSame(dayjs(selectedBatch.trainingDate.to), "day")) {
        setSelectedBatch({
          ...selectedBatch,
          isOneDayTraining: true,
          //  trainingDate: { from: dayjs(from).format("YYYY-MM-DD"), to: dayjs(to).format("YYYY-MM-DD") },
        });
      }
      setInitialLoadedEmp(true);
    }
  }, [selectedBatchModalIsOpen]);

  // everytime the value of employees change, react hook form receives the same value
  useEffect(() => {
    setValue(
      "employees",
      selectedBatch.employees.map((employee) => {
        return { nomineeId: employee.nomineeId!, employeeId: employee.employeeId, name: employee.name };
      })
    );
  }, [selectedBatch.employees]);

  // everytime the value of date from input changes, react hook form receives the same value
  useEffect(() => {
    setValue("trainingStart", selectedBatch.trainingDate.from!);
  }, [selectedBatch.trainingDate.from]);

  // everytime the value of date to input changes, react hook form receives the same value
  useEffect(() => {
    setValue("trainingEnd", selectedBatch.trainingDate.to!);
  }, [selectedBatch.trainingDate.to]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <Modal
        isOpen={selectedBatchModalIsOpen}
        setIsOpen={setSelectedBatchModalIsOpen}
        size="3md"
        animate={false}
        isStatic
        onClose={() => {
          setSelectedBatchModalIsOpen(false);
          setSelectedBatch({ employees: [], batchNumber: 1, trainingDate: { from: "", to: "" } });
          setSelectedEmployees([]);
          clearErrors("employees");
          clearErrors("trainingStart");
          clearErrors("trainingEnd");
          // setValue("trainingEnd", "");
          // setValue("trainingStart", "");
          // setValue("employees", []);
          setInitialLoadedEmp(false);
          setFromIsLocked(false);
          setToIsLocked(false);
          setSdtIsLocked(false);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
              <div className="flex items-center gap-5">
                <h3 className="text-lg font-semibold text-gray-600">Batch {selectedBatch.batchNumber}</h3>
              </div>
              <div className="flex text-sm ">
                <div className="text-gray-600 ">{dayjs(from).format("MMMM DD, YYYY")}</div>
                <span>
                  &nbsp;
                  {dayjs(from).format("MMMM DD, YYYY") !== dayjs(to).format("MMMM DD, YYYY") && "to"}
                  &nbsp;
                </span>
                {dayjs(from).format("MMMM DD, YYYY") !== dayjs(to).format("MMMM DD, YYYY") && (
                  <div className="text-gray-600 ">{dayjs(to).format("MMMM DD, YYYY")}</div>
                )}
              </div>
            </header>
            <div className="flex items-start justify-between w-full gap-2 text-xs h-[4rem]">
              {/* DATE FROM */}

              <div className="flex flex-col gap-2 w-[12rem] pl-2">
                <input
                  className="w-full text-sm border rounded border-zinc-300"
                  type="date"
                  disabled={fromIsLocked}
                  value={selectedBatch.trainingDate?.from}
                  onChange={(e) => {
                    setValue("trainingStart", e.target.value);
                    setSelectedBatch({
                      employees: selectedBatch.employees,
                      batchNumber: selectedBatch.batchNumber,
                      isOneDayTraining: selectedBatch.isOneDayTraining,
                      trainingDate: {
                        from: e.target.value,
                        to:
                          selectedBatch.isOneDayTraining === true
                            ? e.target.value
                            : selectedBatch.isOneDayTraining === false && !isEmpty(selectedBatch.trainingDate?.to)
                            ? selectedBatch.trainingDate.to
                            : selectedBatch.trainingDate.to,
                      },
                    });
                  }}
                />
                <div className="text-xs text-red-700">{errors.trainingStart?.message}</div>
              </div>

              {/* DATE END */}

              <div className="flex flex-col gap-2 w-[12rem] pr-2">
                <input
                  className="w-full text-sm border rounded border-zinc-300"
                  type="date"
                  disabled={selectedBatch.isOneDayTraining || toIsLocked ? true : false}
                  value={selectedBatch.trainingDate?.to!}
                  onChange={(e) => {
                    setValue(
                      "trainingEnd",
                      selectedBatch.isOneDayTraining ? selectedBatch.trainingDate?.from! : e.target.value
                    );
                    setSelectedBatch({
                      employees: selectedBatch.employees,
                      batchNumber: selectedBatch.batchNumber,
                      isOneDayTraining: selectedBatch.isOneDayTraining,
                      trainingDate: {
                        ...selectedBatch.trainingDate,
                        to: selectedBatch.isOneDayTraining ? selectedBatch.trainingDate.from : e.target.value,
                      },
                    });
                  }}
                />
                <div className="text-xs text-red-700">{errors.trainingEnd?.message}</div>
              </div>

              <div className="flex items-center w-auto gap-2 px-2">
                <Checkbox
                  id={`checkbox-same-day-training`}
                  label="Same day training?"
                  // disabled={isEmpty(selectedBatch.date?.from)}
                  disabled={sdtIsLocked}
                  checked={selectedBatch.isOneDayTraining}
                  onChange={() => {
                    setSelectedBatch({ ...selectedBatch, isOneDayTraining: !selectedBatch.isOneDayTraining });
                  }}
                />
              </div>
            </div>
          </ModalContent.Title>

          <ModalContent.Body>
            <form id="addBatchingForm" key="addBatchingForm" onSubmit={handleSubmit(onSubmit)}>
              <main className="px-2 space-y-4 min-h-[22rem] max-h-[30rem]">
                <div className="mt-1 ">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-1 ">
                      <label htmlFor="facilitator" className="block text-xs font-medium text-gray-700">
                        Participants
                      </label>

                      <p className="text-xs text-gray-500">The list of people who will participate in the training.</p>
                      {errors.employees?.message ? (
                        <div className="text-xs text-red-700">List should not be empty!</div>
                      ) : null}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={addAllParticipants}
                        disabled={tempEmployeePool.length === 0 ? true : false}
                        className={`"w-auto rounded ${
                          tempEmployeePool.length === 0
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-400"
                        } text-xs text-white px-3 py-2`}
                      >
                        {tempEmployeePool.length === 0
                          ? "No participants left"
                          : tempEmployeePool.length > 1 && selectedEmployees.length === 0
                          ? "Add All Participants"
                          : `Add ${tempEmployeePool.length} Remaining Participants`}
                      </button>
                    </div>
                  </div>

                  <div className="relative mt-2">
                    <Combobox
                      value={selectedEmployees}
                      multiple
                      nullable={true}
                      onChange={(value) => {
                        const newValues = tempEmployeePool.filter((x) => !value.includes(x));

                        setSelectedEmployees(value.sort((a, b) => (a.name > b.name ? 1 : -1)));

                        setValue("employees", value);

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
                                      setValue("employees", newSelectedEmployees);
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
            </form>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                {/* <button
                  className="px-3 py-2 text-white bg-indigo-600"
                  onClick={() => console.log(getValues("trainingEnd"))}
                >
                  Training End
                </button> */}
                <Button
                  size="small"
                  // type="button"
                  form="addBatchingForm"
                  type="submit"
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
