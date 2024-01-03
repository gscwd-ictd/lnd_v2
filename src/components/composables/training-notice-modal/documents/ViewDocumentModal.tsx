"use client";

import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import PdfHeader from "../../documents/PdfHeader";
import ApprovedTrainingPdf from "../../documents/training/ApprovedTrainingPdf";

export const ViewDocumentModal: FunctionComponent = () => {
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);

  const {
    id,
    employeePool,
    batches,
    setBatches,
    setEmployeePool,
    setTotalSelectedEmployees,
    viewDocumentsModalIsOpen,
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

          const { data: acceptedNominees } = (await axios.get(`${url}/training-nominees/${id}/accepted`)) as any;
          console.log(acceptedNominees);
          setEmployeePool(acceptedNominees);
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
        size="full"
        fixedHeight
        animate={false}
        onClose={() => {
          setSelectedTrainingType(undefined);
          setTotalSelectedEmployees([]);
          setBatches([{ trainingDate: { from: "", to: "" }, employees: [], batchNumber: 1 }]); // initialize
          setEmployeePool([]); //TODO Replace this with the route from sir henry
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
              <p className="text-sm text-gray-400">Details</p>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {/* <ApprovedTrainingPdf/> */}
              <PDFViewer width={"100%"} height={1400}>
                <Document title=" ">
                  <Page style={{ paddingHorizontal: 72, paddingVertical: 24, height: 792 }}>
                    <PdfHeader isoCode="HRD-4444-4" withIsoLogo />
                    <ApprovedTrainingPdf courseTitle={courseTitle} />
                  </Page>
                </Document>
              </PDFViewer>
            </main>
          </ModalContent.Body>
        </ModalContent>
      </Modal>
    </>
  );
};
