"use client";

import { Table } from "@tanstack/react-table";
import { DataTableGlobalSearch } from "../../data-table-global-search/view/DataTableGlobalSearch";

type DataTableHeaderProps<T extends unknown> = {
  title?: string;
  subtitle?: string;
  enableGlobalFilter?: boolean;
  table: Table<T>;
  fullWidthSearch?: boolean;
};

export const DataTableHeader = <T extends unknown>({
  title,
  subtitle,
  table,
  enableGlobalFilter,
  fullWidthSearch = false,
}: DataTableHeaderProps<T>) => {
  return (
    <div
      className={`px-6 py-3 flex ${
        (title || subtitle) && enableGlobalFilter && fullWidthSearch
          ? "flex-col justify-between"
          : (title || subtitle) && enableGlobalFilter && !fullWidthSearch
          ? "justify-between"
          : ""
      } bg-white`}
    >
      <header>
        <h3 className="text-gray-700 text-lg font-medium">{title}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </header>

      <div className={fullWidthSearch && enableGlobalFilter ? "w-full" : "w-auto"}>
        {enableGlobalFilter && <DataTableGlobalSearch table={table} />}
      </div>
    </div>
  );
};
