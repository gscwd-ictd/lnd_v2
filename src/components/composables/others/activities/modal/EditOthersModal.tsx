"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import {
  useOthersCategoryStore,
  useEditOthersModalStore,
  useOthersStore,
  useOthersTrainingTypeStore,
} from "@lms/utilities/stores/others-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { ActivityDetails } from "../pages/ActivityDetails";
import { OtherCategorySelection } from "../pages/CategorySelection";
import { UploadActivityAttachment } from "../pages/UploadActivityAttachment";
import { isEmpty } from "lodash";
import {
  getActivityCategoryBadgePill,
  getActivityCategorySelectionBadgePill,
} from "@lms/utilities/functions/getActivityCategoryBadgePill";
import axios from "axios";
import { useOrientation } from "@lms/hooks/use-orientation";
import { Storage } from "appwrite";
import { url } from "@lms/utilities/url/api-url";
import { v4 as uuidv4 } from "uuid";
import { EditActivityDetails } from "../pages/EditActivityDetails";
import { EditUploadActivityAttachment } from "../pages/EditUploadActivityAttachment";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { AlertNotification } from "@lms/components/osprey/ui/alert-notification/view/AlertNotification";
import { EditOthersDetailsSummary } from "../pages/EditOthersDetailsSummary";
import convertSize from "convert-size";
import { useOthersToastOptions } from "../data-table/OthersDataTable";
import { EditParticipants } from "../pages/EditParticipants";
import { TrainingTypeSelection } from "../pages/TrainingTypeSelection";
import { EditTrainingRequirementDocuments } from "../pages/EditTrainingRequirementDocuments";
import { getTrainingTypeBadgePill } from "@lms/utilities/functions/getTrainingTypeBadgePill";

export const EditOthersModal: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const client = useOrientation();

  const page = useEditOthersModalStore((state) => state.page);
  const modalIsOpen = useEditOthersModalStore((state) => state.modalIsOpen);
  const category = useOthersCategoryStore((state) => state.category);
  const orientation = useOthersStore();
  const { setToastOptions } = useOthersToastOptions();

  const setModalIsOpen = useEditOthersModalStore((state) => state.setModalIsOpen);
  const setPage = useEditOthersModalStore((state) => state.setPage);
  const reset = useOthersStore((state) => state.reset);
  const resetModal = useEditOthersModalStore((state) => state.resetModal);
  const setCategory = useOthersCategoryStore((state) => state.setCategory);

  const id = useOthersStore((state) => state.id);
  const description = useOthersStore((state) => state.description);
  const action = useOthersStore((state) => state.action);
  const hasFetchedFiles = useOthersStore((state) => state.hasFetchedFiles);
  const bucketFiles = useOthersStore((state) => state.bucketFiles);
  const filesToUpload = useOthersStore((state) => state.filesToUpload);

  const setTitle = useOthersStore((state) => state.setTitle);
  const setDescription = useOthersStore((state) => state.setDescription);
  const setLocation = useOthersStore((state) => state.setLocation);
  const setDateFrom = useOthersStore((state) => state.setDateFrom);
  const setDateTo = useOthersStore((state) => state.setDateTo);
  const setParticipants = useOthersStore((state) => state.setParticipants);
  const setInitialTitle = useOthersStore((state) => state.setInitialTitle);
  const setHasFetchedFiles = useOthersStore((state) => state.setHasFetchedFiles);
  const setBucketFiles = useOthersStore((state) => state.setBucketFiles);
  const participants = useOthersStore((state) => state.participants);
  const trainingType = useOthersTrainingTypeStore((state) => state.trainingType);
  const setInitialTrainingRequirements = useOthersStore((state) => state.setInitialTrainingRequirements);
  const setTrainingRequirements = useOthersStore((state) => state.setTrainingRequirements);

  const hasFetchedParticipants = useOthersStore((state) => state.hasFetchedParticipants);
  const setParticipantsPool = useOthersStore((state) => state.setParticipantsPool);
  const setFilteredParticipantsPool = useOthersStore((state) => state.setFilteredParticipantsPool);
  const setHasFetchedParticipants = useOthersStore((state) => state.setHasFetchedParticipants);
  const trainingRequirements = useOthersStore((state) => state.trainingRequirements);
  const setAction = useOthersStore((state) => state.setAction);

  const editOrientationMutation = useMutation({
    mutationFn: async () => {
      const storage = new Storage(client!);

      const { initialTitle, filesToUpload, filesToDelete, dateTo, dateFrom, location, title, description } =
        orientation;

      // const storage = new Storage(client!);

      // delete bucket files here
      if (filesToDelete.length > 0) {
        try {
          const allFilesToDelete = await Promise.all(
            filesToDelete.map(async (file) => {
              return await storage.deleteFile(id!, file.id);
              // await axios.delete(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/files/${trainingNoticeId}/${fileId}`);
              // tempIds.push(result.$id);
            })
          );
        } catch (error: any) {
          return (error.response.data.error = 1);
        }
      }

      // add bucket files here
      if (filesToUpload.length > 0) {
        try {
          const allFilesToUpload = await Promise.all(
            filesToUpload.map(async (file) => {
              const result = await storage.createFile(id!, uuidv4(), file);
              // tempIds.push(result.$id);
            })
          );
        } catch (error: any) {
          return (error.response.data.error = 2);
        }
      }

      // rename the bucket name if title is changed
      if (initialTitle !== title) {
        await axios.post(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/others/rename`, {
          id: id!,
          name: title,
        });
      }

      const orientationCreationResponse = await axios.patch(
        `${url}/other/trainings/${id}`,
        {
          title,
          description,
          dateFrom,
          dateTo,
          location,
          trainingType,
          trainingRequirements,
          // filesToUpload,
          category,
          participants: participants.map((participant) => {
            return { employeeId: participant.employeeId };
          }),
        },
        { withCredentials: true }
      );

      return orientationCreationResponse.data;
    },
    onSuccess: async () => {
      const getUpdatedOtherTrainingActivities = await axios.get(`${url}/other/trainings?page=1&limit=1000`);

      queryClient.setQueryData(["other-activities"], getUpdatedOtherTrainingActivities.data.items);

      setToastOptions("success", "Success", "You have successfully updated the other training details!");

      setModalIsOpen(false);

      resetModal();

      reset();
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong, please try again in a few seconds");
    },
  });

  const onNext = () => {
    if (page === 1 && !isEmpty(category)) setPage(2);
    else if (page === 2 && !isEmpty(trainingType)) setPage(3);
    else if (page === 2 && isEmpty(trainingType))
      setToastOptions("danger", "Error", "You have not selected a training type.");
    else if (page === 3 && bucketFiles.length === 0 && filesToUpload.length > 0) setPage(4);
    else if (page === 3 && bucketFiles.length > 0 && filesToUpload.length === 0) setPage(4);
    else if (page === 3 && bucketFiles.length > 0 && filesToUpload.length > 0) setPage(4);
    else if (page === 3 && bucketFiles.length < 1 && filesToUpload.length < 1)
      setToastOptions("danger", "Error", "You have not uploaded anything.");
    else if (page === 5) setPage(6);
    else if (page === 6) setPage(7);
    else if (page === 1 && isEmpty(category)) setToastOptions("danger", "Error", "You have not selected a category.");
  };

  // query per id
  const {
    data: otherTrainingsData,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["other-per-id", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/other/trainings/${id}`);
      return data;
    },
    onSuccess: (data) => {
      setInitialTrainingRequirements([
        { document: "Attendance", isSelected: true },
        { document: "Certificate of Appearance", isSelected: false },
        { document: "Certificate of Training", isSelected: false },
        { document: "Course Evaluation Report", isSelected: false },
        { document: "Course Materials", isSelected: false },
        { document: "Learning Application Plan", isSelected: false },
        { document: "Post Training Report", isSelected: false },
        { document: "Post-test", isSelected: false },
        { document: "Pre-test", isSelected: false },
        { document: "Program", isSelected: false },
      ]);
      setTrainingRequirements(data.trainingRequirements);
      setTitle(data.title);
      setDescription(data.description);
      setCategory(data.category);
      setDateFrom(data.dateFrom);
      setDateTo(data.dateTo);
      setLocation(data.location);
      setParticipants(data.participants);
      setInitialTitle(data.title);
      // setStatus(data.status);
    },
    enabled: modalIsOpen !== false && !!id,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // fetch query participants
  useQuery({
    queryKey: ["assignable-other-training-participants"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/other/trainings/${id}/assignable/participant`, {
        withCredentials: true,
      });
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
    enabled: modalIsOpen !== false && hasFetchedParticipants === false && !!id,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // fetch uploaded files
  useQuery({
    queryKey: ["uploaded-other-training-files", id],
    queryFn: async () => {
      const storage = new Storage(client!);
      const getBucketListFiles = await axios.get(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/others?id=${id}`);

      if (getBucketListFiles.data.files.length > 0) {
        const newBucketFiles = Promise.all(
          getBucketListFiles.data.files.map(async (file: any) => {
            const fileDetails = await storage.getFile(id!, file.$id);
            const filePreview = storage.getFilePreview(id!, file.$id);
            const fileView = storage.getFileView(id!, file.$id);

            return {
              id: file.$id,
              name: fileDetails.name,
              href: fileView.href,
              fileLink: fileView.href,
              sizeOriginal: convertSize(fileDetails.sizeOriginal, "KB", { stringify: true }),
              mimeType: fileDetails.mimeType,
            };
          })
        );
        // setBucketFiles(await newBucketFiles);
        return await newBucketFiles;
      } else setBucketFiles([]);
    },
    onSuccess: async (data) => {
      setBucketFiles(data!);
      setHasFetchedFiles(true);
    },
    onError: () => {
      setBucketFiles([]);
      setToastOptions("danger", "Error", "Bucket with the requested ID could not be found!");
      setHasFetchedFiles(true);
    },
    enabled: !!id && modalIsOpen !== false && action === "update" && hasFetchedFiles !== true,
    // staleTime: 2,
    // refetchOnReconnect: false,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
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
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              <h3 className="text-lg font-semibold text-gray-600 flex gap-1 items-center ">
                <div>Edit Activity </div>
                <div className="text-xs">
                  {!isEmpty(category) ? getActivityCategorySelectionBadgePill(category) : null}
                </div>
                <div className="text-xs">{!isEmpty(trainingType) ? getTrainingTypeBadgePill(trainingType) : null}</div>
              </h3>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {/* {page === 1 && <OtherCategorySelection />}
              {page === 2 && <EditActivityDetails />}
              {page === 3 && <EditUploadActivityAttachment />} */}

              {(!otherTrainingsData || isLoading || isFetching) && !isError && action === "update" ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-center w-full h-full">
                    <Spinner size="large" />
                  </div>
                  <div className="flex items-center justify-center w-full h-full font-sans tracking-widest animate-pulse">
                    Loading...
                  </div>
                </div>
              ) : isError ? (
                <AlertNotification alertType="error" notifMessage="Cannot fetch details" />
              ) : otherTrainingsData ? (
                <>
                  {page === 1 && <OtherCategorySelection />}
                  {page === 2 && <TrainingTypeSelection />}
                  {page === 3 && <EditUploadActivityAttachment />}
                  {page === 4 && <EditActivityDetails />}
                  {page === 5 && <EditParticipants />}
                  {page === 6 && <EditTrainingRequirementDocuments />}
                  {page === 7 && <EditOthersDetailsSummary />}
                </>
              ) : null}
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

                {page === 6 && (
                  <Button variant="white" className="w-[6rem]" onClick={() => setPage(5)}>
                    Previous
                  </Button>
                )}

                {page === 7 && (
                  <Button variant="white" className="w-[6rem]" onClick={() => setPage(6)}>
                    Previous
                  </Button>
                )}

                {page === 1 && (
                  <Button className="w-[6rem]" onClick={onNext}>
                    Next
                  </Button>
                )}
                {page === 2 && (
                  <Button className="w-[6rem]" onClick={onNext}>
                    Next
                  </Button>
                )}

                {page === 3 && (
                  <Button className="w-[6rem]" onClick={onNext}>
                    Next
                  </Button>
                )}

                {page === 4 && (
                  <Button className="w-[6rem]" type="submit" form="othersDetailsForm">
                    Next
                  </Button>
                )}

                {page === 5 && (
                  <Button className="w-[6rem]" onClick={onNext}>
                    Next
                  </Button>
                )}

                {page === 6 && (
                  <Button className="w-[6rem]" type="submit" form="editTrainingDocumentsForm">
                    Next
                  </Button>
                )}

                {page === 7 && (
                  <Button className="w-[6rem]" onClick={() => editOrientationMutation.mutateAsync()}>
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
