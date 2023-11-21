"use client";
import { FunctionComponent } from "react";
import { CustomToastProvider } from "./ToastContext";
import { TrainingDesignComponent } from "./TrainingDesignComponent";

export const TrainingDesignPage: FunctionComponent = () => {
  return (
    <>
      <CustomToastProvider>
        <TrainingDesignComponent />
      </CustomToastProvider>
    </>
  );
};
