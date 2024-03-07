import { OthersDataTable } from "@lms/components/composables/others/activities/data-table/OthersDataTable";
import { AddNewOthersModal } from "@lms/components/composables/others/activities/modal/AddNewOthersModal";

export default function Schedules() {
  return (
    <div className="p-5">
      <div className="mb-3">
        <AddNewOthersModal />
      </div>
      <OthersDataTable />
    </div>
  );
}
