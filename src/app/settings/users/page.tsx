import { AddNewUsersModal } from "@lms/components/composables/users/modal/AddNewUsersModal";
import { UsersDataTable } from "../users-data-table/UsersDataTable";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";

export default async function Users() {
  return (
    <>
      <div className="p-5">
        {/* Data table here */}
        <div className="flex justify-between items-center py-2.5 text-sm">
          <AddNewUsersModal />
          <BreadCrumbs
            crumbs={[
              { layerText: "Settings", path: "" },
              { layerText: "Training Type", path: "" },
            ]}
          />
        </div>
        <UsersDataTable />
      </div>
    </>
  );
}
