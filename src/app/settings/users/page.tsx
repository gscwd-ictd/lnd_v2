import { AddNewUsersModal } from "@lms/components/composables/users/modal/AddNewUsersModal";
import { UsersDataTable } from "../users-data-table/UsersDataTable";

export default async function Users() {
  return (
    <>
      <div className="p-5">
        {/* Data table here */}
        <UsersDataTable />
      </div>
    </>
  );
}
