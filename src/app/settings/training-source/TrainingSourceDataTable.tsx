"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { TrainingSource } from "@lms/lib/types/training-source.type";
import { url } from "@lms/utilities/url/api-url";

export const TrainingSourceDataTable: FunctionComponent = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
        datasource={`http://172.20.110.45:5286/api/lms/v1/training-sources`}
        queryKey={["trainingsource"]}
        onRowClick={() => {}}
      />
    </>
  );
};
