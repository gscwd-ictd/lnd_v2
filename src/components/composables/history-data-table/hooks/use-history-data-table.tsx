import { Batch } from "@lms/utilities/stores/training-notice-store";
import { TrainingNotice } from "@lms/utilities/types/training";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { BatchWithEmployees } from "../../recent-data-table/RecentDataTable";

export const useHistoryDataTable = () => {
  const helper = createColumnHelper<TrainingNotice>();
  // const [batches, setBatches] = useState<Batch[]>([
  //   { batchNumber: 1, employees: [], trainingDate: { from: "", to: "" } },
  // ]);
  const [hasFetchedBatches, setHasFetchedBatches] = useState<boolean>(false);
  const [viewSlideOverIsOpen, setViewSlideOverIsOpen] = useState<boolean>(false);
  const [batchesWithEmployees, setBatchesWithEmployees] = useState<Array<BatchWithEmployees>>([]);
  const [id, setId] = useState<string>("");

  const columns = [
    helper.accessor("courseTitle", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("location", {
      header: "Location",
      cell: (info) => <div className="truncate max-w-[22rem]">{info.getValue()}</div>,
    }),

    helper.accessor("numberOfParticipants", {
      header: "No. of Participants",
      // cell: () => Math.round(Math.random() * 100),
      cell: (info) => info.getValue(),
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
  ];

  return {
    columns,
    id,
    viewSlideOverIsOpen,
    hasFetchedBatches,
    batchesWithEmployees,
    setBatchesWithEmployees,
    setHasFetchedBatches,
    setViewSlideOverIsOpen,
    setId,
  };
};
