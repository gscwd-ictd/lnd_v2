import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import dayjs from "dayjs";
import { FunctionComponent, Suspense, useContext, useState } from "react";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { EmployeeRequirements } from "../slideover/EmployeeRequirements";
import { HistoryContext } from "../../history-data-table/HistoryDataTable";

export const HistoryRequirementsModal: FunctionComponent = () => {
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const { batchAttendanceIsOpen, setBatchAttendanceIsOpen, selectedBatch, setHasFetchedBatches, requirements } =
    useContext(HistoryContext);

  // mutate function
  const mutateRequirements = useMutation({
    onSuccess: async () => {
      // set this to false
      setBatchAttendanceIsOpen(false);
      // set this to true to fetch batches
      setHasFetchedBatches(true);
      setToastOptions("success", "Success", "You have successfully updated the batch requirements!");
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong. Please try again in a while.");
    },
    mutationFn: async () => {
      await axios.put(
        `${url}/training/requirements`,
        {
          batchNumber: selectedBatch.batchNumber,
          employees: selectedBatch.employees,
        },
        { withCredentials: true }
      );
    },
  });

  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={batchAttendanceIsOpen}
        setIsOpen={setBatchAttendanceIsOpen}
        size={requirements.filter((req) => req.isSelected !== null).length >= 5 ? "xl" : "lg"}
        onClose={() => {
          setHasFetchedBatches(false);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <div className="px-10 py-3">
              <p className="text-lg font-semibold text-gray-700">Batch {selectedBatch.batchNumber} Requirements</p>
              <div className="flex gap-2">
                {dayjs(selectedBatch.trainingDate?.from).isSame(dayjs(selectedBatch.trainingDate?.to), "day") ===
                true ? (
                  <span className="text-sm text-gray-600">
                    {dayjs(selectedBatch.trainingDate?.from).format("MMM DD, YYYY hh:mmA")}-
                    {dayjs(selectedBatch.trainingDate?.to).format("hh:mmA")}
                  </span>
                ) : dayjs(selectedBatch.trainingDate?.from).isSame(dayjs(selectedBatch.trainingDate?.to), "day") ===
                  false ? (
                  <span className="text-sm text-gray-600">
                    {dayjs(selectedBatch.trainingDate?.from).format("MMM DD, YYYY hh:mmA")}-
                    {dayjs(selectedBatch.trainingDate?.to).format("MMM DD, YYYY hh:mmA")}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </ModalContent.Title>
          <ModalContent.Body>
            <Suspense
              fallback={
                <div className="flex justify-center w-full h-full">
                  <Spinner />
                </div>
              }
            >
              <EmployeeRequirements />
            </Suspense>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex justify-end w-full gap-1 px-10 py-3"></div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
      <Toast
        duration={toastType.color === "danger" ? 2000 : 1500}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};
