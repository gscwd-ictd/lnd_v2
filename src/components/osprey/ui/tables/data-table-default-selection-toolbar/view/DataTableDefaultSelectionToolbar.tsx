"use client";

import { FunctionComponent, useContext } from "react";
import { Tooltip } from "../../../tooltip/view/Tooltip";
import { DataTableContext } from "../../data-table/view/DataTable";

export const DataTableDefaultSelectionToolbar: FunctionComponent = () => {
  const { table } = useContext(DataTableContext);
  return (
    <div className="flex items-center h-8 mt-2">
      <div className="flex items-center h-full gap-2 px-3 py-2 text-center rounded-l bg-indigo-50">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-indigo-500"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>

          <span className="text-xs font-medium text-indigo-500">
            {table.getSelectedRowModel().rows.length} {table.getSelectedRowModel().rows.length !== 1 ? "rows " : "row "}
            selected
          </span>
        </div>
      </div>

      <Tooltip
        content="Clear selection"
        withArrow
        sideOffset={2}
        className="bg-zinc-800 text-zinc-200 text-xs px-2 py-1 rounded z-[100]"
      >
        <button
          className="flex items-center justify-center w-8 h-full bg-indigo-500 rounded-r"
          onClick={() => table.resetRowSelection()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            strokeWidth={2}
            className="w-5 h-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};
