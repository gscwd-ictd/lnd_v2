import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useEditBenchmarkingModalStore, useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { FunctionComponent, useContext } from "react";
import { AddParticipants } from "../pages/AddParticipants";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { EditActivityDetails } from "../pages/EditActivityDetails";
import { EditUploadActivityAttachment } from "../pages/EditUploadActivityAttachment";
import { useBenchmarkingToastOptions } from "../data-table/BenchmarkingDataTable";

export const EditBenchmarkingModal: FunctionComponent = () => {
  const queryClient = useQueryClient();

  const modalIsOpen = useEditBenchmarkingModalStore((state) => state.modalIsOpen);
  const setModalIsOpen = useEditBenchmarkingModalStore((state) => state.setModalIsOpen);
  const page = useEditBenchmarkingModalStore((state) => state.page);
  const setPage = useEditBenchmarkingModalStore((state) => state.setPage);

  const resetModal = useEditBenchmarkingModalStore((state) => state.resetModal);
  const reset = useBenchmarkingStore((state) => state.reset);
  const bucketFiles = useBenchmarkingStore((state) => state.bucketFiles);
  const participants = useBenchmarkingStore((state) => state.participants);

  const { setToastOptions } = useBenchmarkingToastOptions();

  const editBenchmarkingMutation = useMutation({
    mutationFn: async () => {
      //
    },
  });

  const onClose = () => {
    setModalIsOpen(false);
    resetModal();
    reset();
  };

  const onNext = async () => {
    if (page === 1 && bucketFiles.length === 0) {
      setToastOptions("danger", "Error", "You have not uploaded anything.");
    } else if (page === 3 && participants.length < 1) {
      setToastOptions("danger", "Error", "You have not added any participant.");
    } else if (page === 3 && participants.length > 0) await editBenchmarkingMutation.mutateAsync();
    else setPage(page + 1);
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={onClose} size="md">
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              <h3 className="text-lg font-semibold text-gray-600">Edit Benchmarking Activity</h3>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {page === 1 && <EditUploadActivityAttachment />}
              {page === 2 && <EditActivityDetails />}
              {page === 3 && <AddParticipants />}
            </main>
          </ModalContent.Body>
          <ModalContent.Footer>
            <ModalContent.Footer>
              <div className="px-2 pt-2 pb-3">
                <div className="flex items-center justify-end w-full gap-2">
                  {page === 1 && (
                    <Button variant="white" className="w-[5rem]" onClick={onClose}>
                      Cancel
                    </Button>
                  )}
                  {page === 2 && (
                    <Button variant="white" className="w-[5rem]" onClick={() => setPage(1)}>
                      Previous
                    </Button>
                  )}
                  {page === 3 && (
                    <Button variant="white" className="w-[5rem]" onClick={() => setPage(2)}>
                      Previous
                    </Button>
                  )}
                  {page === 1 && (
                    <Button className="w-[5rem]" onClick={onNext}>
                      Next
                    </Button>
                  )}
                  {page === 2 && (
                    <Button className="w-[5rem]" type="submit" form="benchmarkDetailsForm">
                      Next
                    </Button>
                  )}
                  {page === 3 && (
                    <Button
                      className="w-[5rem] disabled:bg-indigo-300 disabled:cursor-not-allowed"
                      onClick={onNext}
                      disabled={editBenchmarkingMutation.isLoading ? true : false}
                    >
                      {editBenchmarkingMutation.isLoading ? <Spinner size="xs" /> : null} {"Submit"}
                    </Button>
                  )}
                </div>
              </div>
            </ModalContent.Footer>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
