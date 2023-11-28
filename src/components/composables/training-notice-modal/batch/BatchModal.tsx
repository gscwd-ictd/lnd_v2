"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { BatchNumbering } from "./BatchNumbering";

export const BatchModal: FunctionComponent = () => {
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const { id, viewDocumentsModalIsOpen, setViewDocumentsModalIsOpen } = useContext(TrainingNoticeContext);

  // per training notice query
  useQuery({
    queryKey: ["training-details-sending", trainingNoticeId],
    enabled: !!trainingNoticeId && viewDocumentsModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training-details/${id}`)) as any;
        if (!isEmpty(data)) {
          console.log(data);
          setNumberOfParticipants(data.numberOfParticipants);
        }

        return data;
      } catch (error) {
        return error;
      }
    },
  });

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingNoticeId) && !isEmpty(id)) {
      setTrainingNoticeId(id);
    }
  }, [id, trainingNoticeId, viewDocumentsModalIsOpen]);

  return (
    <>
      <Modal
        isOpen={viewDocumentsModalIsOpen}
        setIsOpen={setViewDocumentsModalIsOpen}
        size="lg"
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
              <BatchNumbering />
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  size="small"
                  variant="white"
                  onClick={() => {
                    setViewDocumentsModalIsOpen(false);
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
