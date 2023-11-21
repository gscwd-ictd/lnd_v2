"use client";
import { FunctionComponent } from "react";
import { BtnAddNewTrainingDesign } from "./BtnAddNewTrainingDesign";
import { TrainingDesignDataTable } from "../training-design-data-table/TrainingDesignDataTable";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { useToastContext } from "./ToastContext";

export const TrainingDesignComponent: FunctionComponent = () => {
  const { color, title, content, toastIsOpen, setToastIsOpen } = useToastContext();

  return (
    <>
      <div className="p-5">
        <div className="mb-3">
          <BtnAddNewTrainingDesign />
        </div>

        <TrainingDesignDataTable />
      </div>
      <Toast
        duration={3000}
        color={color}
        title={title}
        content={content}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
      />
    </>
  );
};
