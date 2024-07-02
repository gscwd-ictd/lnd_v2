import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import dayjs from "dayjs";
import { FunctionComponent, Suspense, useContext } from "react";
import { RecentContext, useRecentToastOptions } from "../../recent-data-table/RecentDataTable";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { EmployeeRequirements } from "../slideover/EmployeeRequirements";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
export const RecentRequirementsModal: FunctionComponent = () => {
  const { setToastOptions } = useRecentToastOptions();
  const { batchAttendanceIsOpen, setBatchAttendanceIsOpen, selectedBatch, setHasFetchedBatches, requirements } =
    useContext(RecentContext);

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
            <div className="flex justify-end w-full gap-1 px-10 py-3">
              <button
                onClick={() => {
                  mutateRequirements.mutateAsync();
                }}
                className="w-[6rem] bg-indigo-500 px-3 py-2 rounded text-white active:bg-indigo-700 hover:bg-indigo-600"
              >
                Apply
              </button>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
