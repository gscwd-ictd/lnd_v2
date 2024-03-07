import { Others } from "@lms/utilities/types/others";
import { createColumnHelper } from "@tanstack/react-table";

export const useOrientationDataTable = () => {
  const helper = createColumnHelper<Others>();

  const columns = [
    helper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    helper.accessor("location", {
      header: "Location",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("dateFrom", {
      header: "Start Date",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("dateTo", {
      header: "End Date",
      cell: (info) => info.getValue(),
    }),
  ];
  return { columns };
};
