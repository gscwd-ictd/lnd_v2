"use client";

import { FunctionComponent } from "react";

import { CustomToastProvider } from "./ToastContext";
import { UpdateTrainingDesignComponent } from "./UpdateTrainingDesignComponent";

export const UpdateTrainingDesign: FunctionComponent = () => {
  return (
    <>
      <CustomToastProvider>
        <UpdateTrainingDesignComponent />
      </CustomToastProvider>
    </>
  );
};
