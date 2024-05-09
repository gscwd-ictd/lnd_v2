import { Combobox } from "@headlessui/react";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { EmployeeFlatWithSupervisor } from "@lms/utilities/types/training";
import { url } from "@lms/utilities/url/api-url";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FunctionComponent, useState } from "react";

export const EditParticipants: FunctionComponent = () => {
  const [searchParticipant, setSearchParticipant] = useState<string>("");
  const id = useBenchmarkingStore((state) => state.id);
  const participants = useBenchmarkingStore((state) => state.participants);
  const setParticipants = useBenchmarkingStore((state) => state.setParticipants);
  const participantsPool = useBenchmarkingStore((state) => state.participantsPool);
  const setParticipantsPool = useBenchmarkingStore((state) => state.setParticipantsPool);
  const queryClient = useQueryClient();

  /**
   *  get employee names
   */

  // filtered facilitators
  const filteredParticipants =
    searchParticipant === ""
      ? participantsPool
      : participantsPool?.filter((participant) =>
          participant.name.toLowerCase().includes(searchParticipant.toLowerCase())
        );

  const participantsState = queryClient.getQueryState(["assignable-benchmarking-participants"]);

  return (
    <>
      <div className="mt-1">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="facilitator" className="block text-xs font-medium text-gray-700">
              Participants
            </label>

            {/* {participantsData?.status} && {participantsData?.fetchStatus} */}

            <p className="text-xs text-gray-500">The list of people who will participate in the training.</p>
            {/* {errors.employees?.message ? <div className="text-xs text-red-700">List should not be empty!</div> : null} */}
          </div>
        </div>

        <div className="text-indigo-700 font-sans font-medium text-sm flex justify-end">
          {participants.length === 0 ? "None" : participants.length}{" "}
          {participants.length > 1
            ? "participants"
            : participants.length > 0 && participants.length < 2
            ? "participant"
            : "selected"}
        </div>
        {
          // participantsData?.status === "loading" ||
          participantsState?.fetchStatus === "fetching" ? (
            <div className="flex flex-col">
              <div className="flex items-center justify-center w-full h-full">
                <Spinner size="medium" />
              </div>
              <div className="flex items-center justify-center w-full h-full font-sans tracking-widest animate-pulse">
                Loading...
              </div>
            </div>
          ) : participantsState?.status === "error" ? (
            <div className="flex justify-center items-center h-full text-red-600 text-lg pt-5">
              Error in fetching participants
            </div>
          ) : (
            <div className="pt-5">
              <div>
                <Combobox
                  value={participants}
                  multiple
                  nullable={true}
                  onChange={(value) => {
                    const newValues = participantsPool.filter((x) => !value.includes(x));
                    // setSelectedParticipants(value.sort((a, b) => (a.name > b.name ? 1 : -1)));
                    setParticipants(value.sort((a, b) => (a.name > b.name ? 1 : -1)));
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

                  <Combobox.Options className="absolute z-[80] max-h-60 overflow-y-auto  bg-white w-full border rounded-md shadow-lg shadow-gray-100">
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
                                  } border-b  border-b-gray-100 px-4 py-1`}
                                >
                                  <h3 className={"text-indigo-700 font-medium text-lg"}>{participant.name}</h3>

                                  <p className={`${selected ? "" : "text-gray-400"} text-xs`}>
                                    {participant.positionTitle}
                                  </p>
                                  <p className={`${selected ? "" : "text-gray-400"} text-xs`}>
                                    {participant.assignment}
                                  </p>
                                  <p className={`${selected ? "" : "text-gray-500"} font-sans   text-xs`}>
                                    {participant.supervisorName}
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

              {participants.length > 0 ? (
                <div className="relative overflow-auto rounded-lg shadow-md">
                  <table className="w-full text-left ">
                    <thead className="text-slate-600 rounded-t bg-slate-200">
                      <tr>
                        <th className="p-2 font-medium text-center border">#</th>
                        <th className="p-2 font-medium border">Participant Name</th>
                        <th className="p-2 font-medium border">Supervisor</th>
                        <th className="p-2 font-medium border"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.length > 0 ? (
                        participants.map((participant, idx) => {
                          return (
                            <tr className="even:bg-inherit odd:bg-zinc-50" key={participant.employeeId}>
                              <td className="p-2 text-sm font-light text-center border ">{idx + 1}</td>
                              <td className="p-2 text-sm font-light border ">{participant.name}</td>
                              <td className="p-2 text-sm font-light border ">{participant.supervisorName}</td>
                              <td className="p-2 text-sm font-light border ">
                                <div className="text-center">
                                  <button
                                    className="text-white bg-red-500 border rounded-lg hover:text-black hover:bg-red-200"
                                    type="button"
                                    onClick={() => {
                                      const newSelectedParticipants = [...participants];
                                      newSelectedParticipants.splice(idx, 1);
                                      setParticipants(newSelectedParticipants);
                                      const newParticipants = [...participantsPool];
                                      newParticipants.push(participant);

                                      setParticipantsPool(
                                        newParticipants
                                          .sort((a, b) => (a.name > b.name ? 1 : -1))
                                          .sort((a, b) =>
                                            a.supervisorName! > b.supervisorName!
                                              ? 1
                                              : a.supervisorName! === b.supervisorName
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
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center  min-h-[6.1rem] border-dashed items-center text-center rounded border-2">
                  <span className="text-gray-500   font-sans"> Select at lease one participant</span>
                </div>
              )}
            </div>
          )
        }
        <div className="pb-36"></div>
      </div>
    </>
  );
};
