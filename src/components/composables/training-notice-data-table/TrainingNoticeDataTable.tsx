"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { EmployeeWithSupervisor, TrainingNotice, TrainingPreparationStatus } from "@lms/utilities/types/training";
import { url } from "@lms/utilities/url/api-url";
import { Dispatch, FunctionComponent, SetStateAction, createContext } from "react";
import { useTrainingNoticeDataTable } from "./hooks/use-training-notice-data-table";
import { EditTrainingNoticeModal } from "../training-notice-modal/EditTrainingNoticeModal";
import { DeleteTrainingNoticeModal } from "../training-notice-modal/delete/DeleteTrainingNoticeModal";
import { SendTrainingNoticeModal } from "../training-notice-modal/send/SendTrainingNoticeModal";
import { ViewNomineeStatusModal } from "../training-notice-modal/nominee-status/ViewNomineeStatusModal";
import { ConfirmCompleteTrainingModal } from "../training-notice-modal/send/ConfirmCompleteTrainingModal";
import { SendConfirmationTrainingModal } from "../training-notice-modal/send/SendConfirmationTrainingModal";
import { SubmitToPdcSecModal } from "../training-notice-modal/submit-to-pdc-sec/SubmitToPdcSecModal";
import { ViewTrainingNoticeModal } from "../training-notice-modal/view/ViewTrainingNoticeModal";
import { BatchModal } from "../training-notice-modal/batch/BatchModal";
import { Batch } from "@lms/utilities/stores/training-notice-store";
import { AddParticipants } from "../training-notice-modal/batch/AddParticipants";
import { ViewDocumentModal } from "../training-notice-modal/documents/ViewDocumentModal";

type TrainingNoticeState = {
  id: string;
  editModalIsOpen: boolean;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  sendModalIsOpen: boolean;
  setSendModalIsOpen: Dispatch<SetStateAction<boolean>>;
  removeModalIsOpen: boolean;
  setRemoveModalIsOpen: Dispatch<SetStateAction<boolean>>;
  nomineeStatusIsOpen: boolean;
  setNomineeStatusIsOpen: Dispatch<SetStateAction<boolean>>;
  confirmCompleteModalIsOpen: boolean;
  setConfirmCompleteModalIsOpen: Dispatch<SetStateAction<boolean>>;
  sendConfirmationModalIsOpen: boolean;
  setSendConfirmationModalIsOpen: Dispatch<SetStateAction<boolean>>;
  submitToPdcSecModalIsOpen: boolean;
  setSubmitToPdcSecModalIsOpen: Dispatch<SetStateAction<boolean>>;
  viewTrainingNoticeModalIsOpen: boolean;
  setViewTrainingNoticeModalIsOpen: Dispatch<SetStateAction<boolean>>;
  viewDocumentsModalIsOpen: boolean;
  setViewDocumentsModalIsOpen: Dispatch<SetStateAction<boolean>>;
  batches: Batch[];
  setBatches: Dispatch<SetStateAction<Batch[]>>;
  selectedBatch: Batch;
  setSelectedBatch: Dispatch<SetStateAction<Batch>>;
  selectedBatchModalIsOpen: boolean;
  setSelectedBatchModalIsOpen: Dispatch<SetStateAction<boolean>>;
  employeePool: EmployeeWithSupervisor[];
  setEmployeePool: Dispatch<SetStateAction<EmployeeWithSupervisor[]>>;
  totalSelectedEmployees: EmployeeWithSupervisor[];
  setTotalSelectedEmployees: Dispatch<SetStateAction<EmployeeWithSupervisor[]>>;
  employeesWithStatus: EmployeeWithSupervisor[];
  setEmployeesWithStatus: Dispatch<SetStateAction<EmployeeWithSupervisor[]>>;
  batchingModalIsOpen: boolean;
  setBatchingModalIsOpen: Dispatch<SetStateAction<boolean>>;
  trainingPreparationStatus: TrainingPreparationStatus | undefined;
  setTrainingPreparationStatus: Dispatch<SetStateAction<TrainingPreparationStatus | undefined>>;
};

export const TrainingNoticeContext = createContext({} as TrainingNoticeState);

export const TrainingNoticeDataTable: FunctionComponent = () => {
  const {
    columns,
    editModalIsOpen,
    sendModalIsOpen,
    trainingNoticeId,
    removeModalIsOpen,
    nomineeStatusIsOpen,
    confirmCompleteModalIsOpen,
    sendConfirmationModalIsOpen,
    submitToPdcSecModalIsOpen,
    viewTrainingNoticeModalIsOpen,
    viewDocumentsModalIsOpen,
    batches,
    selectedBatch,
    selectedBatchModalIsOpen,
    employeePool,
    totalSelectedEmployees,
    employeesWithStatus,
    batchingModalIsOpen,
    trainingPreparationStatus,
    setTrainingPreparationStatus,
    setBatchingModalIsOpen,
    setEmployeesWithStatus,
    setTotalSelectedEmployees,
    setEmployeePool,
    setSelectedBatchModalIsOpen,
    setSelectedBatch,
    setBatches,
    setViewDocumentsModalIsOpen,
    setViewTrainingNoticeModalIsOpen,
    setSubmitToPdcSecModalIsOpen,
    setSendConfirmationModalIsOpen,
    setConfirmCompleteModalIsOpen,
    setEditModalIsOpen,
    setRemoveModalIsOpen,
    setSendModalIsOpen,
    setNomineeStatusIsOpen,
  } = useTrainingNoticeDataTable();

  return (
    <>
      <DataTable<TrainingNotice>
        datasource={`${url}/training-details?page=1&limit=1000`}
        queryKey={["training-notice"]}
        columns={columns}
        title="Notice of Training"
        subtitle="Training outline and other details for the upcoming training programs."
      />

      <TrainingNoticeContext.Provider
        value={{
          id: trainingNoticeId,
          confirmCompleteModalIsOpen,
          editModalIsOpen,
          nomineeStatusIsOpen,
          removeModalIsOpen,
          sendConfirmationModalIsOpen,
          sendModalIsOpen,
          submitToPdcSecModalIsOpen,
          viewTrainingNoticeModalIsOpen,
          viewDocumentsModalIsOpen,
          batches,
          selectedBatch,
          selectedBatchModalIsOpen,
          employeePool,
          totalSelectedEmployees,
          employeesWithStatus,
          batchingModalIsOpen,
          trainingPreparationStatus,
          setTrainingPreparationStatus,
          setBatchingModalIsOpen,
          setEmployeesWithStatus,
          setTotalSelectedEmployees,
          setEmployeePool,
          setSelectedBatchModalIsOpen,
          setSelectedBatch,
          setBatches,
          setViewDocumentsModalIsOpen,
          setViewTrainingNoticeModalIsOpen,
          setSubmitToPdcSecModalIsOpen,
          setConfirmCompleteModalIsOpen,
          setEditModalIsOpen,
          setNomineeStatusIsOpen,
          setRemoveModalIsOpen,
          setSendConfirmationModalIsOpen,
          setSendModalIsOpen,
        }}
      >
        <EditTrainingNoticeModal />
        <DeleteTrainingNoticeModal />
        <SendTrainingNoticeModal />
        <ViewNomineeStatusModal />
        <ConfirmCompleteTrainingModal />
        <SendConfirmationTrainingModal />
        <SubmitToPdcSecModal />
        <ViewTrainingNoticeModal />
        <BatchModal />
        <AddParticipants />
        <ViewDocumentModal />
      </TrainingNoticeContext.Provider>
    </>
  );
};
