import { Orientation } from "@lms/utilities/types/orientation";
import { createColumnHelper } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

type OrientationNoticeState = {
  id: string;
  editModalIsOpen: boolean;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const useOrientationDataTable = () => {
  const helper = createColumnHelper<Orientation>();

  const columns = [
    helper.accessor("title", {
      header: "Title",
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
