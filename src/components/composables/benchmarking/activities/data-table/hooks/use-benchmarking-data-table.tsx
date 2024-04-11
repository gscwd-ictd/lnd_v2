import { Benchmarking } from "@lms/utilities/types/benchmarking";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { useEditBenchmarkingModalStore, useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";

type BenchmarkingState = {
  id: string;
  editModalIsOpen: boolean;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const useBenchmarkingDataTable = () => {
  const helper = createColumnHelper<Benchmarking>();
  const setId = useBenchmarkingStore((state) => state.setId);
  const setModalIsOpen = useEditBenchmarkingModalStore((state) => state.setModalIsOpen);
  const setAction = useBenchmarkingStore((state) => state.setAction);

  const columns = [
    helper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    helper.accessor("partner", {
      header: "Partner",
      cell: (info) => info.getValue(),
    }),
    helper.accessor("location", {
      header: "Location",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("dateStarted", {
      header: "Start Date",
      cell: (info) => dayjs(info.getValue()).format("MMM DD, YYYY"),
    }),

    helper.accessor("dateEnd", {
      header: "End Date",
      cell: (info) => dayjs(info.getValue()).format("MMM DD, YYYY"),
    }),

    helper.accessor("id", {
      header: "Actions",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-2">
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
        </div>
      ),
    }),
  ];
  return { columns };
};
