"use client";

import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { Batch, useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
import PdfHeader from "../../documents/PdfHeader";
import TrainingDocumentPdf from "../../documents/training/TrainingDocumentPdf";
import PdfFooter from "../../documents/PdfFooter";
import TrainingNomineesDocument from "../../documents/training/TrainingNomineesDocument";
import { PageContentContext } from "@lms/components/osprey/page-content/view/PageWrapper";
import dayjs from "dayjs";

type PointPerson = {
  name: string;
  position: string;
  signatureUrl?: string;
};

export const ViewDocumentModal: FunctionComponent = () => {
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const setLocation = useTrainingNoticeStore((state) => state.setLocation);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setFrom = useTrainingNoticeStore((state) => state.setTrainingStart);
  const setTo = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const from = useTrainingNoticeStore((state) => state.trainingStart);
  const to = useTrainingNoticeStore((state) => state.trainingEnd);
  const location = useTrainingNoticeStore((state) => state.location);
  const [notedBy, setNotedBy] = useState<PointPerson>({ name: " ", signatureUrl: "", position: "" });
  const [preparedBy, setPreparedBy] = useState<PointPerson>({ name: " ", signatureUrl: "", position: "" });

  const { id, viewDocumentsModalIsOpen, setViewDocumentsModalIsOpen, batches, setBatches } =
    useContext(TrainingNoticeContext);

  // per training notice query
  useQuery({
    queryKey: ["training-details", trainingNoticeId],
    enabled: !!trainingNoticeId && viewDocumentsModalIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training/${id}`, { withCredentials: true })) as any;
        if (!isEmpty(data)) {
          setNumberOfParticipants(data.numberOfParticipants);
          setCourseTitle(data.courseTitle);
          setTrainingStart(data.trainingStart);
          setTrainingEnd(data.trainingEnd);
          setFrom(data.trainingStart);
          setTo(data.trainingEnd);
          setLocation(data.location);
          setPreparedBy({
            name: "HANELLE B. BALANSAG, MPA",
            position: "Acting Department Manager A, HR Head, PDC Secretariat",
          });
          setNotedBy({
            name: "FERDINAND S. FERRER, MPA",
            position: "Acting General Manager / PDC Chairperson",
          });

          // setBatches([
          //   {
          //     batchNumber: 1,
          //     trainingDate: { from: "01/28/2024", to: "01/28/2024" },
          //     employees: [
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },

          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //       {
          //         employeeId: "123",
          //         name: "Ricardo Vicente Narvaiza",
          //         supervisor: { name: "Michael Gabales", supervisorId: "1" },
          //         distributionId: "123",
          //         nomineeId: "123",
          //       },
          //     ],
          //   },

          //   //2
          //   {
          //     batchNumber: 2,
          //     trainingDate: { from: "01/28/2024", to: "01/29/2024" },
          //     employees: [
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "John Seigfred Derla",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //     ],
          //   },

          //   //3
          //   {
          //     batchNumber: 3,
          //     trainingDate: { from: "01/29/2024", to: "01/29/2024" },
          //     employees: [
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //     ],
          //   },

          //   //4
          //   {
          //     batchNumber: 4,
          //     trainingDate: { from: "01/29/2024", to: "01/29/2024" },
          //     employees: [
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //     ],
          //   },

          //   //5
          //   {
          //     batchNumber: 5,
          //     trainingDate: { from: "01/29/2024", to: "01/29/2024" },
          //     employees: [
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //     ],
          //   },

          //   //6
          //   {
          //     batchNumber: 6,
          //     trainingDate: { from: "01/29/2024", to: "01/29/2024" },
          //     employees: [
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //     ],
          //   },

          //   //7
          //   {
          //     batchNumber: 7,
          //     trainingDate: { from: "01/29/2024", to: "01/29/2024" },
          //     employees: [
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //     ],
          //   },

          //   //8
          //   {
          //     batchNumber: 8,
          //     trainingDate: { from: "01/29/2024", to: "01/29/2024" },
          //     employees: [
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //       {
          //         employeeId: "124",
          //         name: "Hafez Ben Saiyadi",
          //         supervisor: { name: "Ferdinand Ferrer", supervisorId: "2" },
          //         distributionId: "123",
          //         nomineeId: "124",
          //       },
          //     ],
          //   },
          // ]);
        }

        return data;
      } catch (error) {
        return error;
      }
    },
  });

  // this is to check the status if it already has batching and fetch the batches
  useQuery({
    queryKey: ["training-details-nominees-batches", id],
    enabled: !!id,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${url}/training-nominees/${id}/batch`);

        const fetchedBatches = data.map((batch: Batch) => {
          return {
            batchNumber: batch.batchNumber,
            trainingDate: {
              from: dayjs(batch.trainingDate.from).format("YYYY-MM-DD hh:mm"),
              to: dayjs(batch.trainingDate.to).format("YYYY-MM-DD hh:mm"),
            },
            employees: batch.employees,
          };
        });

        setBatches(fetchedBatches);

        // setTotalSelectedEmployees(updatedSelectedEmployees.sort((a, b) => (a.name > b.name ? 1 : -1)));
        // setEmployeePool([]);

        return batches;
      } catch (error) {
        return error;
      }
    },
  });

  const { windowHeight } = useContext(PageContentContext);

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

              <PDFViewer width={"100%"} height={windowHeight}>
                <Document title=" ">
                  <Page size="A4" style={{ paddingHorizontal: 72, paddingVertical: 24 }}>
                    <PdfHeader isoCode="HRD-4444-4" withIsoLogo />
                    <TrainingDocumentPdf
                      data={{ courseTitle, from, to, location, notedBy, preparedBy, isApproved: true }}
                    />
                    <PdfFooter />
                  </Page>

                  <Page style={{ paddingTop: 50, paddingBottom: 50, paddingHorizontal: 5 }}>
                    <TrainingNomineesDocument details={{ batches, courseTitle }} />
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
