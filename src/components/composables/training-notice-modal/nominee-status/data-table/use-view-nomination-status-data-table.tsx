import { getNominationStatusBadgePill } from "@lms/utilities/functions/getNominationStatusBadgePill";
import { getNomineeAcceptanceStatusBadgePill } from "@lms/utilities/functions/getNomineeAcceptanceStatusBadgePill";
import { TrainingNominationDetails, TrainingNominationStatus } from "@lms/utilities/types/training";
import { createColumnHelper } from "@tanstack/react-table";

export const useViewNominationStatusDataTable = () => {
  const helper = createColumnHelper<TrainingNominationDetails>();

  const columns = [
    helper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("slot", {
      header: "Slots",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
    }),

    helper.accessor("accepted", {
      header: "Accepted",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
    }),

    helper.accessor("pending", {
      header: "Pending",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
    }),

    helper.accessor("declined", {
      header: "Declined",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
    }),

    helper.accessor("status", {
      header: "Nomination Status",
      cell: (info) =>
        getNominationStatusBadgePill(
          info.getValue() === "nomination pending"
            ? "nomination pending"
            : info.getValue() === "nomination skipped"
            ? "nomination skipped"
            : "nomination submitted"
        ),
    }),

    helper.display({
      header: "Nominee Actions",
      cell: (info) =>
        getNomineeAcceptanceStatusBadgePill(
          info.row.original.slot,
          info.row.original.accepted,
          info.row.original.pending,
          info.row.original.declined,
          info.row.original.status
        ),
    }),

    helper.accessor("remarks", {
      header: "Remarks",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      enableSorting: false,
    }),
  ];

  return { columns };
};
