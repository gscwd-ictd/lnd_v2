"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useAddBenchmarkingModalStore, useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { ActivityDetails } from "../pages/ActivityDetails";
import { AddParticipants } from "../pages/AddParticipants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadActivityAttachment } from "../pages/UploadActivityAttachment";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { useBenchmarking } from "@lms/hooks/use-benchmarking";
import { Storage } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import { useBenchmarkingToastOptions } from "../data-table/BenchmarkingDataTable";
import { AddBenchmarkingDetailsSummary } from "../pages/AddBenchmarkingDetailsSummary";

export const AddNewBenchmarkingModal = () => {
  const queryClient = useQueryClient();
  const page = useAddBenchmarkingModalStore((state) => state.page);
  const modalIsOpen = useAddBenchmarkingModalStore((state) => state.modalIsOpen);
  const filesToUpload = useBenchmarkingStore((state) => state.filesToUpload);
  const participants = useBenchmarkingStore((state) => state.participants);
  const hasFetchedParticipants = useBenchmarkingStore((state) => state.hasFetchedParticipants);
  const id = useBenchmarkingStore((state) => state.id);
  const setParticipantsPool = useBenchmarkingStore((state) => state.setParticipantsPool);
  const setHasFetchedParticipants = useBenchmarkingStore((state) => state.setHasFetchedParticipants);
  const reset = useBenchmarkingStore((state) => state.reset);

  const setPage = useAddBenchmarkingModalStore((state) => state.setPage);
  const resetModal = useAddBenchmarkingModalStore((state) => state.resetModal);
  const setModalIsOpen = useAddBenchmarkingModalStore((state) => state.setModalIsOpen);
  const benchmarking = useBenchmarkingStore();
  const client = useBenchmarking();
  const { setToastOptions } = useBenchmarkingToastOptions();

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
    } else if (page === 3 && participants.length > 0) setPage(page + 1);
    else if (page === 4) await addBenchmarkingMutation.mutateAsync();
    else setPage(page + 1);
  };

  const addBenchmarkingMutation = useMutation({
    mutationFn: async () => {
      const { title, dateStarted, dateEnd, location, participants, partner, filesToUpload } = benchmarking;

      const storage = new Storage(client!);

      // step 1
      const benchmarkCreationResponse = await axios.post(`${url}/benchmark`, {
        title,
        partner,
        dateStarted,
        dateEnd,
        location,
        participants: participants.map((participant) => {
          return { employeeId: participant.employeeId };
        }),
      });

      // second  - create the bucket
      // create the bucket according to the benchmark creation response id and title
      const bucketCreationResponse = await axios.post(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/benchmarking`, {
        id: benchmarkCreationResponse.data.id,
        name: benchmarkCreationResponse.data.title,
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

      return benchmarkCreationResponse.data;
    },
    onSuccess: async (data) => {
      setToastOptions("success", "Success", "You have successfully added a benchmarking activity.");
      setModalIsOpen(false);
      reset();
      resetModal();
      const getUpdatedBenchmarkings = await axios.get(`${url}/benchmark?page=1&limit=1000`);
      queryClient.setQueryData(["benchmarking-activities"], getUpdatedBenchmarkings.data.items);
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
        await axios.delete(`${url}/benchmark/${id}`);

        setToastOptions(
          "danger",
          "2",
          "Failed to create a folder for the Benchmarking. Please try again in a few seconds."
        );
      } else if (error.response.data.error.step === 3) {
        // this step creates the files inside the bucket in appwrite
        // if this step fails, it should call the delete bucket
        // and delete training notice by id function
        // and show an error in toast

        // call delete bucket here

        await axios.delete(
          `${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/benchmark/${error.response.data.error.id}`
        );

        // call delete training notice here
        await axios.delete(`${url}/benchmark/${error.response.data.error.id}`);

        setToastOptions(
          "danger",
          "2",
          "Failed to create the file/s inside the folder. Please try again in a few seconds"
        );
      }
    },
  });

  // fetch participants
  useQuery({
    queryKey: ["new-assignable-participants"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/benchmark/assignable/participant`);

      return data;
    },
    onSuccess: (data) => {
      setParticipantsPool(data);
      setHasFetchedParticipants(true);
    },
    onError: () => {
      setParticipantsPool([]);
    },
    enabled: hasFetchedParticipants === false,
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
            <header className="pl-2 flex gap-2 items-center">
              <h3 className="text-lg font-semibold text-gray-600">New Benchmarking Activity</h3>
              <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">New</span>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {page === 1 && <UploadActivityAttachment />}
              {page === 2 && <ActivityDetails />}
              {page === 3 && <AddParticipants />}
              {page === 4 && <AddBenchmarkingDetailsSummary />}
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
                {page === 4 && (
                  <Button variant="white" className="w-[5rem]" onClick={() => setPage(3)}>
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
                  <Button className="w-[5rem]" type="button" onClick={onNext}>
                    Next
                  </Button>
                )}

                {page === 4 && (
                  <Button
                    className="min-w-[5rem] disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    onClick={onNext}
                    disabled={addBenchmarkingMutation.isLoading ? true : false}
                  >
                    <div className="flex gap-1 px-1 ">
                      {addBenchmarkingMutation.isLoading ? (
                        <div className="w-full">
                          <Spinner size="xs" />
                        </div>
                      ) : null}{" "}
                      <div>Submit</div>
                    </div>
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
