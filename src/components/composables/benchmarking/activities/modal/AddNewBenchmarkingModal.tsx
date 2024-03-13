"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useBenchmarkingModalStore, useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { ActivityDetails } from "../pages/ActivityDetails";
import { AddParticipants } from "../pages/AddParticipants";
import { useMutation } from "@tanstack/react-query";
import { UploadActivityAttachment } from "../pages/UploadActivityAttachment";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { useState } from "react";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export const AddNewBenchmarkingModal = () => {
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const page = useBenchmarkingModalStore((state) => state.page);
  const modalIsOpen = useBenchmarkingModalStore((state) => state.modalIsOpen);
  const filesToUpload = useBenchmarkingStore((state) => state.filesToUpload);
  const participants = useBenchmarkingStore((state) => state.participants);
  const reset = useBenchmarkingStore((state) => state.reset);
  const setPage = useBenchmarkingModalStore((state) => state.setPage);
  const resetModal = useBenchmarkingModalStore((state) => state.resetModal);
  const setModalIsOpen = useBenchmarkingModalStore((state) => state.setModalIsOpen);
  const benchmarking = useBenchmarkingStore();

  const onClose = () => {
    setModalIsOpen(false);
    resetModal();
    reset();
  };

  const onNext = async () => {
    if (page === 1 && filesToUpload.length === 0) {
      setToastOptions("danger", "Error", "You have not uploaded anything.");
    } else if (page === 3 && participants.length < 1) {
      setToastOptions("danger", "Error", "You have not added any participant.");
    } else if (page === 3 && participants.length > 0) await addBenchmarkingMutation.mutateAsync();
    else setPage(page + 1);
  };

  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const addBenchmarkingMutation = useMutation({
    mutationFn: async () => {
      const { title, dateFrom, dateTo, location, participants, partner } = benchmarking;

      console.log({ title, dateFrom, dateTo, location, participants, partner });
    },
  });

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        animate={false}
        isStatic
        size="md"
        // fixedHeight
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
              {page === 1 && <UploadActivityAttachment />}
              {page === 2 && <ActivityDetails />}
              {page === 3 && <AddParticipants />}
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
                    disabled={addBenchmarkingMutation.isLoading ? true : false}
                  >
                    {addBenchmarkingMutation.isLoading ? <Spinner size="xs" /> : null} Submit
                  </Button>
                )}
              </div>
            </div>
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
