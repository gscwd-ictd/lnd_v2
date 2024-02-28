"use client";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { FunctionComponent } from "react";
import { useBenchmarkingDataTable } from "./hooks/use-benchmarking-data-table";
import { Benchmarking } from "@lms/utilities/types/benchmarking";

export const BenchmarkingDataTable: FunctionComponent = () => {
  const { columns } = useBenchmarkingDataTable();

  return (
    <>
      <DataTable<Benchmarking>
        datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/default-table`}
        queryKey={["benchmarking-activities"]}
        columns={columns}
        title="Benchmarking Activities"
        subtitle="List of all benchmarking activities "
      />
    </>
  );
};
