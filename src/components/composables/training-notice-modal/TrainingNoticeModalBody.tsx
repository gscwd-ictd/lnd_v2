import { useTrainingNoticeModalStore, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { ChooseTrainingType } from "./ChooseTrainingType";
import { TrainingRequirementDocuments } from "./TrainingRequirementDocuments";
import { Recommendations } from "./Recommendations";
import { TrainingInformation } from "./TrainingInformation";
import { FunctionComponent } from "react";
import { TrainingNoticeSummary } from "./TrainingNoticeSummary";
import { ChooseLspSource } from "./ChooseLspSource";
import { UploadTrainingAttachment } from "./TrainingDesignAttachment";
import { EditInternalCourseOutline } from "./edit/EditInternalCourseOutline";
import { EditExternalCourseOutline } from "./edit/EditExternalCourseOutline";

export const TrainingNoticeModalBody: FunctionComponent = () => {
  const page = useTrainingNoticeModalStore((state) => state.page);
  const selectedTrainingSource = useTrainingNoticeStore((state) => state.selectedTrainingSource);

  return (
    <>
      <main className="px-2 space-y-4">
        {selectedTrainingSource.name === "Internal" && (
          <>
            {page === 1 && <ChooseTrainingType />}
            {page === 2 && <ChooseLspSource />}
            {page === 3 && <EditInternalCourseOutline />}
            {page === 4 && <TrainingInformation />}
            {page === 5 && <Recommendations />}
            {page === 6 && <TrainingRequirementDocuments />}
            {page === 7 && <TrainingNoticeSummary />}
          </>
        )}
        {selectedTrainingSource.name === "External" && (
          <>
            {page === 1 && <UploadTrainingAttachment />}
            {page === 2 && <ChooseTrainingType />}
            {page === 3 && <EditExternalCourseOutline />}
            {page === 4 && <TrainingInformation />}
            {page === 5 && <Recommendations />}
            {page === 6 && <TrainingRequirementDocuments />}
            {page === 7 && <TrainingNoticeSummary />}
          </>
        )}
      </main>
    </>
  );
};
