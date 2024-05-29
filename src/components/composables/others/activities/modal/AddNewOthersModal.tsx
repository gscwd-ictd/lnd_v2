"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useOthersCategoryStore, useAddOthersModalStore, useOthersStore } from "@lms/utilities/stores/others-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { ActivityDetails } from "../pages/ActivityDetails";
import { OtherCategorySelection } from "../pages/CategorySelection";
import { UploadActivityAttachment } from "../pages/UploadActivityAttachment";
import { isEmpty } from "lodash";
import { getActivityCategoryBadgePill } from "@lms/utilities/functions/getActivityCategoryBadgePill";
import { useOrientation } from "@lms/hooks/use-orientation";
import { AddOthersDetailsSummary } from "../pages/AddOthersDetailsSummary";
import { AddParticipants } from "../pages/AddParticipants";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { useOthersToastOptions } from "../data-table/OthersDataTable";
import { Storage } from "appwrite";
import { v4 as uuidv4 } from "uuid";

export const AddNewOthersModal: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const client = useOrientation();

  const page = useAddOthersModalStore((state) => state.page);
  const modalIsOpen = useAddOthersModalStore((state) => state.modalIsOpen);
  const category = useOthersCategoryStore((state) => state.category);
  const participants = useOthersStore((state) => state.participants);
  const participantsPool = useOthersStore((state) => state.participantsPool);
  const setParticipantsPool = useOthersStore((state) => state.setParticipantsPool);
  const setFilteredParticipantsPool = useOthersStore((state) => state.setFilteredParticipantsPool);
  const hasFetchedParticipants = useOthersStore((state) => state.hasFetchedParticipants);
  const setHasFetchedParticipants = useOthersStore((state) => state.setHasFetchedParticipants);
  const filesToUpload = useOthersStore((state) => state.filesToUpload);
  const others = useOthersStore();

  const setModalIsOpen = useAddOthersModalStore((state) => state.setModalIsOpen);
  const setPage = useAddOthersModalStore((state) => state.setPage);
  const reset = useOthersStore((state) => state.reset);
  const resetModal = useAddOthersModalStore((state) => state.resetModal);
  const setCategory = useOthersCategoryStore((state) => state.setCategory);
  const { setToastOptions } = useOthersToastOptions();

  const setAction = useOthersStore((state) => state.setAction);

  // mutation function
  const addOthersMutation = useMutation({
    mutationFn: async () => {
      const { title, dateFrom, dateTo, location, participants, filesToUpload } = others;

      const storage = new Storage(client!);

      // step 1
      const othersCreationResponse = await axios.post(
        `${url}/other/trainings`,
        {
          title,
          participants: participants.map((participant) => {
            return { employeeId: participant.employeeId };
          }),
          dateFrom,
          dateTo,
          location,
          category,
        },
        { withCredentials: true }
      );

      // second  - create the bucket
      // create the bucket according to the benchmark creation response id and title
      const bucketCreationResponse = await axios.post(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/others`, {
        id: othersCreationResponse.data.id,
        name: othersCreationResponse.data.title,
      });

      // third create the file inside the bucket

      try {
        const files = await Promise.all(
          filesToUpload.map(async (file) => {
            return await storage.createFile(bucketCreationResponse.data.$id, uuidv4(), file);
          })
        );
      } catch (error: any) {
        return (error.response.data.error = 3);
      }

      return othersCreationResponse.data;
    },
    onSuccess: async (data) => {
      setToastOptions("success", "Success", "You have successfully added an other training activity.");
      setModalIsOpen(false);
      reset();
      resetModal();
      const getUpdatedOtherActivities = await axios.get(`${url}/other/trainings?page=1&limit=1000`);
      queryClient.setQueryData(["other-activities"], getUpdatedOtherActivities.data.items);
    },
    onError: async (error: any) => {
      setToastOptions("danger", "Error", "Encountered an error, Please try again later!");
      if (error.response.data.error.step === 1) {
        // this step creates the training notice in the backend
        // if this step fails, it should just show an error in toast
        setToastOptions("danger", "1", "Encountered an error.");
      } else if (error.response.data.error.step === 2) {
        // this step creates the bucket(folder) in appwrite
        // if this step fails, it should call the delete training notice by id function
        // and show an error in toast

        // call delete training here
        const id = error.response.data.error.id;
        await axios.delete(`${url}/other/trainings/${id}`);

        setToastOptions(
          "danger",
          "2",
          "Failed to create a folder for the Other Training. Please try again in a few seconds."
        );
      } else if (error.response.data.error.step === 3) {
        // this step creates the files inside the bucket in appwrite
        // if this step fails, it should call the delete bucket
        // and delete training notice by id function
        // and show an error in toast

        // call delete bucket here

        await axios.delete(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/others/${error.response.data.error.id}`);

        // call delete training notice here
        await axios.delete(`${url}/other/trainings/${error.response.data.error.id}`);

        setToastOptions(
          "danger",
          "2",
          "Failed to create the file/s inside the folder. Please try again in a few seconds"
        );
      }
    },
  });

  const onNext = () => {
    if (page === 1 && !isEmpty(category)) setPage(2);
    else if (page === 2 && filesToUpload.length < 1) {
      setToastOptions("danger", "Error", "You have not uploaded anything.");
    } else if (page === 4 && participants.length < 1) {
      setToastOptions("danger", "Error", "You have not added any participant.");
    } else if (page === 2 && filesToUpload.length > 0) setPage(page + 1);
    else if (page === 4 && participants.length > 0) setPage(page + 1);
    else if (page === 1 && isEmpty(category)) setToastOptions("danger", "Error", "You have not selected a category.");
    else setPage(page + 1);
  };

  // fetch participants
  useQuery({
    queryKey: ["new-assignable-other-participants"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/other/trainings/assignable/participant`);

      return data;
    },
    onSuccess: (data) => {
      setParticipantsPool(data);
      setFilteredParticipantsPool(data);
      setHasFetchedParticipants(true);
    },
    onError: () => {
      setParticipantsPool([]);
      setFilteredParticipantsPool([]);
    },
    enabled: hasFetchedParticipants === false && modalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
              <h3 className="text-lg font-semibold text-gray-600  ">
                New Other Activity {!isEmpty(category) ? getActivityCategoryBadgePill(category) : null}
              </h3>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {page === 1 && <OtherCategorySelection />}
              {page === 2 && <UploadActivityAttachment />}
              {page === 3 && <ActivityDetails />}
              {page === 4 && <AddParticipants />}
              {page === 5 && <AddOthersDetailsSummary />}
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

                {page === 4 && (
                  <Button variant="white" className="w-[6rem]" onClick={() => setPage(3)}>
                    Previous
                  </Button>
                )}

                {page === 5 && (
                  <Button variant="white" className="w-[6rem]" onClick={() => setPage(4)}>
                    Previous
                  </Button>
                )}

                {page === 1 && (
                  <Button className="w-[6rem]" onClick={onNext}>
                    Next
                  </Button>
                )}
                {/* {page === 2 && (
                  <Button className="w-[6rem]" type="submit" form="othersDetailsForm">
                    Next
                  </Button>
                )} */}

                {page === 2 && (
                  <Button className="w-[6rem]" onClick={onNext}>
                    Next
                  </Button>
                )}

                {page === 3 && (
                  <Button className="w-[6rem]" type="submit" form="othersDetailsForm">
                    Next
                  </Button>
                )}

                {page === 4 && (
                  <Button className="w-[6rem]" type="button" onClick={onNext}>
                    Next
                  </Button>
                )}
                {page === 5 && (
                  <Button className="w-[6rem]" onClick={() => addOthersMutation.mutateAsync()}>
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
