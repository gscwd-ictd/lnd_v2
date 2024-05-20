import { Tag } from "@lms/utilities/types/tags";
import { createColumnHelper } from "@tanstack/react-table";

export const useTagsDataTable = () => {
  const helper = createColumnHelper<Tag>();
  const columns = [
    helper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
  ];

  return { columns };
};
