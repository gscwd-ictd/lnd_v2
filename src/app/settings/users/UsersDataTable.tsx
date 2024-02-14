"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { url } from "@lms/utilities/url/api-url";
import { User } from "@lms/lib/types/users";

export const UsersDataTable: FunctionComponent = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <DataTable<User>
        title="Users"
        subtitle="List of users"
        columns={[
          {
            accessorKey: "fullName",
            cell: (info) => info.getValue(),
            header: "Description ",
          },
        ]}
        datasource={`${url}/hrms/lnd`}
        queryKey={["users"]}
        onRowClick={() => {}}
      />
    </>
  );
};
