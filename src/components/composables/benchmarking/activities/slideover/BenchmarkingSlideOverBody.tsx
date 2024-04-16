import { Disclosure } from "@headlessui/react";
import { useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import dayjs from "dayjs";
import { FunctionComponent } from "react";
import { useBenchmarkingSlideOver } from "../data-table/BenchmarkingDataTable";

export const BenchmarkingSlideOverBody: FunctionComponent = () => {
  const title = useBenchmarkingStore((state) => state.title);
  const partner = useBenchmarkingStore((state) => state.partner);
  const location = useBenchmarkingStore((state) => state.location);
  const dateStarted = useBenchmarkingStore((state) => state.dateStarted);
  const dateEnd = useBenchmarkingStore((state) => state.dateEnd);
  const participants = useBenchmarkingStore((state) => state.participants);
  const { setParticipantsModalIsOpen } = useBenchmarkingSlideOver();

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-10">
        {/* Title */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Title</div>
          <div className="text-md font-normal text-left text-gray-700 ">{title}</div>
        </div>

        {/* Partner */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Partner</div>
          <div className="text-md font-normal text-left text-gray-700 ">{partner}</div>
        </div>

        {/* Location */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Location</div>
          <div className="text-md font-normal text-left text-gray-700 ">{location}</div>
        </div>

        {/* From */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Start Date</div>
          <div className="text-md font-normal text-left text-gray-700 ">
            {dayjs(dateStarted).format("MMMM DD, YYYY")}
          </div>
        </div>

        {/* To */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">End Date</div>
          <div className="text-md font-normal text-left text-gray-700 ">{dayjs(dateEnd).format("MMMM DD, YYYY")}</div>
        </div>

        {/* Total number of participants */}
        <div>
          <div className="font-semibold text-left text-lg text-zinc-600 ">Total No. of Participants</div>
          {/* <div className="text-md font-normal text-left text-gray-700 ">{participants.length}</div> */}

          <Disclosure>
            {({ open }) => (
              <div>
                <Disclosure.Button className="flex items-center justify-between w-full transition-all " tabIndex={-1}>
                  <div className="text-green-600 mb-5">
                    {participants?.length}{" "}
                    {participants?.length > 1 ? "participants" : participants?.length === 1 ? "file to upload" : null}
                  </div>
                </Disclosure.Button>

                <div className="flex w-full rounded mb-5">
                  <button
                    className="w-full border-2 border-gray-200 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-md h-[2.5rem]"
                    onClick={() => setParticipantsModalIsOpen(true)}
                  >
                    <span className="text-white uppercase">Requirements</span>
                  </button>
                </div>

                <Disclosure.Panel className="" as="ul">
                  {participants &&
                    participants.map((participant, idx) => {
                      return (
                        <div key={idx} className="pb-1 pl-5">
                          <span className="text-xs">{idx + 1}. </span>
                          <span className="text-xs text-zinc-500 hover:text-green-700 active:text-green-800 ">
                            {participant.name}
                          </span>
                          {/* <Link href={file.href} target="_blank">
                            <span className="text-xs text-zinc-500 hover:text-indigo-700 active:text-indigo-800 ">
                              {file.name}
                            </span>
                          </Link> */}
                        </div>
                      );
                    })}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div>

        {/* <div className="flex w-full rounded ">
          <button
            onClick={() => {
              // setRequirementsModalIsOpen(true);
            }}
            className="w-full border-2 border-gray-200 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-md h-[4rem]"
          >
            <span className="text-white uppercase">Requirements Summary</span>
          </button>
        </div> */}
      </div>
    </>
  );
};
