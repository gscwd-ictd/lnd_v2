import { ActionDropdown } from "@lms/components/osprey/ui/custom-dropdown/CustomDropdown";
import { getTrainingTypeFromString } from "@lms/utilities/functions/getTrainingTypeFromString";
import { LspSource, useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import {
  Batch,
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import { EmployeeWithSupervisor, TrainingNotice, TrainingStatus } from "@lms/utilities/types/training";
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
  const [batchingModalIsOpen, setBatchingModalIsOpen] = useState<boolean>(false);
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus | undefined>(undefined);
  const [toUpcomingModalIsOpen, setToUpcomingModalIsOpen] = useState<boolean>(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch>({
    employees: [],
    batchNumber: 1,
    trainingDate: { from: "", to: "" },
  });
  const [toOngoingAlertIsOpen, setToOngoingAlertIsOpen] = useState<boolean>(false);
  const [selectedBatchModalIsOpen, setSelectedBatchModalIsOpen] = useState<boolean>(false);
  const [batches, setBatches] = useState<Batch[]>([
    { batchNumber: 1, employees: [], trainingDate: { from: "", to: "" } },
  ]);
  const [employeePool, setEmployeePool] = useState<EmployeeWithSupervisor[]>([]);
  const [totalSelectedEmployees, setTotalSelectedEmployees] = useState<EmployeeWithSupervisor[]>([]);
  const [employeesWithStatus, setEmployeesWithStatus] = useState<EmployeeWithSupervisor[]>([]);
  const setPage = useTrainingNoticeModalStore((state) => state.setPage);
  const setAction = useTrainingNoticeModalStore((state) => state.setAction);
  const setId = useTrainingNoticeStore((state) => state.setId);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const setSelectedTrainingSource = useTrainingNoticeStore((state) => state.setSelectedTrainingSource);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);
  const setHasFetchedRecommendations = useTrainingNoticeStore((state) => state.setHasFetchedRecommendations);
  const setInitialTrainingRequirements = useTrainingNoticeStore((state) => state.setInitialTrainingRequirements);
  const setTrainingSource = useTrainingNoticeStore((state) => state.setTrainingSource);

  const columns = [
    helper.accessor("courseTitle", {
      header: "Title",
      cell: (info) => (
        <div className="max-w-[16rem]">
          <h3>{info.getValue()}</h3>
        </div>
      ),
    }),

    helper.accessor("location", {
      header: "Location",
      cell: (info) => <div className="truncate max-w-[15rem]">{info.getValue()}</div>,
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

    helper.accessor("status", {
      header: "Status",
      enableColumnFilter: true,
      enableSorting: true,
      cell: (info) => GetTrainingStatus(info.getValue()),
    }),

    helper.accessor("id", {
      header: "Actions",
      cell: (props) => (
        <div className="flex items-center">
          <ActionDropdown>
            <div className="z-[100] w-[12rem]  flex flex-col items-center text-center bg-white outline-none ring-0">
              {props.row.original.status === TrainingStatus.PENDING ? (
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
                      { document: "Attendance", isSelected: true },
                      { document: "Certificate of Appearance", isSelected: false },
                      { document: "Certificate of Training", isSelected: false },
                      { document: "Course Evaluation Report", isSelected: false },
                      { document: "Course Materials", isSelected: false },
                      { document: "Learning Application Plan", isSelected: false },
                      { document: "Post Training Report", isSelected: false },
                      { document: "Post-test", isSelected: false },
                      { document: "Pre-test", isSelected: false },
                      { document: "Program", isSelected: false },
                    ]);
                  }}
                >
                  Edit
                </button>
              ) : null}
              {props.row.original.status === TrainingStatus.ON_GOING_NOMINATION ||
              props.row.original.status === TrainingStatus.PDC_SECRETARIAT_APPROVAL ||
              props.row.original.status === TrainingStatus.PDC_CHAIRMAN_APPROVAL ||
              props.row.original.status === TrainingStatus.NOMINATION_DONE ||
              props.row.original.status === TrainingStatus.GM_APPROVAL ||
              props.row.original.status !== TrainingStatus.PENDING ? (
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
              {props.row.original.status === TrainingStatus.PENDING ? (
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
              {props.row.original.status === TrainingStatus.ON_GOING_NOMINATION ||
              props.row.original.status === TrainingStatus.NOMINATION_DONE ||
              props.row.original.status === TrainingStatus.PDC_SECRETARIAT_APPROVAL ||
              props.row.original.status === TrainingStatus.PDC_CHAIRMAN_APPROVAL ||
              props.row.original.status === TrainingStatus.GM_APPROVAL ||
              props.row.original.status === TrainingStatus.FOR_BATCHING ||
              props.row.original.status === TrainingStatus.DONE_BATCHING ||
              props.row.original.status === TrainingStatus.UPCOMING ||
              props.row.original.status === TrainingStatus.ON_GOING_TRAINING ||
              props.row.original.status === TrainingStatus.REQUIREMENTS_SUBMISSION ||
              props.row.original.status === TrainingStatus.COMPLETED ? (
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

              {props.row.original.status === TrainingStatus.ON_GOING_NOMINATION ||
              props.row.original.status === TrainingStatus.NOMINATION_DONE ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    // set modal to true
                    e.stopPropagation();
                    setTrainingNoticeId(props.row.original.id);
                    setSubmitToPdcSecModalIsOpen(true);
                  }}
                >
                  Submit to PDC Secretariat
                </button>
              ) : null}

              {/* Training Status */}
              {props.row.original.status === TrainingStatus.FOR_BATCHING ||
              props.row.original.status === TrainingStatus.DONE_BATCHING ||
              props.row.original.status === TrainingStatus.UPCOMING ||
              props.row.original.status === TrainingStatus.ON_GOING_TRAINING ||
              props.row.original.status === TrainingStatus.REQUIREMENTS_SUBMISSION ||
              props.row.original.status === TrainingStatus.COMPLETED ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTrainingNoticeId(props.row.original.id);
                    setViewDocumentsModalIsOpen(true);
                  }}
                >
                  Training Approval Document
                </button>
              ) : null}

              {(props.row.original.status !== TrainingStatus.REQUIREMENTS_SUBMISSION &&
                props.row.original.status === TrainingStatus.FOR_BATCHING) ||
              props.row.original.status === TrainingStatus.DONE_BATCHING ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    // set modal to true
                    e.stopPropagation();
                    setTrainingNoticeId(props.row.original.id);
                    // setViewDocumentsModalIsOpen(true); changed to batching
                    setTrainingStatus(props.row.original.status);
                    setBatchingModalIsOpen(true);
                  }}
                >
                  Batching
                </button>
              ) : null}

              {/* Rescheduling */}
              {/* {props.row.original.status !== TrainingStatus.REQUIREMENTS_SUBMISSION &&
              props.row.original.status === TrainingStatus.DONE_BATCHING ? (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTrainingNoticeId(props.row.original.id);
                    // setViewDocumentsModalIsOpen(true);
                  }}
                >
                  Reschedule
                </button>
              ) : null} */}

              {props.row.original.status !== TrainingStatus.REQUIREMENTS_SUBMISSION &&
                props.row.original.status !== TrainingStatus.DONE_BATCHING && (
                  <button
                    className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                    onClick={(e) => {
                      setRemoveModalIsOpen(true);
                      e.stopPropagation();
                      setTrainingNoticeId(props.row.original.id);
                      setTrainingSource(props.row.original.source);
                    }}
                  >
                    Delete
                  </button>
                )}

              {props.row.original.status === TrainingStatus.DONE_BATCHING && (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    // setRemoveModalIsOpen(true);
                    setToUpcomingModalIsOpen(true);
                    e.stopPropagation();
                    setTrainingNoticeId(props.row.original.id);
                  }}
                >
                  Set to Upcoming
                </button>
              )}

              {props.row.original.status === TrainingStatus.UPCOMING && (
                <button
                  className="w-full p-2 text-gray-800 transition-colors hover:bg-gray-600 hover:text-white"
                  onClick={(e) => {
                    // setRemoveModalIsOpen(true);
                    // setToOnGo(true);
                    setToOngoingAlertIsOpen(true);
                    e.stopPropagation();
                    setTrainingNoticeId(props.row.original.id);
                  }}
                >
                  Set to Ongoing
                </button>
              )}
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
    batches,
    selectedBatch,
    selectedBatchModalIsOpen,
    employeePool,
    totalSelectedEmployees,
    employeesWithStatus,
    batchingModalIsOpen,
    trainingStatus,
    toUpcomingModalIsOpen,
    toOngoingAlertIsOpen,
    setToOngoingAlertIsOpen,
    setToUpcomingModalIsOpen,
    setTrainingStatus,
    setBatchingModalIsOpen,
    setEmployeesWithStatus,
    setTotalSelectedEmployees,
    setEmployeePool,
    setSelectedBatchModalIsOpen,
    setSelectedBatch,
    setBatches,
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

export const GetTrainingStatus = (status: TrainingStatus) => {
  if (status === TrainingStatus.PENDING)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-rose-700 bg-rose-100 border-rose-200">
        Pending
      </div>
    );
  else if (status === TrainingStatus.ON_GOING_NOMINATION)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem]  border font-semibold rounded text-red-700 bg-red-100 border-red-200">
        Ongoing Nomination
      </div>
    );
  else if (status === TrainingStatus.NOMINATION_DONE)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-orange-700 bg-orange-300 border-orange-200">
        Nomination Done
      </div>
    );
  else if (status === TrainingStatus.PDC_SECRETARIAT_APPROVAL)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-amber-700 bg-amber-300 border-amber-400">
        For Secretariat Approval
      </div>
    );
  else if (status === TrainingStatus.PDC_CHAIRMAN_APPROVAL)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-amber-700 bg-amber-300 border-amber-400">
        For Chairman Approval
      </div>
    );
  else if (status === TrainingStatus.GM_APPROVAL)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-amber-700 bg-amber-300 border-amber-400">
        For GM Approval
      </div>
    );
  else if (status === TrainingStatus.FOR_BATCHING)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-yellow-700 bg-yellow-300 border-yellow-400">
        For Batching
      </div>
    );
  else if (status === TrainingStatus.DONE_BATCHING)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border font-semibold rounded text-yellow-700 bg-yellow-300 border-yellow-400">
        Done Batching
      </div>
    );
  else if (status === TrainingStatus.UPCOMING)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-green-700 bg-green-100 border-green-400">
        Upcoming
      </div>
    );
  else if (status === TrainingStatus.ON_GOING_TRAINING)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-green-700 bg-green-100 border-green-400">
        Ongoing Training
      </div>
    );
  else if (status === TrainingStatus.REQUIREMENTS_SUBMISSION)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-emerald-700 bg-emerald-100 border-emerald-400">
        Requirements Submission
      </div>
    );
  else if (status === TrainingStatus.COMPLETED)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-emerald-700 bg-emerald-100 border-emerald-400">
        Completed
      </div>
    );
  else if (status === TrainingStatus.CANCELLED)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-white bg-red-700 border-red-400">
        Completed
      </div>
    );
  else if (status === TrainingStatus.PDC_SECRETARY_DECLINED)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-white bg-red-700 border-red-400">
        PDC Secretary Declined
      </div>
    );
  else if (status === TrainingStatus.GM_DECLINED)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-white bg-red-700 border-red-400">
        GM Declined
      </div>
    );
  else if (status === TrainingStatus.PDC_CHAIRMAN_DECLINED)
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-white bg-red-700 border-red-400">
        PDC Chairman Declined
      </div>
    );
  else
    return (
      <div className="text-center text-xs px-[0.25rem] py-[0.1rem] border  font-semibold rounded text-teal-700 bg-teal-100 border-teal-200">
        N/A
      </div>
    );
};
