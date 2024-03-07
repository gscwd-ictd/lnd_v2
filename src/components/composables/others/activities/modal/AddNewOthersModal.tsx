"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useOthersCategoryStore, useOthersModalStore, useOthersStore } from "@lms/utilities/stores/others-store";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityDetails } from "../pages/ActivityDetails";
import { OtherCategorySelection } from "../pages/CategorySelection";
import { UploadActivityAttachment } from "../pages/UploadActivityAttachment";
import { isEmpty } from "lodash";
import { getActivityCategoryBadgePill } from "@lms/utilities/functions/getActivityCategoryBadgePill";

export const AddNewOthersModal = () => {
  const queryClient = useQueryClient();
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const page = useOthersModalStore((state) => state.page);
  const modalIsOpen = useOthersModalStore((state) => state.modalIsOpen);
  const category = useOthersCategoryStore((state) => state.category);

  const setModalIsOpen = useOthersModalStore((state) => state.setModalIsOpen);
  const setPage = useOthersModalStore((state) => state.setPage);
  const reset = useOthersStore((state) => state.reset);
  const resetModal = useOthersModalStore((state) => state.resetModal);
  const setCategory = useOthersCategoryStore((state) => state.setCategory);

  const onNext = () => {
    if (page === 1 && !isEmpty(category)) setPage(2);
    else if (page === 2) {
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        animate={false}
        size="md"
        isStatic
        onClose={() => {
          setModalIsOpen(false);
          setCategory(undefined);
          reset();
          resetModal();
        }}
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
              <h3 className="text-lg font-semibold text-gray-600 ">
                New Activity {!isEmpty(category) ? getActivityCategoryBadgePill(category) : null}
              </h3>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {page === 1 && <OtherCategorySelection />}
              {page === 2 && <ActivityDetails />}
              {page === 3 && <UploadActivityAttachment />}
            </main>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                {page === 1 && (
                  <Button
                    variant="white"
                    className="w-[6rem]"
                    onClick={() => {
                      setModalIsOpen(false);
                      setCategory(undefined);
                      reset();
                      resetModal();
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {page === 2 && (
                  <Button variant="white" className="w-[6rem]" onClick={() => setPage(1)}>
                    Previous
                  </Button>
                )}

                {page === 3 && (
                  <Button variant="white" className="w-[6rem]" onClick={() => setPage(2)}>
                    Previous
                  </Button>
                )}

                {page === 1 && (
                  <Button className="w-[6rem]" onClick={onNext}>
                    Next
                  </Button>
                )}
                {page === 2 && (
                  <Button className="w-[6rem]" type="submit" form="othersDetailsForm">
                    Next
                  </Button>
                )}

                {page === 3 && <Button className="w-[6rem]">Submit</Button>}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
