"use client";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Orientation } from "@lms/utilities/types/orientation";
import { useOrientationDataTable } from "./hooks/use-orientation-notice-data-table";
import { FunctionComponent } from "react";

export const OrientationDataTable: FunctionComponent = () => {
  const { columns } = useOrientationDataTable();

  return (
    <>
      <DataTable<Orientation>
        datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/default-table`}
        queryKey={["orientation-activities"]}
        columns={columns}
        title="Orientations"
        subtitle="List of all orientations."
      />
    </>
  );
};
