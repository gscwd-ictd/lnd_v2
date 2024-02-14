"use client";
import { LspSource } from "@lms/utilities/stores/lsp-details-store";
import { useTrainingNoticeModalStore, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { FunctionComponent, useEffect } from "react";
import { UploadTrainingDesign } from "./UploadTrainingDesign";

export const UploadTrainingAttachment: FunctionComponent = () => {
  const action = useTrainingNoticeModalStore((state) => state.action);

  // the state to hold the selected training type from the options
  const setLspSource = useTrainingNoticeStore((state) => state.setLspSource);

  useEffect(() => {
    if (action === "create") {
      setLspSource(LspSource.EXTERNAL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  return (
    <>
      <div className="-mx-4">
        <UploadTrainingDesign />
      </div>
    </>
  );
};
