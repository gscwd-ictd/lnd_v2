import { ActionDropdown } from "@lms/components/osprey/ui/custom-dropdown/CustomDropdown";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { getTrainingTypeFromString } from "@lms/utilities/functions/getTrainingTypeFromString";
import { LspSource, useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import {
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import { TrainingNotice, TrainingPreparationStatus } from "@lms/utilities/types/training";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";

export const useTrainingNoticeDataTable = () => {
  const helper = createColumnHelper<TrainingNotice>();
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState<boolean>(false);
  const [trainingNoticeId, setTrainingNoticeId] = useState<string>("");
  const [sendModalIsOpen, setSendModalIsOpen] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [nomineeStatusIsOpen, setNomineeStatusIsOpen] = useState<boolean>(false);
  const [confirmCompleteModalIsOpen, setConfirmCompleteModalIsOpen] = useState<boolean>(false);
  const [sendConfirmationModalIsOpen, setSendConfirmationModalIsOpen] = useState<boolean>(false);
  const [submitToPdcSecModalIsOpen, setSubmitToPdcSecModalIsOpen] = useState<boolean>(false);
  const [viewTrainingNoticeModalIsOpen, setViewTrainingNoticeModalIsOpen] = useState<boolean>(false);
  const [viewDocumentsModalIsOpen, setViewDocumentsModalIsOpen] = useState<boolean>(false);
  const setPage = useTrainingNoticeModalStore((state) => state.setPage);
  const setAction = useTrainingNoticeModalStore((state) => state.setAction);
  const setId = useTrainingNoticeStore((state) => state.setId);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const setSelectedTrainingSource = useTrainingNoticeStore((state) => state.setSelectedTrainingSource);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);
  const setHasFetchedRecommendations = useTrainingNoticeStore((state) => state.setHasFetchedRecommendations);
  const setInitialTrainingRequirements = useTrainingNoticeStore((state) => state.setInitialTrainingRequirements);

  const columns = [
    helper.accessor("courseTitle", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("location", {
      header: "Location",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("trainingStart", {
      header: "Start Date",
      cell: (info) => dayjs(info.getValue()).format("MMMM DD, YYYY"),
    }),

    helper.accessor("trainingEnd", {
      header: "End Date",
      cell: (info) => dayjs(info.getValue()).format("MMMM DD, YYYY"),
    }),

    helper.accessor("source", {
      header: "Source",
      cell: (info) => (
        <span
          className={`${
            info.getValue() === "Internal"
              ? "text-purple-600 bg-purple-50 border-purple-100"
              : "text-amber-600 bg-amber-50 border-amber-100"
          } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
        >
          {info.getValue() === "Internal" ? "Internal" : "External"}
        </span>
      ),
    }),

    helper.accessor("type", {
      header: "Type",
      cell: (info) => (
        <span
          className={`${
            info.getValue() === "foundational"
              ? "text-red-600 bg-red-50 border-red-100"
              : info.getValue() === "technical"
              ? "text-orange-600 bg-orange-50 border-orange-100"
              : info.getValue() === "professional"
              ? "text-green-600 bg-green-50 border-green-100"
              : info.getValue() === "supervisory"
              ? "text-yellow-600 bg-yellow-50 border-yellow-100"
              : info.getValue() === "leadership/managerial"
              ? "text-blue-600 bg-blue-50 border-blue-100"
              : "text-gray-600 bg-gray-50 border-gray-100"
          } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
        >
          {info.getValue() === "foundational"
            ? "Foundational"
            : info.getValue() === "technical"
            ? "Technical"
            : info.getValue() === "professional"
            ? "Professional"
            : info.getValue() === "supervisory"
            ? "Supervisory"
            : info.getValue() === "leadership/managerial"
            ? "Leadership/Managerial"
            : ""}
        </span>
      ),
    }),

    helper.accessor("preparationStatus", {
      header: "Status",
      cell: (info) => GetTrainingStatus(info.getValue()),
    }),

    helper.accessor("id", {
      header: "Actions",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center">
          <ActionDropdown>
            <div className="z-[100] w-[12rem]  flex flex-col items-center text-center bg-white outline-none ring-0">
              {props.row.original.preparationStatus === TrainingPreparationStatus.PENDING ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    setPage(1);
                    setTrainingNoticeId(props.row.original.id);
                    setId(null);
                    setEditModalIsOpen(true);
                    e.stopPropagation();
                    setHasFetchedRecommendations(true);
                    setSelectedTrainingType(getTrainingTypeFromString(props.row.original.type));
                    setAction("update");
                    setSelectedTrainingSource({ name: props.row.original.source });
                    if (props.row.original.source === "External") {
                      setLspSource(LspSource.EXTERNAL);
                    }
                    setInitialTrainingRequirements([
                      { document: "Pre-test", isSelected: false },
                      { document: "Course Materials", isSelected: false },
                      { document: "Post Training Report", isSelected: false },
                      { document: "Course Evaluation Report", isSelected: false },
                      { document: "Learning Application Plan", isSelected: false },
                      { document: "Post-test", isSelected: false },
                    ]);
                  }}
                >
                  Edit
                </button>
              ) : null}

              {props.row.original.preparationStatus === TrainingPreparationStatus.ON_GOING_NOMINATION ||
              props.row.original.preparationStatus === TrainingPreparationStatus.PDC_APPROVAL ||
              props.row.original.preparationStatus === TrainingPreparationStatus.NOMINATION_DONE ||
              props.row.original.preparationStatus === TrainingPreparationStatus.GM_APPROVAL ||
              props.row.original.preparationStatus === TrainingPreparationStatus.DONE ||
              props.row.original.preparationStatus !== TrainingPreparationStatus.PENDING ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    setViewTrainingNoticeModalIsOpen(true);
                    setTrainingNoticeId(props.row.original.id);
                    e.stopPropagation();
                  }}
                >
                  View
                </button>
              ) : null}

              {props.row.original.preparationStatus === TrainingPreparationStatus.PENDING ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    setSendModalIsOpen(true);
                    setTrainingNoticeId(props.row.original.id);
                    e.stopPropagation();
                  }}
                >
                  Send to Managers
                </button>
              ) : null}
              {props.row.original.preparationStatus === TrainingPreparationStatus.ON_GOING_NOMINATION ||
              props.row.original.preparationStatus === TrainingPreparationStatus.NOMINATION_DONE ||
              props.row.original.preparationStatus === TrainingPreparationStatus.PDC_APPROVAL ||
              props.row.original.preparationStatus === TrainingPreparationStatus.GM_APPROVAL ||
              props.row.original.preparationStatus === TrainingPreparationStatus.DONE ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNomineeStatusIsOpen(true);
                    setTrainingNoticeId(props.row.original.id);
                  }}
                >
                  Nominee Status
                </button>
              ) : null}

              {props.row.original.preparationStatus === TrainingPreparationStatus.ON_GOING_NOMINATION ||
              props.row.original.preparationStatus === TrainingPreparationStatus.NOMINATION_DONE ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    // set modal to true
                    e.stopPropagation();
                    setSubmitToPdcSecModalIsOpen(true);
                  }}
                >
                  Submit to PDC Secretariat
                </button>
              ) : null}

              {/* {props.row.original.preparationStatus === TrainingPreparationStatus.PDC_APPROVAL && (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    // set modal to true
                    e.stopPropagation();
                    setViewDocumentsModalIsOpen(true);
                  }}
                >
                  View Documents
                </button>
              )} */}

              <button
                className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                onClick={(e) => {
                  // set modal to true
                  e.stopPropagation();
                  setTrainingNoticeId(props.row.original.id);
                  setViewDocumentsModalIsOpen(true);
                }}
              >
                Batching & Documents
              </button>

              {props.row.original.preparationStatus === TrainingPreparationStatus.DONE ? (
                <Tooltip content="Generate document" withArrow>
                  <button
                    className="text-gray-800 transition-colors rounded"
                    onClick={(e) => {
                      // set modal to true
                      e.stopPropagation();
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </Tooltip>
              ) : null}

              <button
                className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                onClick={(e) => {
                  setRemoveModalIsOpen(true);
                  e.stopPropagation();
                  setTrainingNoticeId(props.row.original.id);
                }}
              >
                Delete
              </button>
            </div>
          </ActionDropdown>
        </div>
      ),
    }),
  ];

  return {
    columns,
    editModalIsOpen,
    removeModalIsOpen,
    sendModalIsOpen,
    isComplete,
    isSending,
    trainingNoticeId,
    nomineeStatusIsOpen,
    confirmCompleteModalIsOpen,
    sendConfirmationModalIsOpen,
    submitToPdcSecModalIsOpen,
    viewTrainingNoticeModalIsOpen,
    viewDocumentsModalIsOpen,
    setViewDocumentsModalIsOpen,
    setViewTrainingNoticeModalIsOpen,
    setSubmitToPdcSecModalIsOpen,
    setConfirmCompleteModalIsOpen,
    setSendConfirmationModalIsOpen,
    setIsComplete,
    setIsSending,
    setSendModalIsOpen,
    setRemoveModalIsOpen,
    setEditModalIsOpen,
    setNomineeStatusIsOpen,
  };
};

export const GetTrainingStatus = (status: TrainingPreparationStatus) => {
  if (status === TrainingPreparationStatus.PENDING)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-orange-700 bg-orange-100 border-orange-200">
        Pending
      </div>
    );
  else if (status === TrainingPreparationStatus.ON_GOING_NOMINATION)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem]  border font-semibold rounded text-red-700 bg-red-100 border-red-200">
        Ongoing Nomination
      </div>
    );
  else if (status === TrainingPreparationStatus.NOMINATION_DONE)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-orange-700 bg-orange-300 border-orange-200">
        Nomination Done
      </div>
    );
  else if (status === TrainingPreparationStatus.PDC_APPROVAL)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-blue-700 bg-blue-300 border-blue-200">
        PDC Approval
      </div>
    );
  else if (status === TrainingPreparationStatus.GM_APPROVAL)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-gray-700 bg-gray-300 border-gray-200">
        PDC Approval
      </div>
    );
  else if (status === TrainingPreparationStatus.DONE)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-green-700 bg-green-300 border-green-200">
        Done
      </div>
    );
};
