import { Combobox } from "@headlessui/react";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { EmployeeFlatWithSupervisor } from "@lms/utilities/types/training";
import React from "react";
import { FunctionComponent, useState } from "react";

export const employeesWithSupervisor: EmployeeFlatWithSupervisor[] = [
  {
    employeeId: "001",
    name: "Richard Vincent Narvaez",
    positionTitle: "Test",
    supervisor: { supervisorId: "123", name: "Michael Gabales" },
  },
  {
    employeeId: "002",
    name: "Hafez Benanben Saiyou",
    positionTitle: "Test",
    supervisor: { supervisorId: "123", name: "Michael Gabales" },
  },
  {
    employeeId: "003",
    name: "Jan Freigseg Lared",
    positionTitle: "Test",
    supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
  },
  {
    employeeId: "004",
    name: "Xavier Dale Dabuco",
    positionTitle: "Test",
    supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
  },
  {
    employeeId: "005",
    name: "Paul Ryner Uchiha",
    positionTitle: "Test",
    supervisor: { supervisorId: "234", name: "Ferdinand Ferrer" },
  },
  {
    employeeId: "006",
    name: "Joel Amoguis",
    positionTitle: "Test",
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
  {
    employeeId: "007",
    name: "Mark Leandre Gamutin",
    positionTitle: "Test",
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
  {
    employeeId: "008",
    name: "Ralph Mari Dayot",
    positionTitle: "Test",
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
  {
    employeeId: "009",
    name: "Louise Mae Soledad",
    positionTitle: "Test",
    supervisor: { supervisorId: "345", name: "Anjo Turija" },
  },
];

export const AddParticipants: FunctionComponent = () => {
  const [participantsPool, setParticipantsPool] = useState<Array<EmployeeFlatWithSupervisor>>(employeesWithSupervisor);
  const [selectedParticipants, setSelectedParticipants] = useState<Array<EmployeeFlatWithSupervisor>>([]);
  const [searchParticipant, setSearchParticipant] = useState<string>("");

  // filtered facilitators
  const filteredParticipants =
    searchParticipant === ""
      ? participantsPool
      : participantsPool?.filter((participant) =>
          participant.name.toLowerCase().includes(searchParticipant.toLowerCase())
        );

  return (
    <>
      <div className="mt-1 ">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="facilitator" className="block text-xs font-medium text-gray-700">
              Participants
            </label>

            <p className="text-xs text-gray-500">The list of people who will participate in the training.</p>
            {/* {errors.employees?.message ? <div className="text-xs text-red-700">List should not be empty!</div> : null} */}
          </div>
          {/* <div>
            <button
              type="button"
              onClick={addAllParticipants}
              disabled={tempEmployeePool.length === 0 ? true : false}
              className={`"w-auto rounded ${
                tempEmployeePool.length === 0 ? "bg-gray-700 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-400"
              } text-xs text-white px-3 py-2`}
            >
              {tempEmployeePool.length === 0
                ? "No participants left"
                : tempEmployeePool.length > 1 && selectedEmployees.length === 0
                ? "Add All Participants"
                : `Add ${tempEmployeePool.length} Remaining Participants`}
            </button>
          </div> */}
        </div>

        <div className="relative mt-2">
          <Combobox
            value={selectedParticipants}
            multiple
            nullable={true}
            onChange={(value) => {
              const newValues = participantsPool.filter((x) => !value.includes(x));

              setSelectedParticipants(value.sort((a, b) => (a.name > b.name ? 1 : -1)));

              //   setValue("employees", value);

              // setEmployeePool(newValues);
              setParticipantsPool(newValues);
            }}
          >
            <Combobox.Input as={React.Fragment}>
              <Input
                id="search-participant"
                autoComplete="off"
                onBlur={() => setSearchParticipant("")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setSearchParticipant(e.target.value)}
                size="small"
                placeholder="Search for participant"
                className="placeholder:text-xs"
              />
            </Combobox.Input>

            <Combobox.Options className="absolute z-[80] max-h-52 overflow-y-auto  bg-white w-full border rounded-md shadow-lg shadow-gray-100">
              {filteredParticipants?.length === 0 ? (
                <div className="flex items-center justify-center py-10">No results found</div>
              ) : (
                filteredParticipants.map((participant, index) => {
                  return (
                    <Combobox.Option key={index} value={participant}>
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
                              {participant.name}
                            </h3>
                            <p className={`${selected ? "" : "text-gray-400"} text-xs`}>
                              {participant.supervisor.name}
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
            <thead className="text-white rounded-t bg-sky-700">
              <tr>
                <th className="p-2 font-medium text-center border">#</th>
                <th className="p-2 font-medium border">Participant Name</th>
                <th className="p-2 font-medium border">Supervisor</th>
                <th className="p-2 font-medium border"></th>
              </tr>
            </thead>
            <tbody>
              {selectedParticipants.length > 0 ? (
                selectedParticipants.map((participant, idx) => {
                  return (
                    <tr className="even:bg-inherit odd:bg-zinc-50" key={participant.employeeId}>
                      <td className="p-2 text-sm font-light text-center border ">{idx + 1}</td>
                      <td className="p-2 text-sm font-light border ">{participant.name}</td>
                      <td className="p-2 text-sm font-light border ">{participant.supervisor.name}</td>
                      <td className="p-2 text-sm font-light border ">
                        <div className="text-center">
                          <button
                            className="text-white bg-red-500 border rounded-lg hover:text-black hover:bg-red-200"
                            type="button"
                            onClick={() => {
                              const newSelectedParticipants = [...selectedParticipants];
                              newSelectedParticipants.splice(idx, 1);
                              setSelectedParticipants(newSelectedParticipants);
                              // setValue("employees", newSelectedParticipants);
                              const newParticipants = [...participantsPool];
                              newParticipants.push(participant);

                              setParticipantsPool(
                                newParticipants
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
                })
              ) : (
                <td colSpan={4} rowSpan={4}>
                  <div className="w-full h-[6rem] flex justify-center items-center">
                    <span className="text-gray-500 font-medium text-lg">NO SELECTED PARTICIPANTS</span>
                  </div>
                </td>
              )}
            </tbody>
          </table>
        </div>
        <div className="pb-10"></div>
      </div>
    </>
  );
};
