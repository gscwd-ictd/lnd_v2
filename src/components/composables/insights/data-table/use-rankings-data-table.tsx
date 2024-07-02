import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { getLspTypeBadgePill } from "@lms/utilities/functions/getLspTypeBadgePill";
import { getSourceBadgePill } from "@lms/utilities/functions/getSourceBadgePill";
import { createColumnHelper } from "@tanstack/react-table";
import { HiUserCircle } from "react-icons/hi";

export type LspDetails = {
  lspId: string;
  name: string;
  type: string;
  source: string;
  average: string;
  photoUrl: string | null;
  rank: number;
};

export const useRankingsDataTable = () => {
  const helper = createColumnHelper<LspDetails>();

  const columns = [
    helper.accessor("rank", {
      header: "Rank",
      cell: (info) => (
        <div
          className={`font-semibold ${
            info.row.original.rank + 1 === 1
              ? "text-amber-500"
              : info.row.original.rank + 1 === 2
              ? "text-slate-500"
              : info.row.original.rank + 1 === 3
              ? "text-amber-900"
              : "text-gray-800"
          }`}
        >
          {info.row.original.rank}
        </div>
      ),
      enableColumnFilter: false,
    }),
    helper.accessor("name", {
      header: "Name",
      cell: (info) => {
        return (
          <div className="flex gap-2 items-center justify-start">
            {info.row.original.photoUrl === null ||
            info.row.original.photoUrl === "" ||
            info.row.original.photoUrl == undefined ? (
              <HiUserCircle className="w-8 h-8 text-slate-500" />
            ) : (
              // <Image src={lsp.photoUrl} alt="user-image" width={24} height={20} />
              <Avatar source={info.row.original.photoUrl} size="sm" />
            )}
            <span> {info.getValue()}</span>
          </div>
        );
      },
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
      enableColumnFilter: false,
    }),
  ];

  return { columns };
};
