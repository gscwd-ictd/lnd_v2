import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import {
  LspSource,
  LspType,
  useEditLspModalStore,
  useLspDetailsStore,
  useLspSourceStore,
  useLspTypeStore,
} from "@lms/utilities/stores/lsp-details-store";
import { LearningServiceProvider } from "@lms/utilities/types/lsp";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

export const useIndividualLspDataTable = () => {
  const helper = createColumnHelper<LearningServiceProvider>();
  const [edit, setEdit] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  const [lspId, setLspId] = useState<string>("");
  const setLspType = useLspTypeStore((state) => state.setLspType);
  const setName = useLspDetailsStore((state) => state.setName);
  const { setPage } = useEditLspModalStore();
  const { setId, setLspAction } = useLspDetailsStore();
  const setLspSource = useLspSourceStore((state) => state.setLspSource);

  const columns = [
    helper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="flex items-center gap-1">
          {/* {info.row.original.firstName} {info.row.original.middleName} {info.row.original.lastName} */}
          <div className="flex items-center justify-center w-6 h-6 p-2 text-center text-white bg-gray-400 rounded-full">
            {info.row.original.name[0].toUpperCase()}
          </div>
          <div> {info.row.original.name}</div>
        </div>
      ),
    }),

    helper.accessor("email", {
      header: "Email",
      cell: (info) => info?.getValue()?.toLocaleLowerCase(),
    }),

    helper.accessor("source", {
      header: "Source",
      cell: (info) => (
        <span
          className={`${
            info.getValue() === LspSource.INTERNAL
              ? "text-purple-600 bg-purple-50 border-purple-100"
              : "text-amber-600 bg-amber-50 border-amber-100"
          } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
        >
          {info.getValue() === "internal" ? "Internal" : "External"}
        </span>
      ),
      enableSorting: false,
    }),

    helper.accessor("postalAddress", {
      header: "Address",
      cell: (info) => <div className="w-auto truncate">{info?.getValue()}</div>,
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
              onClick={(e) => {
                setLspId(info.getValue()!);
                setLspType(LspType.INDIVIDUAL);
                setLspSource(info.row.original.source === "internal" ? LspSource.INTERNAL : LspSource.EXTERNAL);
                setName(info.row.original.name);
                setPage(1);
                setLspAction("update");
                setId(null);
                setEdit(true);
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

          <Tooltip content="Remove" withArrow>
            <button
              className="text-gray-800 transition-colors rounded"
              onClick={(e) => {
                setLspId(info.getValue()!);
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

  return { columns, edit, remove, lspId, setEdit, setRemove };
};
