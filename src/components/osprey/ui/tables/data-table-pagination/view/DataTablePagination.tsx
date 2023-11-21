"use client";

import { Table } from "@tanstack/react-table";
import React from "react";

type DataTablePaginationProps<T extends unknown> = {
  table: Table<T>;
};

export const DataTablePagination = <T extends unknown>({ table }: DataTablePaginationProps<T>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className={`${
            !table.getCanPreviousPage() ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-gray-600"
          } h-8 w-8 rounded flex items-center justify-center transition-colors`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
            <path
              d="M16.929 5L18.3432 6.41421L12.6863 12.0711L18.3432 17.7279L16.929 19.1421L9.85789 12.0711L16.929 5Z"
              fill="currentColor"
            />
            <path d="M8 19V5H6V19H8Z" fill="currentColor" />
          </svg>
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={`${
            !table.getCanPreviousPage() ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-gray-600"
          } h-8 w-8 rounded flex items-center justify-center transition-colors`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={`${
            !table.getCanNextPage() ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-gray-600"
          } h-8 w-8 rounded flex items-center justify-center transition-colors`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className={`${
            !table.getCanNextPage() ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 text-gray-600"
          } h-8 w-8 rounded flex items-center justify-center transition-colors`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.41421 5L6 6.41421L11.6569 12.0711L6 17.7279L7.41421 19.1421L14.4853 12.0711L7.41421 5Z"
              fill="currentColor"
            />
            <path d="M16.3432 19V5H18.3432V19H16.3432Z" fill="currentColor" />
          </svg>
        </button>

        {/* <div>{table.getRowModel().rows.length} Rows</div> */}
      </div>

      <span className="text-xs text-gray-600">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>

      <div className="inset-y-0 mr-2 text-xs">
        <div className="flex">
          <input
            type="number"
            placeholder="Go to page..."
            // defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="block w-56 px-4 py-3 pr-20 transition-colors border-transparent rounded-md placeholder:text-gray-400 group-hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500"
          />

          <div className="flex items-center text-gray-500 ">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="block w-full transition-colors border-transparent rounded-md group-hover:bg-gray-50 focus:ring-indigo-600 focus:border-indigo-600"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  <React.Fragment>{pageSize}</React.Fragment>
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
