// export const getData = async () => {
//   const { data } = await axios.get(`http://172.20.110.45:5286/api/lms/v1/training-sources`);
//   return data as Pagination<TrainingSource>;
// };

import { AddNewUsersModal } from "@lms/components/composables/users/AddNewUsersModal";
import { UsersDataTable } from "./UsersDataTable";

export default async function Users() {
  return (
    <>
      <div className="p-5">
        <div>
          <AddNewUsersModal />
        </div>

        {/* Data table here */}
        <UsersDataTable />
      </div>
    </>
  );
}
