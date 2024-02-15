"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { FunctionComponent } from "react";
import { TrainingSource } from "@lms/lib/types/training-source.type";
import { url } from "@lms/utilities/url/api-url";

export const TrainingSourceDataTable: FunctionComponent = () => {
  return (
    <>
      <DataTable<TrainingSource>
        title="Training Sources"
        subtitle="List of Training Source"
        columns={[
          {
            accessorKey: "name",
            cell: (info) => info.getValue(),
            header: "Description ",
          },
        ]}
        datasource={`${url}/training-sources`}
        queryKey={["trainingsource"]}
        onRowClick={() => {}}
      />
    </>
  );
};
