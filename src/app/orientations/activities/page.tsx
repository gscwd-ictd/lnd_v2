import { OrientationDataTable } from "@lms/components/composables/orientations/notice/data-table/OrientationDataTable";
import { AddNewOrientationNotice } from "@lms/components/composables/orientations/notice/modal/AddNewOrientationNoticeModal";

export default function Schedules() {
  return (
    <div className="p-5">
      <div className="mb-3">
        <AddNewOrientationNotice />
      </div>
      <OrientationDataTable />
    </div>
  );
}
