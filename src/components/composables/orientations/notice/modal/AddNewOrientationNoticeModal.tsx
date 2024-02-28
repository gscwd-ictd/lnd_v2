"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useOrientationModalStore } from "@lms/utilities/stores/orientation-store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const AddNewOrientationNotice = () => {
  const queryClient = useQueryClient();
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const { modalIsOpen, setModalIsOpen } = useOrientationModalStore((state) => ({
    modalIsOpen: state.modalIsOpen,
    setModalIsOpen: state.setModalIsOpen,
  }));

  return (
    <>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} animate={false} isStatic>
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
              <h3 className="text-lg font-semibold text-gray-600">New Orientation Schedule</h3>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">Test Body</main>
          </ModalContent.Body>
        </ModalContent>
      </Modal>
    </>
  );
};
