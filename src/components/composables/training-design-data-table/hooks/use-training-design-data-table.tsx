import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { TrainingDesign } from "@lms/lib/types/training-design.type";
import { trainingDesignUrl } from "@lms/utilities/url/api-url";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useTrainingDesignDataTable = () => {
  const helper = createColumnHelper<TrainingDesign>();
  const [edit, setEdit] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  const [trainingDesignId, setTrainingDesignId] = useState<string | undefined>("");
  const { push } = useRouter();

  const columns = [
    helper.accessor("courseTitle", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),

    helper.accessor("createdAt", {
      header: "Created",
      cell: (info) => dayjs(info.getValue()).format("MMM DD, YYYY HH:mm A"),
    }),

    helper.accessor("updatedAt", {
      header: "Updated",
      cell: (info) => dayjs(info.getValue()).format("MMM DD, YYYY HH:mm A"),
    }),

    helper.accessor("id", {
      header: "Actions",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Tooltip content="Update" withArrow>
            <button
              className="text-gray-800 transition-colors rounded"
              onClick={() => {
                push(`${trainingDesignUrl}/trainings/design/update/${info.getValue()}`);
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
          <Tooltip content="Print" withArrow>
            <Link href={`${trainingDesignUrl}/trainings/design/print/${info.getValue()}`} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                width="18"
                height="18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                />
              </svg>
            </Link>
          </Tooltip>
          <Tooltip content="Remove" withArrow>
            <button
              className="text-gray-800 transition-colors rounded"
              onClick={(e) => {
                setTrainingDesignId(info.getValue());
                setRemove(true);
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
        </div>
      ),
    }),
  ];

  return { columns, edit, remove, setEdit, setRemove, trainingDesignId };
};
