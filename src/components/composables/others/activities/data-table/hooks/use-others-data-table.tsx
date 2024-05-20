import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { getActivityCategoryBadgePill } from "@lms/utilities/functions/getActivityCategoryBadgePill";
import { getOthersStatusBadgePill } from "@lms/utilities/functions/getOthersStatusBadgePill";
import { useDeleteOthersModalStore, useEditOthersModalStore, useOthersStore } from "@lms/utilities/stores/others-store";
import { Others, OthersStatus } from "@lms/utilities/types/others";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";

export const useOthersDataTable = () => {
  const [othersId, setOthersId] = useState<string | null>(null);
  const helper = createColumnHelper<Others>();
  const setTitle = useOthersStore((state) => state.setTitle);
  const setId = useOthersStore((state) => state.setId);
  const setAction = useOthersStore((state) => state.setAction);
  const setModalIsOpen = useEditOthersModalStore((state) => state.setModalIsOpen);
  const setDeleteModalIsOpen = useDeleteOthersModalStore((state) => state.setModalIsOpen);
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
      cell: (info) => dayjs(info.getValue()).format("MMM DD, YYYY"),
    }),

    helper.accessor("dateTo", {
      header: "End Date",
      cell: (info) => dayjs(info.getValue()).format("MMM DD, YYYY"),
    }),

    helper.accessor("category", {
      header: "Category",
      cell: (info) => getActivityCategoryBadgePill(info.getValue()),
    }),

    helper.accessor("status", {
      header: "Status",
      cell: (info) => getOthersStatusBadgePill(info.getValue()),
    }),

    helper.accessor("id", {
      header: "Actions",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-2 justify-start">
          {props.row.original.status === OthersStatus.PENDING ? (
            <>
              <Tooltip content="Update" withArrow>
                <button
                  className="text-gray-800 transition-colors rounded"
                  onClick={(e) => {
                    setId(props.row.original.id);
                    setAction("update");
                    // open modal here
                    setModalIsOpen(true);
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
              <Tooltip content="Delete" withArrow>
                <button
                  className="text-gray-800 transition-colors rounded"
                  onClick={(e) => {
                    setOthersId(null);
                    setId(props.row.original.id);
                    setTitle(props.row.original.title);
                    // open delete modal here
                    setDeleteModalIsOpen(true);
                    e.stopPropagation();
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </Tooltip>
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    }),
  ];
  return { columns, othersId, setOthersId };
};
