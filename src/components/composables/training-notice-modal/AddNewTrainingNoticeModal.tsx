"use client";

/**
 * Post test
 * Post training report
 * Course Evaluation Report
 * Learning Application Plan
 */

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent, ModalTrigger } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { TrainingSource } from "@lms/lib/types/training-source.type";
import { url } from "@lms/utilities/url/api-url";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FunctionComponent, useEffect, useState } from "react";
import {
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import { TrainingRequirementDocuments } from "./TrainingRequirementDocuments";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { isEmpty } from "lodash";
import { TrainingNoticeSummary } from "./TrainingNoticeSummary";
import { UploadTrainingAttachment } from "./UploadTrainingAttachment";
import { ChooseLspSource } from "./ChooseLspSource";
import { getCapitalizedTrainingType } from "@lms/utilities/functions/getTrainingTypeFromString";
import { AddChooseTrainingType } from "./add/AddChooseTrainingType";
import { AddInternalCourseOutline } from "./add/AddInternalCourseOutline";
import { AddExternalCourseOutline } from "./add/AddExternalCourseOutline";
import { AddTrainingInformation } from "./add/AddTrainingInformation";
import { AddRecommendations } from "./add/AddRecommendations";
import { useAppwriteClient } from "@lms/components/osprey/appwrite/view/AppwriteContainer";
import { Storage } from "appwrite";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import { v4 as uuidv4 } from "uuid";

export const AddNewTrainingNoticeModal: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const client = useAppwriteClient();
  const bucketStrings = useTrainingNoticeStore((state) => state.bucketStrings);
  const filesToUpload = useTrainingNoticeStore((state) => state.filesToUpload);
  const bucket = useTrainingNoticeStore((state) => state.bucket);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [source, setSource] = useState<TrainingSource[]>([]);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const page = useTrainingNoticeModalStore((state) => state.page);
  const facilitator = useTrainingNoticeStore((state) => state.facilitator);
  const selectedTrainingDesign = useTrainingNoticeStore((state) => state.selectedTrainingDesign);
  const training = useTrainingNoticeStore();
  const modalIsOpen = useTrainingNoticeModalStore((state) => state.modalIsOpen);
  const setModalIsOpen = useTrainingNoticeModalStore((state) => state.setModalIsOpen);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const courseContent = useTrainingNoticeStore((state) => state.courseContent);
  const selectedTag = useTrainingNoticeStore((state) => state.selectedTag);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const lspSource = useLspSourceStore((state) => state.lspSource);
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const consumedSlots = useTrainingNoticeStore((state) => state.consumedSlots);
  const selectedTrainingSource = useTrainingNoticeStore((state) => state.selectedTrainingSource);
  const selectedFacilitators = useTrainingNoticeStore((state) => state.selectedFacilitators);
  const setSelectedTrainingSource = useTrainingNoticeStore((state) => state.setSelectedTrainingSource);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const resetModal = useTrainingNoticeModalStore((state) => state.resetModal);
  const setTrainingSource = useTrainingNoticeStore((state) => state.setTrainingSource);
  const setAction = useTrainingNoticeModalStore((state) => state.setAction);
  const setInitialTrainingRequirements = useTrainingNoticeStore((state) => state.setInitialTrainingRequirements);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);
  const setSelectedFacilitator = useTrainingNoticeStore((state) => state.setSelectedFacilitator);
  const setPage = useTrainingNoticeModalStore((state) => state.setPage);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const setBucketStrings = useTrainingNoticeStore((state) => state.setBucketStrings);
  const resetTrainingTypes = useTrainingTypesStore((state) => state.reset);
  // const [stepSuccess, setStepSuccess] = useState<number>(0);

  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const externalTrainingMutation = useMutation({
    onSuccess: async () => {
      setModalIsOpen(false);
      reset();
      resetModal();
      resetTrainingTypes();
      setToastOptions("success", "Success", "You have successfully added a training notice!");

      const getUpdatedNoticeOfTraining = await axios.get(`${url}/training-details?page=1&limit=1000`);

      queryClient.setQueryData(["training-notice"], getUpdatedNoticeOfTraining.data.items);
    },
    onError: async (error: any) => {
      console.log(error);
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
        await axios.delete(`${url}/training-details/${id}`);

        setToastOptions(
          "danger",
          "2",
          "Failed to create a folder for the training notice. Please try again in a few seconds."
        );
      } else if (error.response.data.error.step === 3) {
        // this step creates the files inside the bucket in appwrite
        // if this step fails, it should call the delete bucket
        // and delete training notice by id function
        // and show an error in toast

        // call delete bucket here

        await axios.delete(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/${error.response.data.error.id}`);

        // call delete training notice here
        await axios.delete(`${url}/training-details/${error.response.data.error.id}`);

        setToastOptions(
          "danger",
          "2",
          "Failed to create the file/s inside the folder. Please try again in a few seconds"
        );
      }
    },

    mutationFn: async () => {
      const {
        trainingSource,
        location,
        numberOfHours,
        courseContent,
        numberOfParticipants,
        slotDistribution,
        trainingRequirements,
      } = training;

      let tempIds: Array<string> = [];
      const storage = new Storage(client!);

      const trainingCreationResponse = await axios.post(`${url}/training-details/external`, {
        source: { id: selectedTrainingSource.id },
        // source: { id: "23c758bc-2172-40a8-9cb1-d176e3360f1e" },
        type: selectedTrainingType,
        trainingLspDetails: selectedFacilitators.map((faci) => {
          return { id: faci.id };
        }),
        courseTitle,
        location,
        slotDistribution: slotDistribution.map((slot) => {
          const employees = slot.employees.map((emp) => {
            return { employeeId: emp.employeeId };
          });

          return {
            supervisor: { supervisorId: slot.supervisor.supervisorId },
            numberOfSlots: slot.numberOfSlots,
            employees,
          };
        }),
        trainingStart: new Date(training.trainingStart).toISOString(),
        trainingEnd: new Date(training.trainingEnd).toISOString(),
        numberOfHours,
        courseContent,
        numberOfParticipants,
        trainingTags: selectedTags.map((tag) => {
          return { id: tag.id };
        }),
        trainingRequirements,
      });

      // create the bucket according to the training creation response id and name
      const bucketCreationResponse = await axios.post(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket`, {
        id: trainingCreationResponse.data.id,
        name: trainingCreationResponse.data.courseTitle,
      });

      // map the files to create it in appwrite bucket
      try {
        const files = await Promise.all(
          filesToUpload.map(async (file) => {
            const result = await storage.createFile(bucketCreationResponse.data.$id, uuidv4(), file);
            // tempIds.push(result.$id);
          })
        );
      } catch (error: any) {
        return (error.response.data.error = 3);
      }
    },
  });

  const internalTrainingMutation = useMutation({
    onSuccess: async (data) => {
      setModalIsOpen(false);
      // toast options here
      setToastOptions("success", "Success", "You have successfully added a training notice!");
      reset();
      resetTrainingTypes();
      resetModal();

      const getUpdatedTrainingNotice = await axios.get(`${url}/training-details?page=1&limit=1000`);

      queryClient.setQueryData(["training-notice"], getUpdatedTrainingNotice.data.items);
    },
    onError: (error) => setToastOptions("danger", "Error", `There is a problem with the request: ${error}`),
    mutationFn: async () => {
      const {
        selectedTrainingSource,
        location,
        numberOfHours,
        courseContent,
        numberOfParticipants,
        slotDistribution,
        trainingRequirements,
      } = training;

      const response = await axios.post(`${url}/training-details/internal`, {
        source: { id: selectedTrainingSource.id },
        trainingDesign: { id: selectedTrainingDesign.id },
        type: selectedTrainingType,
        courseContent,
        trainingLspDetails: selectedFacilitators.map((faci) => {
          return { id: faci.id }; //TODO rename lspDetails to lspDetailsId
        }),
        location,
        slotDistribution: slotDistribution.map((slot) => {
          const employees = slot.employees.map((emp) => {
            return { employeeId: emp.employeeId };
          });

          return {
            supervisor: { supervisorId: slot.supervisor.supervisorId },
            numberOfSlots: slot.numberOfSlots,
            employees,
          };
        }),
        trainingStart: new Date(training.trainingStart).toISOString(),
        trainingEnd: new Date(training.trainingEnd).toISOString(),
        numberOfHours,
        numberOfParticipants,
        trainingTags: selectedTags.map((tag) => {
          return { id: tag.id };
        }),

        trainingRequirements,
      });

      return response.data;
    },
  });

  // on next
  const onNext = async () => {
    // internal
    if (selectedTrainingSource?.name === "Internal") {
      if (page === 1 && isEmpty(selectedTrainingType)) {
        setToastOptions("danger", "Error", "Select a training type first!");
      } else if (page === 2) {
        if (isEmpty(lspSource)) setToastOptions("danger", "Error", "Select an LSP source first!");
        else setPage(3);
      } else if (page === 3) {
        if (isEmpty(courseTitle))
          setToastOptions("danger", "Error", "Select a course title from the list of training designs!");
        else if (isEmpty(facilitator.name)) setToastOptions("danger", "Error", "Select a facilitator first!");
        else if (courseContent.length < 1)
          setToastOptions("danger", "Error", "Enter at least one course content first!");
        else setPage(4);
      } else if (page === 4) {
        if (isEmpty(selectedTags)) setToastOptions("danger", "Error", "Select a tag first!");
        else if (numberOfParticipants === undefined || numberOfParticipants < 1)
          setToastOptions("danger", "Error", "Enter number of participants first!");
        else setPage(5);
      } else if (page === 5) {
        // if(co)
        if (consumedSlots !== numberOfParticipants) {
        } else setPage(6);
      } else if (page === 7) {
        // await insertInternalTraining();
        await internalTrainingMutation.mutateAsync();
      } else setPage(page + 1);
    }
    // external
    else if (selectedTrainingSource?.name === "External") {
      if (page === 1 && filesToUpload.length < 1) {
        setToastOptions("danger", "Error", "Upload an attachment first!");
      } else if (page === 2 && isEmpty(selectedTrainingType)) {
        setToastOptions("danger", "Error", "Select a training type first!");
      } else if (page === 3) {
        if (isEmpty(courseTitle)) setToastOptions("danger", "Error", "Enter a course title first!");
        else if (isEmpty(facilitator.name)) setToastOptions("danger", "Error", "Select a facilitator first!");
        else if (courseContent.length < 1)
          setToastOptions("danger", "Error", "Enter at least one course content first!");
        else setPage(4);
      } else if (page === 4) {
        if (isEmpty(selectedTags)) setToastOptions("danger", "Error", "Select a tag first!");
        else if (numberOfParticipants === undefined || numberOfParticipants < 1)
          setToastOptions("danger", "Error", "Enter number of participants first!");
        else setPage(5);
      } else if (page === 7) {
        await externalTrainingMutation.mutateAsync();
        // await insertTrainingNoticeMutation.mutateAsync();
      } else setPage(page + 1);
    }
  };

  // on previous
  const onPrev = async () => {
    // page === 1 ? setOpen(false) : setPage(page - 1);
    if (page === 1 && selectedTrainingSource.name === "Internal") {
      setAction(undefined);
      setSelectedTrainingType(undefined);
      setLspSource(undefined);
      setSelectedFacilitator({ id: "", name: "", type: "" });

      resetModal();
      reset();
    } else if (page === 1 && selectedTrainingSource.name === "External") {
      setAction(undefined);
      setSelectedTrainingType(undefined);
      setLspSource(undefined);
      setSelectedFacilitator({ id: "", name: "", type: "" });
      resetModal();
      reset();
    } else setPage(page - 1);
  };

  useEffect(() => {
    const getTrainingSource = async () => {
      const { data } = await axios.get(`${url}/training-sources`);
      setSource(data.items);
    };
    getTrainingSource();
  }, []);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        size={page === 7 ? "3md" : "md"}
        animate={false}
        isStatic
        onClose={() => {
          setAction(undefined);
          setSelectedTrainingType(undefined);
          setLspSource(undefined);
          setSelectedFacilitator({ id: "", name: "", type: "" });
          reset();
          resetModal();
        }}
      >
        <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenu.Trigger asChild>
            <Button size="small">
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
          </DropdownMenu.Trigger>
          <AnimatePresence>
            {dropdownOpen && (
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content align="start" side="right" sideOffset={4} asChild>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 1, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="flex flex-col bg-white rounded shadow-lg overflow-clip"
                  >
                    {source.map((trainingSource, index) => {
                      return (
                        <DropdownMenu.Item
                          key={index}
                          className="px-2 py-1 transition-colors border-b outline-none hover:bg-gray-100 border-b-100 focus:bg-gray-100"
                          asChild
                        >
                          <ModalTrigger
                            className="text-xs font-medium text-gray-600"
                            onClick={() => {
                              setTrainingSource(trainingSource.id!);
                              setSelectedTrainingSource(trainingSource);
                              setInitialTrainingRequirements([
                                { document: "Pre-test", isSelected: false },
                                { document: "Course Materials", isSelected: false },
                                { document: "Post Training Report", isSelected: false },
                                { document: "Course Evaluation Report", isSelected: false },
                                { document: "Learning Application Plan", isSelected: false },
                                { document: "Post-test", isSelected: false },
                              ]);
                              setPage(1);
                              setAction("create");
                            }}
                          >
                            {trainingSource.name}
                          </ModalTrigger>
                        </DropdownMenu.Item>
                      );
                    })}
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>

        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              <p className="text-xs font-medium text-indigo-500">{page} of 7</p>
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Notice of Training</h3>
                <div className="flex items-center gap-1">
                  {selectedTrainingType !== undefined && (
                    <p
                      className={`text-purple-600 bg-purple-50 border-purple-100 text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
                    >
                      {getCapitalizedTrainingType(selectedTrainingType)}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400">Fill in training details and course outline</p>
            </header>
          </ModalContent.Title>

          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {selectedTrainingSource?.name === "Internal" ? (
                <>
                  {page === 1 && <AddChooseTrainingType />}
                  {page === 2 && <ChooseLspSource />}
                  {page === 3 && <AddInternalCourseOutline />}
                  {page === 4 && <AddTrainingInformation />}
                  {page === 5 && <AddRecommendations />}
                  {page === 6 && <TrainingRequirementDocuments />}
                  {page === 7 && <TrainingNoticeSummary />}
                </>
              ) : selectedTrainingSource?.name === "External" ? (
                <>
                  {page === 1 && <UploadTrainingAttachment />}
                  {page === 2 && <AddChooseTrainingType />}
                  {page === 3 && <AddExternalCourseOutline />}
                  {page === 4 && <AddTrainingInformation />}
                  {page === 5 && <AddRecommendations />}
                  {page === 6 && <TrainingRequirementDocuments />}
                  {page === 7 && <TrainingNoticeSummary />}
                </>
              ) : null}
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button size="small" variant="white" onClick={onPrev}>
                  {page === 1 ? "Cancel" : "Previous"}
                </Button>
                {(page === 1 || page === 2 || page === 5 || page === 7) && (
                  <Button
                    size="small"
                    type="button"
                    onClick={onNext}
                    disabled={page === 5 && consumedSlots !== numberOfParticipants ? true : false}
                    className={`disabled:bg-indigo-300 disabled:cursor-not-allowed`}
                  >
                    {page === 7 ? "Submit" : "Proceed"}
                  </Button>
                )}
                {page === 3 && selectedTrainingSource.name === "Internal" && (
                  <Button size="small" type="submit" form="internalCourseOutlineForm">
                    Proceed
                  </Button>
                )}
                {page === 3 && selectedTrainingSource.name === "External" && (
                  <Button size="small" type="submit" form="externalCourseOutlineForm">
                    Proceed
                  </Button>
                )}

                {page === 4 && (
                  <Button size="small" type="submit" form="trainingInformationForm">
                    Proceed
                  </Button>
                )}
                {page === 6 && (
                  <Button size="small" type="submit" form="trainingDocumentsForm">
                    Proceed
                  </Button>
                )}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
      <Toast
        duration={2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};
