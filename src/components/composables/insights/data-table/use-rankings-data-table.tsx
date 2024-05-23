import { getLspTypeBadgePill } from "@lms/utilities/functions/getLspTypeBadgePill";
import { getSourceBadgePill } from "@lms/utilities/functions/getSourceBadgePill";
import { createColumnHelper } from "@tanstack/react-table";

export type LspDetails = {
  lspId: string;
  name: string;
  type: string;
  source: string;
  average: number;
  photoUrl: string | null;
};

export const useRankingsDataTable = () => {
  const helper = createColumnHelper<LspDetails>();

  const columns = [
    helper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("type", {
      header: "Type",
      enableSorting: false,
      cell: (info) => getLspTypeBadgePill(info.getValue()),
    }),

    helper.accessor("source", {
      header: "Source",
      enableSorting: false,
      cell: (info) => getSourceBadgePill(info.getValue()),
    }),
    helper.accessor("average", {
      header: "Average",
      cell: (info) => info.getValue(),
    }),
  ];

  return { columns };
};
