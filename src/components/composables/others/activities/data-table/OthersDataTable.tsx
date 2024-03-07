"use client";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Others } from "@lms/utilities/types/others";
import { useOrientationDataTable } from "./hooks/use-others-data-table";
import { FunctionComponent } from "react";

export const OthersDataTable: FunctionComponent = () => {
  const { columns } = useOrientationDataTable();

  return (
    <>
      <DataTable<Others>
        datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/default-table`}
        queryKey={["other-activities"]}
        columns={columns}
        title="Orientations, Meetings, and Symposiums"
        subtitle="List of all activities related."
      />
    </>
  );
};
