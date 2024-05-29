import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useEditBenchmarkingModalStore, useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { FunctionComponent, useEffect } from "react";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { EditActivityDetails } from "../pages/EditActivityDetails";
import { EditUploadActivityAttachment } from "../pages/EditUploadActivityAttachment";
import { useBenchmarkingToastOptions } from "../data-table/BenchmarkingDataTable";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { isEmpty } from "lodash";
import { AlertNotification } from "@lms/components/osprey/ui/alert-notification/view/AlertNotification";
import { EditParticipants } from "../pages/EditParticipants";
import { EditBenchmarkingDetailsSummary } from "../pages/EditBenchmarkingDetailsSummary";
import { useBenchmarking } from "@lms/hooks/use-benchmarking";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "appwrite";
import { useBenchmarkingDataTable } from "../data-table/hooks/use-benchmarking-data-table";
import convertSize from "convert-size";
import { getBenchmarkingStatusBadgePill } from "@lms/utilities/functions/getBenchmarkingStatusBadgePill";

export const EditBenchmarkingModal: FunctionComponent = () => {
  const queryClient = useQueryClient();

  const page = useEditBenchmarkingModalStore((state) => state.page);
  const modalIsOpen = useEditBenchmarkingModalStore((state) => state.modalIsOpen);
  const action = useBenchmarkingStore((state) => state.action);
  const title = useBenchmarkingStore((state) => state.title);
  const partner = useBenchmarkingStore((state) => state.partner);
  const dateTo = useBenchmarkingStore((state) => state.dateTo);
  const dateFrom = useBenchmarkingStore((state) => state.dateFrom);
  const initialTitle = useBenchmarkingStore((state) => state.initialTitle);
  const location = useBenchmarkingStore((state) => state.location);
  const hasFetchedParticipants = useBenchmarkingStore((state) => state.hasFetchedParticipants);
  const bucketFiles = useBenchmarkingStore((state) => state.bucketFiles);
  const filesToUpload = useBenchmarkingStore((state) => state.filesToUpload);
  const filesToDelete = useBenchmarkingStore((state) => state.filesToDelete);
  const participants = useBenchmarkingStore((state) => state.participants);
  const status = useBenchmarkingStore((state) => state.status);
  const setBucketFiles = useBenchmarkingStore((state) => state.setBucketFiles);
  const setParticipantsPool = useBenchmarkingStore((state) => state.setParticipantsPool);
  const setFilteredParticipantsPool = useBenchmarkingStore((state) => state.setFilteredParticipantsPool);

  const setHasFetchedParticipants = useBenchmarkingStore((state) => state.setHasFetchedParticipants);
  const setId = useBenchmarkingStore((state) => state.setId);
  const setInitialTitle = useBenchmarkingStore((state) => state.setInitialTitle);
  const setTitle = useBenchmarkingStore((state) => state.setTitle);
  const setPartner = useBenchmarkingStore((state) => state.setPartner);
  const setDateFrom = useBenchmarkingStore((state) => state.setDateFrom);
  const setDateTo = useBenchmarkingStore((state) => state.setDateTo);
  const setLocation = useBenchmarkingStore((state) => state.setLocation);
  const setParticipants = useBenchmarkingStore((state) => state.setParticipants);
  const reset = useBenchmarkingStore((state) => state.reset);
  const setStatus = useBenchmarkingStore((state) => state.setStatus);

  const hasFetchedFiles = useEditBenchmarkingModalStore((state) => state.hasFetchedFiles);
  const setModalIsOpen = useEditBenchmarkingModalStore((state) => state.setModalIsOpen);
  const setPage = useEditBenchmarkingModalStore((state) => state.setPage);
  const setHasFetchedFiles = useEditBenchmarkingModalStore((state) => state.setHasFetchedFiles);
  const resetModal = useEditBenchmarkingModalStore((state) => state.resetModal);

  const { benchmarkingId } = useBenchmarkingDataTable();

  const client = useBenchmarking();

  const { setToastOptions } = useBenchmarkingToastOptions();
  // const { id } = useBenchmarkingSlideOver();
  const id = useBenchmarkingStore((state) => state.id);

  // query per id
  const {
    data: benchmarkingData,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["benchmark-per-id", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/benchmark/${id}`);

      return data;
    },
    onSuccess: (data) => {
      setTitle(data.title);
      setPartner(data.partner);
      setDateFrom(data.dateFrom);
      setDateTo(data.dateTo);
      setLocation(data.location);
      setParticipants(data.participants);
      setInitialTitle(data.title);
      setStatus(data.status);
    },
    enabled: modalIsOpen !== false && !!id,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // fetch query participants
  useQuery({
    queryKey: ["assignable-participants"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/benchmark/${id}/assignable/participant`);
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
    queryKey: ["uploaded-benchmarking-files", id],
    queryFn: async () => {
      const storage = new Storage(client!);
      const getBucketListFiles = await axios.get(
        `${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/benchmarking?id=${id}`
      );

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

  // edit mutation function
  const editBenchmarkingMutation = useMutation({
    mutationFn: async () => {
      const storage = new Storage(client!);

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
        await axios.post(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/benchmarking/rename`, {
          id: id!,
          name: title,
        });
      }

      // mutate function here
      const response = await axios.patch(
        `${url}/benchmark/${id}`,
        {
          title,
          partner,
          dateFrom,
          dateTo,
          location,
          participants: participants.map((participant) => {
            return { employeeId: participant.employeeId, learningApplicationPlan: false };
          }),
        },
        { withCredentials: true }
      );

      return response.data;
    },
    onSuccess: async () => {
      const getUpdatedBenchmarkingActivities = await axios.get(`${url}/benchmark?page=1&limit=1000`);

      queryClient.setQueryData(["benchmarking-activities"], getUpdatedBenchmarkingActivities.data.items);

      setToastOptions("success", "Success", "You have successfully updated the benchmarking details!");

      setModalIsOpen(false);

      resetModal();

      reset();
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong, please try again in a few seconds!");
    },
  });

  // when closing the modal
  const onClose = () => {
    setModalIsOpen(false);
    resetModal();
    reset();
  };

  // on submit logic
  const onNext = async () => {
    // update
    if (page === 1 && bucketFiles.length === 0 && filesToUpload.length === 0)
      setToastOptions("danger", "Error", "You have no files to upload nor existing uploaded files.");
    else if (page === 3 && participants.length === 0)
      setToastOptions("danger", "Error", "You have no existing participant.");
    else if (page === 3 && participants.length === 0) setPage(page + 1);
    else if (page === 4) await editBenchmarkingMutation.mutateAsync();
    else setPage(page + 1);
  };

  // set the benchmarking id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(benchmarkingId) && !isEmpty(id)) {
      setId(id);
    }
  }, [id, benchmarkingId]);

  return (
    <>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={onClose} size="md" isStatic>
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2 flex gap-2 items-center">
              <h3 className="text-lg font-semibold text-gray-600">Edit Benchmarking Activity</h3>
              <div>{getBenchmarkingStatusBadgePill(status)}</div>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4 max-h-[32rem]">
              {(!benchmarkingData || isLoading || isFetching) && !isError && action === "update" ? (
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
              ) : benchmarkingData ? (
                <>
                  {page === 1 && <EditUploadActivityAttachment />}
                  {page === 2 && <EditActivityDetails />}
                  {page === 3 && <EditParticipants />}
                  {page === 4 && <EditBenchmarkingDetailsSummary />}
                </>
              ) : null}
            </main>
          </ModalContent.Body>
          <ModalContent.Footer>
            <ModalContent.Footer>
              <div className="px-2 pt-2 pb-3">
                <div className="flex items-center justify-end w-full gap-2">
                  {page === 1 && (
                    <Button variant="white" className="w-[5rem]" type="button" onClick={onClose}>
                      Cancel
                    </Button>
                  )}
                  {page === 2 && (
                    <Button variant="white" className="w-[5rem]" type="button" onClick={() => setPage(1)}>
                      Previous
                    </Button>
                  )}
                  {page === 3 && (
                    <Button variant="white" className="w-[5rem]" type="button" onClick={() => setPage(2)}>
                      Previous
                    </Button>
                  )}

                  {page === 4 && (
                    <Button variant="white" className="w-[5rem]" type="button" onClick={() => setPage(3)}>
                      Previous
                    </Button>
                  )}

                  {page === 1 && (
                    <Button
                      className="w-[5rem]"
                      type="button"
                      onClick={onNext}
                      disabled={isFetching ? true : isLoading ? true : false}
                    >
                      Next
                    </Button>
                  )}
                  {page === 2 && (
                    <Button className="w-[5rem]" type="submit" form="editBenchmarkDetailsForm">
                      Next
                    </Button>
                  )}

                  {page === 3 && (
                    <Button className="w-[5rem]" type="button" onClick={onNext}>
                      Next
                    </Button>
                  )}

                  {page === 4 && (
                    <Button
                      className="min-w-[5rem] disabled:bg-indigo-300 disabled:cursor-not-allowed"
                      onClick={onNext}
                      type="button"
                      disabled={editBenchmarkingMutation.isLoading ? true : false}
                    >
                      {editBenchmarkingMutation.isLoading ? <Spinner size="xs" /> : null}{" "}
                      {action === "create" ? "Submit" : "Update"}
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
