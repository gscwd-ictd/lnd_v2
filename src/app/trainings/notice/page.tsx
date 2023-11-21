import { TrainingNoticeDataTable } from "@lms/components/composables/training-notice-data-table/TrainingNoticeDataTable";
import { AddNewTrainingNoticeModal } from "@lms/components/composables/training-notice-modal/AddNewTrainingNoticeModal";
export default function TrainingNotice() {
  return (
    <div className="p-5">
      <div className="mb-3">
        <AddNewTrainingNoticeModal />
      </div>

      <TrainingNoticeDataTable />
    </div>
  );
}
