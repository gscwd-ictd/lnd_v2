import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import {
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { initial, isEmpty } from "lodash";
import { Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useState } from "react";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { TrainingNoticeModalBody } from "./TrainingNoticeModalBody";
import dayjs from "dayjs";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { LspSource, useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import {
  getCapitalizedTrainingType,
  getTrainingTypeFromString,
} from "@lms/utilities/functions/getTrainingTypeFromString";
import { useAppwriteClient } from "@lms/components/osprey/appwrite/view/AppwriteContainer";
import { Storage } from "appwrite";
import convertSize from "convert-size";
import { TrainingNoticeContext } from "../training-notice-data-table/TrainingNoticeDataTable";

type ToastType = {
  color: "success" | "warning" | "info" | "default" | "danger";
  title: string;
  content: string;
};

export const EditTrainingNoticeModal: FunctionComponent = () => {
  const { id, editModalIsOpen, setEditModalIsOpen } = useContext(TrainingNoticeContext);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const training = useTrainingNoticeStore();
  const client = useAppwriteClient();
  const queryClient = useQueryClient();

  const {
    courseTitle,
    facilitator,
    selectedTag,
    id: trainingNoticeId,
    selectedFacilitators,
    selectedTrainingSource,
    setId: setTrainingNoticeId,
    courseContent,
    numberOfParticipants,
    consumedSlots,
    bucket,
    bucketFiles,
    filesToUpload,
    selectedTags,
    initialTrainingDocuments,
    trainingRequirements,
    setBucketFiles,
    reset,
    setStatus,
    setLocation,
    setTrainingEnd,
    setCourseTitle,
    setInvitationUrl,
    setTrainingStart,
    setNumberOfHours,
    setCourseContent,
    setNumberOfParticipants,
    setNomineeQualifications,
    setDeadlineForSubmission,
    setSelectedTrainingDesign,
    setSelectedTrainingSource,
    setInitialTrainingDocuments,
    setSelectedFacilitators,
    setSlotDistribution,
    setSelectedTags,
    setHasFetchedRecommendations,
    setTrainingRequirements,
  } = useTrainingNoticeStore();

  const lspSource = useLspSourceStore((state) => state.lspSource);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);

  // training notice modal store
  const { page, setAction, setPage } = useTrainingNoticeModalStore((state) => ({
    page: state.page,
    setPage: state.setPage,
    setAction: state.setAction,
  }));

  // training type store
  const { selectedTrainingType, setSelectedTrainingType } = useTrainingTypesStore((state) => ({
    selectedTrainingType: state.selectedTrainingType,
    setSelectedTrainingType: state.setSelectedTrainingType,
  }));

  // toast options
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const assignBucketFile = async (bucketFileIds: Array<string>) => {
    const storage = new Storage(client!);

    if (bucketFileIds.length > 0) {
      const newBucketFiles = Promise.all(
        bucketFileIds.map(async (file) => {
          const fileDetails = await storage.getFile(bucket, file);
          const filePreview = storage.getFilePreview(bucket, file);
          const fileView = storage.getFileView(bucket, file);

          return {
            id: file,
            name: fileDetails.name,
            href: filePreview.href,
            fileLink: fileView.href,
            sizeOriginal: convertSize(fileDetails.sizeOriginal, "KB", { stringify: true }),
            mimeType: fileDetails.mimeType,
          };
        })
      );
      setBucketFiles(await newBucketFiles);
    } else setBucketFiles([]);
  };

  const internalTrainingMutation = useMutation({
    onSuccess: async (data) => {
      setEditModalIsOpen(false);
      // toast options here
      setToastOptions("success", "Success", "You have successfully updated a training notice!");
      reset();
      // resetModal();

      const getUpdatedTrainingNotice = await axios.get(`${url}/training-details?page=1&limit=1000`);

      queryClient.setQueryData(["training-notice"], getUpdatedTrainingNotice.data.items);
    },
    onError: (error) => setToastOptions("danger", "Error", `There is a problem with the request: ${error}`),
    mutationFn: async () => {
      const {
        trainingSource,
        location,
        numberOfHours,
        courseContent,
        numberOfParticipants,
        slotDistribution,
        trainingDocuments,
        trainingDesign,
      } = training;

      const response = await axios.put(`${url}/training-details/internal`, {
        trainingSource,
        trainingDesign: trainingDesign?.id,
        trainingType: selectedTrainingType,
        courseContent,
        trainingLspDetails: selectedFacilitators.map((faci) => {
          return { id: faci.id }; //TODO rename lspDetails to lspDetailsId
        }),
        location,
        slotDistribution: slotDistribution.map((slot) => {
          slot.employees.map((employee) => {
            return { id: employee.id };
          });
          return slot;
        }),
        trainingStart: new Date(training.trainingStart).toISOString(),
        trainingEnd: new Date(training.trainingEnd).toISOString(),
        numberOfHours,
        deadlineForSubmission: new Date(training.deadlineForSubmission).toISOString(),
        numberOfParticipants,
        trainingTags: selectedTags.map((tag) => {
          return { tag: tag.id };
        }),

        trainingRequirements: trainingDocuments,
      });

      return response.data;
    },
  });

  const externalTrainingMutation = useMutation({
    onSuccess: async () => {
      setEditModalIsOpen(false);
      // toast options here
      setToastOptions("success", "Success", "You have successfully updated a training notice!");
      reset();
      // resetModal();

      const getUpdatedTrainingNotice = await axios.get(`${url}/training-details?page=1&limit=1000`);

      queryClient.setQueryData(["training-notice"], getUpdatedTrainingNotice.data.items);
    },
    onError: (error) => setToastOptions("danger", "Error", `There is a problem with the request: ${error}`),
    mutationFn: async () => {
      const {
        trainingSource,
        location,
        numberOfHours,
        courseContent,
        numberOfParticipants,
        slotDistribution,
        trainingDocuments,
        trainingDesign,
      } = training;

      const response = await axios.put(`${url}/training-details/external`, {
        id,
        trainingSource,
        courseTitle,
        trainingType: selectedTrainingType,
        courseContent,
        trainingLspDetails: selectedFacilitators.map((faci) => {
          return { id: faci.id };
        }),
        location,
        slotDistribution: slotDistribution.map((slot) => {
          slot.employees.map((employee) => {
            return { id: employee.id };
          });
          return slot;
        }),
        trainingStart: new Date(training.trainingStart).toISOString(),
        trainingEnd: new Date(training.trainingEnd).toISOString(),
        numberOfHours,
        deadlineForSubmission: new Date(training.trainingStart).toISOString(),
        numberOfParticipants,
        trainingTags: selectedTags.map((tag) => {
          return { tag: tag.id };
        }),

        trainingRequirements: trainingDocuments,
      });

      return response.data;
    },
  });

  // per training notice
  const { data: trainingNotice, isLoading: isLoadingTrainingNotice } = useQuery({
    queryKey: ["training-details", trainingNoticeId],
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training-details/${id}`)) as any;
        // INTERNAL
        if (!isEmpty(data)) {
          console.log(data);
          setCourseContent(data.courseContent);
          setTrainingRequirements(data.trainingRequirements);
          if (data.source.name === "Internal") {
            setSelectedTrainingSource({ id: data.source.id, name: "Internal" });
            //setSelectedTrainingSource(data.trainingSource); //TODO Uncomment this and remove line 262 code
            setSelectedTrainingDesign({
              courseTitle: data.trainingDesign.courseTitle,
              id: data.trainingDesign.id,
            });

            setSlotDistribution(data.slotDistribution);
            setSelectedFacilitators(data.trainingLspDetails);
            setSelectedTags(data.trainingTags);
            setDeadlineForSubmission(data.deadlineForSubmission);
            setInvitationUrl!(data.invitationUrl);
            setLocation(data.location);
            setNomineeQualifications(data.nomineeQualifications);
            setNumberOfHours(data.numberOfHours);
            setNumberOfParticipants(data.numberOfParticipants);
            setStatus(data.status);
            setTrainingEnd(dayjs(data.trainingEnd).format("YYYY-MM-DD"));
            setTrainingStart(dayjs(data.trainingStart).format("YYYY-MM-DD"));
            setLspSource(data.lspSource.name === "Internal" ? LspSource.INTERNAL : LspSource.EXTERNAL);
            // setCourseTitle(data.)
            setInitialTrainingDocuments([
              { document: "Pre-test", isSelected: false },
              { document: "Course Materials", isSelected: false },
              { document: "Post Training Report", isSelected: false },
              { document: "Course Evaluation Report", isSelected: false },
              { document: "Learning Application Plan", isSelected: false },
              { document: "Post-test", isSelected: false },
            ]);
          }

          // EXTERNAL
          else if (data.trainingSource === "External") {
            setSelectedTrainingSource({ id: data.source.id, name: "External" });
            assignBucketFile(data.bucketFiles);
            setDeadlineForSubmission(data.deadlineForSubmission);
            setInvitationUrl!(data.invitationUrl);
            setLocation(data.location);
            setNomineeQualifications(data.nomineeQualifications);
            setNumberOfHours(data.numberOfHours);
            setCourseTitle(data.courseTitle);
            setNumberOfParticipants(data.numberOfParticipants);
            setStatus(data.status);
            setTrainingEnd(dayjs(data.trainingEnd).format("YYYY-MM-DD"));
            setSlotDistribution(data.slotDistribution);
            setSelectedTags(data.trainingTags);
            setSelectedFacilitators(data.trainingLspDetails);
            setTrainingStart(dayjs(data.trainingStart).format("YYYY-MM-DD"));
            setLspSource(data.lspSource.name === "Internal" ? LspSource.INTERNAL : LspSource.EXTERNAL);

            setInitialTrainingDocuments([
              { document: "Pre-test", isSelected: false },
              { document: "Course Materials", isSelected: false },
              { document: "Post Training Report", isSelected: false },
              { document: "Course Evaluation Report", isSelected: false },
              { document: "Learning Application Plan", isSelected: false },
              { document: "Post-test", isSelected: false },
            ]);
          }
        }

        return data;
      } catch (error) {
        return error;
      }
    },
    enabled: !!trainingNoticeId && editModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // on prev
  const onPrev = () => {
    if (page === 1) {
      setAction(undefined);
      setSelectedTrainingType(undefined);
      setLspSource(undefined);
      setEditModalIsOpen(false);
    } else setPage(page - 1);
  };

  // on next
  const onNext = () => {
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
        else if (isEmpty(selectedFacilitators.length < 1))
          setToastOptions("danger", "Error", "Select a facilitator first!");
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
        internalTrainingMutation.mutate();
      } else setPage(page + 1);
    }
    // external
    else if (selectedTrainingSource?.name === "External") {
      if (page === 1) {
        if (bucketFiles.length > 0 || filesToUpload.length > 0) setPage(2);
        else setToastOptions("danger", "Error", "Upload first!");
      } else if (page === 2 && isEmpty(selectedTrainingType)) {
        setToastOptions("danger", "Error", "Select a training type first!");
      } else if (page === 3) {
        if (isEmpty(courseTitle)) setToastOptions("danger", "Error", "Enter a course title first!");
        else if (isEmpty(facilitator.name)) setToastOptions("danger", "Error", "Select a facilitator first!");
        else if (courseContent.length < 1)
          setToastOptions("danger", "Error", "Enter at least one course content first!");
        else setPage(4);
      } else if (page === 4) {
        if (isEmpty(selectedTrainingSource)) setToastOptions("danger", "Error", "Select a tag first!");
        else if (numberOfParticipants === undefined || numberOfParticipants < 1)
          setToastOptions("danger", "Error", "Enter number of participants first!");
        else setPage(5);
      } else if (page === 7) {
        externalTrainingMutation.mutate();
      } else setPage(page + 1);
    }
  };

  // on Close
  const onClose = () => {
    setPage(1);
    setSelectedTrainingType(undefined);
    setAction(undefined);
    reset();
    // setTag({ id: "", tag: "" }), setSelectedTag({ id: "", tag: "" });
  };

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingNoticeId) && !isEmpty(id)) {
      setTrainingNoticeId(id);
    }
  }, [id, trainingNoticeId]);

  return (
    <>
      <Modal
        isOpen={editModalIsOpen}
        setIsOpen={setEditModalIsOpen}
        onClose={onClose}
        size={page === 7 ? "lg" : "md"}
        isStatic
      >
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
            {isLoadingTrainingNotice ? <>Loading resources...</> : <TrainingNoticeModalBody />}
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
