"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useBenchmarkingModalStore, useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { ActivityDetails } from "../pages/ActivityDetails";
import { AddParticipants } from "../pages/AddParticipants";

export const AddNewBenchmarkingModal = () => {
  const page = useBenchmarkingModalStore((state) => state.page);
  const modalIsOpen = useBenchmarkingModalStore((state) => state.modalIsOpen);
  const reset = useBenchmarkingStore((state) => state.reset);
  const setPage = useBenchmarkingModalStore((state) => state.setPage);
  const resetModal = useBenchmarkingModalStore((state) => state.resetModal);
  const setModalIsOpen = useBenchmarkingModalStore((state) => state.setModalIsOpen);

  const onClose = () => {
    setModalIsOpen(false);
    resetModal();
    reset();
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        animate={false}
        isStatic
        size="md"
        fixedHeight
        onClose={onClose}
      >
        <Button
          size="small"
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <p>Add New</p>
        </Button>

        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              <h3 className="text-lg font-semibold text-gray-600">New Benchmarking Activity</h3>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {page === 1 && <ActivityDetails />}
              {page === 2 && <AddParticipants />}
            </main>
          </ModalContent.Body>
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
                {page === 1 && (
                  <Button className="w-[5rem]" type="submit" form="benchmarkDetailsForm">
                    Next
                  </Button>
                )}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
