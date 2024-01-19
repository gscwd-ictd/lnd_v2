import { useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import dayjs from "dayjs";
import { useContext } from "react";
import { OnGoingContext } from "../../on-going-data-table/OnGoingDataTable";
import { Disclosure } from "@headlessui/react";
import { isEmpty } from "lodash";
import { Button } from "@lms/components/osprey/ui/button/view/Button";

export const OnGoingSlideOverBody = () => {
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const location = useTrainingNoticeStore((state) => state.location);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const selectedFacilitators = useTrainingNoticeStore((state) => state.selectedFacilitators);
  const from = useTrainingNoticeStore((state) => state.trainingStart);
  const to = useTrainingNoticeStore((state) => state.trainingEnd);
  const trainingHours = useTrainingNoticeStore((state) => state.numberOfHours);
  const { batches } = useContext(OnGoingContext);
  const participants = useTrainingNoticeStore((state) => state.numberOfParticipants);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-10">
        {/* Course Title */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Course Title</div>
          <div className="text-sm font-normal text-left text-gray-700 ">{courseTitle}</div>
        </div>

        {/* Location */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Location</div>
          <div className="text-sm font-normal text-left text-gray-700 ">{location}</div>
        </div>

        {/* Tags */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Tags</div>
          <div className="flex gap-2 font-normal text-left text-gray-700 text-md ">
            {selectedTags.map((tag, idx) => {
              return (
                <div key={idx} className="px-3 py-2 text-xs font-semibold border rounded bg-zinc-100">
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Training Type */}
        <div>
          <div className="pb-2 font-semibold text-left text-md text-zinc-600 ">Training Type</div>
          {/* <div className="font-normal text-left text-gray-700 text-md "></div> */}
          <span
            className={`${
              selectedTrainingType === "foundational"
                ? "text-red-600 bg-red-50 border-red-300"
                : selectedTrainingType === "technical"
                ? "text-orange-600 bg-orange-50 border-orange-300"
                : selectedTrainingType === "professional"
                ? "text-green-600 bg-green-50 border-green-300"
                : selectedTrainingType === "supervisory"
                ? "text-yellow-600 bg-yellow-50 border-yellow-300"
                : selectedTrainingType === "leadership/managerial"
                ? "text-blue-600 bg-blue-50 border-blue-300"
                : "text-gray-600 bg-gray-50 border-gray-300"
            } text-xs px-3 py-2 font-semibold rounded border`}
          >
            {selectedTrainingType === "foundational"
              ? "Foundational"
              : selectedTrainingType === "technical"
              ? "Technical"
              : selectedTrainingType === "professional"
              ? "Professional"
              : selectedTrainingType === "supervisory"
              ? "Supervisory"
              : selectedTrainingType === "leadership/managerial"
              ? "Leadership/Managerial"
              : ""}
          </span>
        </div>

        {/* Facilitators */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">
            {selectedFacilitators.length > 1 ? "Learning Service Providers" : "Learning Service Provider"}
          </div>
          <div className="flex gap-2 font-normal text-left text-md ">
            {selectedFacilitators.map((faci, idx) => {
              return (
                <div key={idx} className="px-3 py-2 text-xs font-semibold text-white border rounded bg-zinc-600">
                  {faci.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Split the date and Training Hours */}

        <div className="flex justify-between gap-2">
          {/* Training Date */}
          <div>
            <div className="font-semibold text-left text-md text-zinc-600 ">Training Date</div>
            <div className="text-sm font-normal text-left text-gray-700 ">
              {!isEmpty(from) && !isEmpty(to) && dayjs(from).isSame(dayjs(to), "day")
                ? `${dayjs(from).format("MMMM D, YYYY")}`
                : `${dayjs(from).format("MMMM D-")}${dayjs(to).format("D, YYYY")}`}
            </div>
          </div>

          {/* Training Hours  */}
          <div>
            <div className="font-semibold text-left text-md text-zinc-600 ">Training Hours</div>
            <div className="text-sm font-normal text-center text-gray-700 ">{trainingHours}</div>
          </div>
        </div>

        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Total No. of Participants</div>
          <div className="text-sm font-normal text-left text-gray-700 ">{participants}</div>
        </div>

        <div>
          <div className="flex justify-between w-full mb-2">
            <div className="font-semibold text-left text-md text-zinc-600 ">
              <span>{batches.length}</span> {batches.length > 1 ? "Batches" : "Batch"}
            </div>
          </div>
          <div className="flex flex-col gap-2 font-normal text-left text-gray-700 text-md ">
            {batches.map((batch, idx) => {
              return (
                <Disclosure key={idx}>
                  {({ open }) => (
                    <div className="px-5 py-3 border-2 rounded bg-zinc-100">
                      <div className="flex items-center justify-between">
                        <Disclosure.Button
                          className="flex items-center justify-between w-full transition-all "
                          tabIndex={-1}
                        >
                          <div className="text-sm font-semibold">Batch {batch.batchNumber}</div>
                          <div className="text-xs font-medium text-gray-500">
                            {!isEmpty(batch.trainingDate.from) &&
                            !isEmpty(batch.trainingDate.to) &&
                            dayjs(batch.trainingDate.from).isSame(dayjs(batch.trainingDate.to), "day")
                              ? `${dayjs(batch.trainingDate.from).format("MMMM D, YYYY hh:mmA")}-${dayjs(
                                  batch.trainingDate.to
                                ).format("hh:mmA")}`
                              : `${dayjs(batch.trainingDate.from).format("MMMM D-")}${dayjs(to).format(
                                  "D, YYYY"
                                )} ${dayjs(batch.trainingDate.from).format("hh:mmA")}-${dayjs(
                                  batch.trainingDate.to
                                ).format("hh:mmA")}`}
                          </div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                          >
                            <path
                              d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Disclosure.Button>
                      </div>

                      <Disclosure.Panel className="" as="ul">
                        <div className="flex justify-end w-full mb-2">
                          <Button size="small" variant="soft">
                            Attendance
                          </Button>
                        </div>
                        {batch.employees && batch.employees.length > 0 ? (
                          batch.employees.map((emp, empIdx) => {
                            return (
                              <li key={empIdx} className="flex w-full text-sm text-gray-700">
                                <div className="w-[7%]">{empIdx + 1}.</div>
                                <div className="w-[93%]">{emp.name}</div>
                              </li>
                            );
                          })
                        ) : (
                          <div className="flex w-full h-[2rem] ">
                            <span className="pl-2 space-y-3 text-sm text-gray-400">- No Batches Found</span>
                          </div>
                        )}
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
