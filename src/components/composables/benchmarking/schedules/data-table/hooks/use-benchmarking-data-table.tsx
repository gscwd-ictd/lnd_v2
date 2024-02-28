import { Benchmarking } from "@lms/utilities/types/benchmarking";
import { createColumnHelper } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

type BenchmarkingState = {
  id: string;
  editModalIsOpen: boolean;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const useBenchmarkingDataTable = () => {
  const helper = createColumnHelper<Benchmarking>();

  const columns = [
    helper.accessor("purpose", {
      header: "Purpose",
      cell: (info) => info.getValue(),
    }),
    helper.accessor("location", {
      header: "Location",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("dateStart", {
      header: "Start Date",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("dateEnd", {
      header: "End Date",
      cell: (info) => info.getValue(),
    }),
  ];
  return { columns };
};
