"use client";

import { CreateTrainingDesign } from "@lms/components/composables/training-design/CreateTrainingDesign";
import { CustomToastProvider } from "@lms/components/composables/training-design/ToastContext";

export default function CreateTrainingDesignPage() {
  return (
    <>
      <CustomToastProvider>
        <CreateTrainingDesign />
      </CustomToastProvider>
    </>
  );
}
