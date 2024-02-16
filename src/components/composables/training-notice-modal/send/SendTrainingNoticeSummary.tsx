import { getCapitalizedTrainingType } from "@lms/utilities/functions/getTrainingTypeFromString";
import {
  TrainingRequirement,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { FunctionComponent, useContext, useEffect } from "react";
import { useTrainingNoticeDataTable } from "../../training-notice-data-table/hooks/use-training-notice-data-table";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { Storage } from "appwrite";
import { useAppwriteClient } from "@lms/components/osprey/appwrite/view/AppwriteContainer";
import convertSize from "convert-size";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";

export const SendTrainingNoticeSummary: FunctionComponent = () => {
  const client = useAppwriteClient();
  const { setNomineeStatusIsOpen } = useContext(TrainingNoticeContext);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const { isComplete, setIsComplete } = useTrainingNoticeDataTable();
  const {
    id,
    bucketFiles,
    selectedFacilitators,
    selectedTrainingDesign,
    selectedTrainingSource,
    selectedTags,
    courseTitle,
    numberOfParticipants,
    from,
    to,
    numberOfHours,
    location,
    slotDistribution,
    deadline,
    trainingRequirements,
    setBucketFiles,
  } = useTrainingNoticeStore((state) => ({
    id: state.id,
    selectedTrainingDesign: state.selectedTrainingDesign,
    bucketFiles: state.bucketFiles,
    selectedFacilitators: state.selectedFacilitators,
    selectedTags: state.selectedTags,
    courseTitle: state.courseTitle,
    numberOfParticipants: state.numberOfParticipants,
    selectedTrainingSource: state.selectedTrainingSource,
    from: state.trainingStart,
    to: state.trainingEnd,
    numberOfHours: state.numberOfHours,
    location: state.location,
    slotDistribution: state.slotDistribution,
    deadline: state.deadlineForSubmission,
    trainingRequirements: state.trainingRequirements,
    setBucketFiles: state.setBucketFiles,
  }));

  return (
    <div className="flex flex-col gap-2 px-6 py-4 text-sm text-gray-700 border-2 border-dashed rounded-lg bg-gray-50">
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        {selectedTrainingSource.name === "Internal" ? selectedTrainingDesign.courseTitle : courseTitle}
      </div>

      {selectedTrainingSource.name === "External" ? (
        <div className="flex items-start justify-start gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 0C16.7614 0 19 2.23858 19 5V17C19 20.866 15.866 24 12 24C8.13401 24 5 20.866 5 17V9H7V17C7 19.7614 9.23858 22 12 22C14.7614 22 17 19.7614 17 17V5C17 3.34315 15.6569 2 14 2C12.3431 2 11 3.34315 11 5V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V6H15V17C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17V5C9 2.23858 11.2386 0 14 0Z"
              fill="currentColor"
            />
          </svg>

          <Disclosure>
            {({ open }) => (
              <div>
                <Disclosure.Button className="flex items-center justify-between w-full transition-all " tabIndex={-1}>
                  <div className="text-indigo-500 ">
                    {bucketFiles?.length}{" "}
                    {bucketFiles?.length > 1
                      ? "attached training design files"
                      : bucketFiles?.length === 1
                      ? "attached training design file"
                      : null}
                  </div>
                </Disclosure.Button>

                <Disclosure.Panel className="" as="ul">
                  {bucketFiles &&
                    bucketFiles.map((file, idx) => {
                      return (
                        <div key={idx} className="pb-1 pl-5">
                          <span className="text-xs">{idx + 1}. </span>
                          <Link href={file.href} target="_blank">
                            <span className="text-xs text-zinc-500 hover:text-indigo-700 active:text-indigo-800 ">
                              {file.name}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div>
      ) : null}
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
          />
        </svg>
        {getCapitalizedTrainingType(selectedTrainingType!)} Training
      </div>
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
        {selectedTags.map((tag) => {
          return (
            <span key={tag.id} className="px-2 text-white bg-pink-400 rounded">
              {tag.name}
            </span>
          );
        })}
      </div>
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        {selectedFacilitators.map((faci) => {
          return (
            <span key={faci.id} className="px-2 text-white rounded bg-zinc-500">
              {faci.name}
            </span>
          );
        })}
      </div>
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        No. of participants: <span className="text-indigo-500">{numberOfParticipants}</span>
      </div>
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        <div className="flex gap-4">
          <div>
            {!isEmpty(to) ? "From: " : "Date: "}{" "}
            <span className="text-indigo-500">{!isEmpty(from) ? dayjs(from).format("MMMM DD, YYYY") : null}</span>
          </div>
          <div>
            {!isEmpty(to) ? "To: " : null}{" "}
            <span className="text-indigo-500">{!isEmpty(to) ? dayjs(to).format("MMMM DD, YYYY") : null}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-6 h-6 bi bi-hourglass"
          viewBox="0 0 16 16"
        >
          <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z" />{" "}
        </svg>
        <span className="text-indigo-500">{numberOfHours}</span>
        {numberOfHours && numberOfHours > 1 ? "hours in total" : "hour in total"}
      </div>
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {location}
      </div>
      <div className="flex items-start justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>
        <div className="w-full">
          <div className="flex items-start justify-start w-full gap-2">
            <div className="pb-2">Recommendations</div>

            <button
              className="flex items-center gap-1 px-2 py-1 text-white bg-indigo-400 border rounded"
              onClick={() => setNomineeStatusIsOpen(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3C6.40848 3 1.71018 6.82432 0.378052 12C1.71018 17.1757 6.40848 21 12 21C17.5915 21 22.2898 17.1757 23.6219 12C22.2898 6.82432 17.5915 3 12 3ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-xs ">Nominees</span>
            </button>
          </div>
          {slotDistribution &&
            slotDistribution.map((slot, idx) => {
              return (
                <div key={idx} className="flex w-full gap-2 pl-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    {slot.supervisor.name}
                  </div>

                  {slot.numberOfSlots > 0 ? (
                    <span className="text-indigo-500 ">
                      {slot.numberOfSlots}{" "}
                      {slot.numberOfSlots === 1 ? "allocated slot" : slot.numberOfSlots > 1 ? "allocated slots" : null}
                    </span>
                  ) : (
                    <span className="text-orange-600 ">No allocated slot</span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {/* <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Deadline for Submission: <span className="text-indigo-500">{dayjs(from).format("MMMM DD YYYY")}</span>
      </div> */}
      <div className="flex items-start justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
          />
        </svg>

        <div>
          <div className="pb-1">Training Requirements</div>
          {trainingRequirements &&
            trainingRequirements.map((req: TrainingRequirement, idx) => {
              return (
                <div key={idx} className="flex w-full gap-2 pl-2 gap-0s">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>

                  <span className="text-indigo-500">{req.document}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
