import { Disclosure } from "@headlessui/react";
import dayjs from "dayjs";
import { FunctionComponent } from "react";
import { useOthersSlideOver } from "../data-table/OthersDataTable";
import { useOthersCategoryStore, useOthersStore } from "@lms/utilities/stores/others-store";
import { getActivityCategoryBadgePill } from "@lms/utilities/functions/getActivityCategoryBadgePill";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export const OthersSlideOverBody: FunctionComponent = () => {
  const id = useOthersStore((state) => state.id);
  const title = useOthersStore((state) => state.title);
  const category = useOthersCategoryStore((state) => state.category);
  const location = useOthersStore((state) => state.location);
  const dateFrom = useOthersStore((state) => state.dateFrom);
  const dateTo = useOthersStore((state) => state.dateTo);
  const participants = useOthersStore((state) => state.participants);
  const setParticipants = useOthersStore((state) => state.setParticipants);
  const { slideOverIsOpen, setParticipantsModalIsOpen, hasFetchedParticipants, setHasFetchedParticipants } =
    useOthersSlideOver();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["view-other-details", id],
    enabled: !!id && slideOverIsOpen !== false,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/other/trainings/${id}`);
      return data;
    },
    onSuccess: (data) => {
      setParticipants(data.participants);
    },
  });

  return (
    <>
      <div className="flex w-full ">
        {/* <button
          className="w-full border-2 border-gray-200 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700  mx-[15%] h-[3rem] rounded-b-full -mt-1"
          onClick={() => setParticipantsModalIsOpen(true)}
        >
          <span className="text-white uppercase tracking-widest">Requirements</span>
        </button> */}
      </div>

      <div className="flex flex-col gap-5 px-8 py-10">
        {/* Title */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Title</div>
          <div className="text-md font-normal text-left text-gray-700 ">{title}</div>
        </div>

        {/* Partner */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Category</div>
          <div className="text-md font-normal text-left text-gray-700 ">{getActivityCategoryBadgePill(category)}</div>
        </div>

        {/* Location */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Location</div>
          <div className="text-md font-normal text-left text-gray-700 ">{location}</div>
        </div>

        {/* From */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Start Date</div>
          <div className="text-md font-normal text-left text-gray-700 ">{dayjs(dateFrom).format("MMMM DD, YYYY")}</div>
        </div>

        {/* To */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">End Date</div>
          <div className="text-md font-normal text-left text-gray-700 ">{dayjs(dateTo).format("MMMM DD, YYYY")}</div>
        </div>

        {/* Total number of participants */}
        {!data || (isFetching && !isError) ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-center w-full h-full">
              <Spinner size="small" />
            </div>
            <div className="flex items-center justify-center text-sm w-full h-full font-sans tracking-widest animate-pulse">
              Fetching Participants...
            </div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-full text-red-600 text-lg pt-5">
            Error in fetching participants
          </div>
        ) : data ? (
          <div>
            <div className="font-semibold text-left text-lg text-zinc-600 ">Total No. of Participants</div>
            {/* <div className="text-md font-normal text-left text-gray-700 ">{participants.length}</div> */}

            <Disclosure>
              {({ open }) => (
                <div>
                  <Disclosure.Button className="flex items-center justify-between w-full transition-all " tabIndex={-1}>
                    <div className="text-indigo-600 pb-2">
                      {participants?.length}{" "}
                      {participants?.length > 1 ? "participants" : participants?.length === 1 ? "participant" : null}
                    </div>
                  </Disclosure.Button>

                  <Disclosure.Panel>
                    {participants &&
                      participants.map((participant, idx) => {
                        return (
                          <ul key={idx} className="even:bg-gray-50 odd:bg-gray-100">
                            <li className="px-2 flex gap-2 items-center py-1">
                              <div className="text-xs text-gray-600 w-4">{idx + 1}. </div>
                              <div className="text-sm text-zinc-500 hover:text-indigo-700 active:text-indigo-800 ">
                                {participant.name}
                              </div>
                            </li>
                          </ul>
                        );
                      })}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        ) : null}
      </div>
    </>
  );
};
