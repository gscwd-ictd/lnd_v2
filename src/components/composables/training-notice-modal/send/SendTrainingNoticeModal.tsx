"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, useContext, useEffect } from "react";
import { SendTrainingNoticeSummary } from "./SendTrainingNoticeSummary";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { getTrainingTypeFromString } from "@lms/utilities/functions/getTrainingTypeFromString";
import { useTrainingNoticeDataTable } from "../../training-notice-data-table/hooks/use-training-notice-data-table";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { Storage } from "appwrite";
import convertSize from "convert-size";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { useLnd } from "@lms/hooks/use-lnd";

export const SendTrainingNoticeModal: FunctionComponent = () => {
  const client = useLnd();
  const setSelectedTrainingSource = useTrainingNoticeStore((state) => state.setSelectedTrainingSource);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setSelectedFacilitators = useTrainingNoticeStore((state) => state.setSelectedFacilitators);
  const setSelectedTags = useTrainingNoticeStore((state) => state.setSelectedTags);
  const setSlotDistribution = useTrainingNoticeStore((state) => state.setSlotDistribution);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setNumberOfHours = useTrainingNoticeStore((state) => state.setNumberOfHours);
  const setLocation = useTrainingNoticeStore((state) => state.setLocation);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingRequirements = useTrainingNoticeStore((state) => state.setTrainingRequirements);
  const setBucketFiles = useTrainingNoticeStore((state) => state.setBucketFiles);
  const setId = useTrainingNoticeStore((state) => state.setId);
  const setSelectedTrainingDesign = useTrainingNoticeStore((state) => state.setSelectedTrainingDesign);
  const setCourseContent = useTrainingNoticeStore((state) => state.setCourseContent);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const { isComplete, setIsComplete } = useTrainingNoticeDataTable();
  const selectedTrainingSource = useTrainingNoticeStore((state) => state.selectedTrainingSource);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const selectedFacilitators = useTrainingNoticeStore((state) => state.selectedFacilitators);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const numberOfHours = useTrainingNoticeStore((state) => state.numberOfHours);
  const from = useTrainingNoticeStore((state) => state.trainingStart);
  const to = useTrainingNoticeStore((state) => state.trainingEnd);
  const slotDistribution = useTrainingNoticeStore((state) => state.slotDistribution);
  const trainingRequirements = useTrainingNoticeStore((state) => state.trainingRequirements);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const location = useTrainingNoticeStore((state) => state.location);
  const bucketFiles = useTrainingNoticeStore((state) => state.bucketFiles);
  const { id, sendModalIsOpen, setSendModalIsOpen, setConfirmCompleteModalIsOpen, confirmCompleteModalIsOpen } =
    useContext(TrainingNoticeContext);

  // per training notice query
  const { isLoading: trainingIsLoading, isFetching: trainingIsFetching } = useQuery({
    queryKey: ["training-details-sending", trainingNoticeId],
    enabled: !!trainingNoticeId && sendModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training/${id}`, { withCredentials: true })) as any;
        if (!isEmpty(data)) {
          // setCourseContent(data.courseContent);
          if (data.source.name === "Internal") {
            setId(data.id);
            setSelectedTrainingSource({ name: "Internal", id: data.source.id });
            setCourseTitle(data.courseTitle);
            setCourseContent(data.courseContent);
            setSelectedTrainingDesign({ id: data.trainingDesign.id, courseTitle: data.trainingDesign.courseTitle });
            setSelectedTrainingType(getTrainingTypeFromString(data.type));
            setSelectedFacilitators(data.trainingLspDetails);
            setSelectedTags(data.trainingTags);
            setSlotDistribution(data.slotDistribution);
            setTrainingStart(data.trainingStart);
            setTrainingEnd(data.trainingEnd);
            setNumberOfParticipants(Number(data.numberOfParticipants));
            setNumberOfHours(Number(data.numberOfHours));
            setLocation(data.location);
            setTrainingRequirements(data.trainingRequirements);

            // setInternalTrainingNotice(data);
          } else if (data.source.name === "External") {
            setId(data.id);
            setSelectedTrainingSource({ name: "External", id: data.source.id });
            setCourseTitle(data.courseTitle);
            setCourseContent(data.courseContent);
            setSelectedTrainingType(getTrainingTypeFromString(data.type));
            setSelectedFacilitators(data.trainingLspDetails);
            setSelectedTags(data.trainingTags);
            setSlotDistribution(data.slotDistribution);
            setTrainingStart(data.trainingStart);
            setTrainingEnd(data.trainingEnd);
            setNumberOfParticipants(Number(data.numberOfParticipants));
            setNumberOfHours(Number(data.numberOfHours));
            setLocation(data.location);
            setTrainingRequirements(data.trainingRequirements);
            setBucketFiles(data.bucketFiles);
            // setExternalTrainingNotice(data);
          }
        }

        return data;
      } catch (error) {
        return error;
      }
    },
  });

  // fetch uploaded files
  useQuery({
    queryKey: ["uploaded-files", trainingNoticeId],
    enabled: !!trainingNoticeId && sendModalIsOpen !== false && selectedTrainingSource.name === "External",
    queryFn: async () => {
      try {
        const storage = new Storage(client!);
        const getBucketListFiles = await axios.get(`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/lnd?id=${id}`);

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
          setBucketFiles(await newBucketFiles);
          return await newBucketFiles;
        } else setBucketFiles([]);
      } catch (error) {
        return setBucketFiles([]);
      }
    },
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingNoticeId) && !isEmpty(id)) {
      setTrainingNoticeId(id);
    }
  }, [id, trainingNoticeId, sendModalIsOpen]);

  useEffect(() => {
    if (selectedTrainingSource.name === "Internal") {
      if (
        !isEmpty(courseTitle) &&
        !isEmpty(selectedTrainingType) &&
        !isEmpty(selectedTags) &&
        !isEmpty(selectedFacilitators) &&
        numberOfParticipants > 0 &&
        numberOfHours > 0 &&
        !isEmpty(location) &&
        slotDistribution.length > 0 &&
        trainingRequirements.length > 0 &&
        !isEmpty(from) &&
        !isEmpty(to)
      )
        setIsComplete(true);
      else setIsComplete(false);
    } else if (selectedTrainingSource.name === "External") {
      if (
        !isEmpty(courseTitle) &&
        !isEmpty(selectedTrainingType) &&
        !isEmpty(selectedTags) &&
        !isEmpty(selectedFacilitators) &&
        bucketFiles?.length > 0 &&
        numberOfParticipants > 0 &&
        numberOfHours > 0 &&
        !isEmpty(location) &&
        slotDistribution.length > 0 &&
        trainingRequirements.length > 0 &&
        !isEmpty(from) &&
        !isEmpty(to)
      ) {
        setIsComplete(true);
      } else setIsComplete(false);
    }
  }, [
    bucketFiles,
    selectedTrainingSource,
    location,
    selectedFacilitators,
    numberOfParticipants,
    numberOfHours,
    courseTitle,
    selectedTrainingType,
    selectedTags,
  ]);

  return (
    <>
      <Modal
        isOpen={sendModalIsOpen}
        setIsOpen={setSendModalIsOpen}
        size="3md"
        animate={false}
        isStatic
        onClose={() => {
          setSelectedTrainingType(undefined);
          reset();
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Training Notice Recommendations</h3>
              </div>
              <p className="text-sm text-gray-400">Details are as follows</p>
            </header>
          </ModalContent.Title>

          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {/* <TrainingRecommendations /> */}
              {trainingIsLoading || trainingIsFetching ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Spinner />
                </div>
              ) : (
                <SendTrainingNoticeSummary />
              )}
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  size="small"
                  variant="white"
                  onClick={() => {
                    setSendModalIsOpen(false);
                    setSelectedTrainingType(undefined);
                    reset();
                  }}
                >
                  Close
                </Button>
                <Button
                  size="small"
                  type="button"
                  disabled={!isComplete}
                  onClick={() => setConfirmCompleteModalIsOpen(true)}
                >
                  Confirm & Send
                </Button>
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
