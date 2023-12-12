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
import { employeesWithSupervisor } from "./AddParticipants";

export const BatchModal: FunctionComponent = () => {
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const {
    id,
    viewDocumentsModalIsOpen,
    employeePool,
    batches,
    setBatches,
    setEmployeePool,
    setTotalSelectedEmployees,
    setViewDocumentsModalIsOpen,
  } = useContext(TrainingNoticeContext);

  // per training notice query
  useQuery({
    queryKey: ["training-details-nominees", trainingNoticeId],
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
          setCourseTitle(data.courseTitle);
          setTrainingStart(data.trainingStart);
          setTrainingEnd(data.trainingEnd);
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
        size="3md"
        animate={false}
        isStatic
        onClose={() => {
          setSelectedTrainingType(undefined);
          setTotalSelectedEmployees([]);
          setBatches([{ date: { from: "", to: "" }, employees: [], number: 1 }]); // initialize
          setEmployeePool(employeesWithSupervisor); //TODO Replace this with the route from sir henry
          reset();
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Training Notice</h3>
              </div>
              <p className="text-sm text-gray-400">Batch details</p>
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
                {/* <button className="px-3 py-2 text-white bg-indigo-500 rounded " onClick={() => console.log(batches)}>
                  Batches
                </button>

                <button
                  className="px-3 py-2 text-white bg-indigo-500 rounded "
                  onClick={() => console.log(employeePool)}
                >
                  Pool
                </button>

                <button
                  className="px-3 py-2 text-white bg-indigo-500 rounded "
                  onClick={() => console.log(totalSelectedEmployees)}
                >
                  Selected
                </button> */}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
