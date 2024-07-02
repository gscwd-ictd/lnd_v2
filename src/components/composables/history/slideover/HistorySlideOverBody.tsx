import { useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import dayjs from "dayjs";
import { Suspense, useContext } from "react";
import { isEmpty } from "lodash";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { HistoryContext } from "../../history-data-table/HistoryDataTable";
import { EmployeeBatches } from "./EmployeeBatches";

export const HistorySlideOverBody = () => {
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const location = useTrainingNoticeStore((state) => state.location);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const selectedFacilitators = useTrainingNoticeStore((state) => state.selectedFacilitators);
  const from = useTrainingNoticeStore((state) => state.trainingStart);
  const to = useTrainingNoticeStore((state) => state.trainingEnd);
  const trainingHours = useTrainingNoticeStore((state) => state.numberOfHours);
  const { batchesWithEmployees, setRequirementsModalIsOpen } = useContext(HistoryContext);
  const participants = useTrainingNoticeStore((state) => state.numberOfParticipants);

  return (
    <>
      <div className="flex w-full">
        <button
          onClick={() => {
            setRequirementsModalIsOpen(true);
          }}
          className="w-full border-2 border-gray-200 mx-[15%]  -mt-1 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 rounded-b-full h-[3rem]"
        >
          <span className="text-white uppercase tracking-widest">Requirements Summary</span>
        </button>
      </div>
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
        <div className="">
          <div className="pb-2 font-semibold text-left text-md text-zinc-600 ">Tags</div>
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
          <div className="pb-1.5 font-semibold text-left text-md text-zinc-600 ">
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
          <div className="pb-2 font-semibold text-left text-md text-zinc-600">Total No. of Participants</div>
          <div className="text-sm font-normal text-left text-gray-700 ">{participants}</div>
        </div>

        <Suspense
          fallback={
            <div className="items-center justify-center w-full h-full">
              <Spinner borderSize={2} />
            </div>
          }
        >
          <EmployeeBatches batches={batchesWithEmployees} />
        </Suspense>
      </div>

      {/* <AlertDialog open={confirmAlertIsOpen} onOpenChange={setConfirmAlertIsOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">Move to recents</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to move the training to recents and change the status to &ldquo;For requirements
              submission&ldquo;?
            </label>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="soft">Cancel</Button>
            <Button
              onClick={async () => {
                confirmToSubmit.mutateAsync();
              }}
            >
              Submit
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
};
