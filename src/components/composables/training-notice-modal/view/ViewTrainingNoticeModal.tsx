"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, useContext, useEffect } from "react";
import { SendTrainingNoticeSummary } from "../send/SendTrainingNoticeSummary";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { getTrainingTypeFromString } from "@lms/utilities/functions/getTrainingTypeFromString";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export const ViewTrainingNoticeModal: FunctionComponent = () => {
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
  const { id, viewTrainingNoticeModalIsOpen, setViewTrainingNoticeModalIsOpen } = useContext(TrainingNoticeContext);

  // per training notice query
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["training-details-sending", trainingNoticeId],
    enabled: !!trainingNoticeId && viewTrainingNoticeModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training-details/${id}`, { withCredentials: true })) as any;
        if (!isEmpty(data)) {
          // setCourseContent(data.courseContent);
          if (data.source.name === "Internal") {
            setId(data.id);
            setSelectedTrainingSource({ name: "Internal" });
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
            setSelectedTrainingSource({ name: "External" });
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
    onError: () => {},
  });

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingNoticeId) && !isEmpty(id)) {
      setTrainingNoticeId(id);
    }
  }, [id, trainingNoticeId, viewTrainingNoticeModalIsOpen]);

  return (
    <>
      <Modal
        isOpen={viewTrainingNoticeModalIsOpen}
        setIsOpen={setViewTrainingNoticeModalIsOpen}
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
              {/* <SendTrainingNoticeSummary /> */}
              {isLoading ? (
                <div className="flex justify-center w-full h-full overflow-hidden">
                  <Spinner size="large" color="blue" borderSize={4} />
                </div>
              ) : isError ? (
                <>Error</>
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
                    setViewTrainingNoticeModalIsOpen(false);
                    setSelectedTrainingType(undefined);
                    reset();
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
