"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useOthersCategoryStore, useOthersModalStore, useOthersStore } from "@lms/utilities/stores/others-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityDetails } from "../pages/ActivityDetails";
import { OtherCategorySelection } from "../pages/CategorySelection";
import { UploadActivityAttachment } from "../pages/UploadActivityAttachment";
import { isEmpty } from "lodash";
import { getActivityCategoryBadgePill } from "@lms/utilities/functions/getActivityCategoryBadgePill";
import axios from "axios";
import { useOrientation } from "@lms/hooks/use-orientation";
import { Storage } from "appwrite";
import { url } from "@lms/utilities/url/api-url";
import { v4 as uuidv4 } from "uuid";

export const AddNewOthersModal = () => {
  const queryClient = useQueryClient();
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const client = useOrientation();

  const page = useOthersModalStore((state) => state.page);
  const modalIsOpen = useOthersModalStore((state) => state.modalIsOpen);
  const category = useOthersCategoryStore((state) => state.category);
  const orientation = useOthersStore();

  const setModalIsOpen = useOthersModalStore((state) => state.setModalIsOpen);
  const setPage = useOthersModalStore((state) => state.setPage);
  const reset = useOthersStore((state) => state.reset);
  const resetModal = useOthersModalStore((state) => state.resetModal);
  const setCategory = useOthersCategoryStore((state) => state.setCategory);

  const setAction = useOthersStore((state) => state.setAction);

  const addOrientationMutation = useMutation({
    mutationFn: async () => {
      const { filesToUpload, dateTo, dateFrom, location, title } = orientation;

      // const storage = new Storage(client!);

      // const orientationCreationResponse = await axios.post(
      //   `${url}/orientation`,
      //   {
      //     title,
      //     dateFrom,
      //     dateTo,
      //     location,
      //     filesToUpload,
      //     category,
      //   },
      //   { withCredentials: true }
      // );

      // // create the bucket according to the orientation response id and name
      // const orientationBucketCreationResponse = await axios.post(
      //   `${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/orientation`,
      //   {
      //     id: orientationCreationResponse.data.id,
      //     name: orientationCreationResponse.data.title,
      //   }
      // );

      // // map the files to create it in appwrite bucket
      // try {
      //   const files = await Promise.all(
      //     filesToUpload.map(async (file) => {
      //       const result = await storage.createFile(orientationBucketCreationResponse.data.$id, uuidv4(), file);
      //     })
      //   );
      // } catch (error: any) {
      //   return (error.response.data.error = 3);
      // }

      console.log({ title, dateFrom, dateTo, location, filesToUpload, category });
    },
  });

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
            setAction("create");
            setModalIsOpen(true);
          }}
          className="mb-3"
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

                {page === 3 && (
                  <Button className="w-[6rem]" onClick={() => addOrientationMutation.mutateAsync()}>
                    Submit
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
