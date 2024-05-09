"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { TrainingNotice } from "@lms/utilities/types/training";
import { url } from "@lms/utilities/url/api-url";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useState } from "react";
import { useRecentDataTable } from "./hooks/use-recent-data-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";
import {
  Batch,
  BatchEmployee,
  TrainingRequirement,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import { getTrainingTypeFromString } from "@lms/utilities/functions/getTrainingTypeFromString";
import dayjs from "dayjs";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { RecentSlideOver } from "../recent/slideover/RecentSlideOver";
import { RecentRequirementsModal } from "../recent/modal/RecentRequirementsModal";
import { RecentRequirementsSummaryModal } from "../recent/modal/RecentRequirementsSummaryModal";

type RecentState = {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  batchesWithEmployees: Array<BatchWithEmployees>;
  setBatchesWithEmployees: Dispatch<SetStateAction<Array<BatchWithEmployees>>>;
  selectedBatch: BatchWithEmployees;
  setSelectedBatch: Dispatch<SetStateAction<BatchWithEmployees>>;
  batchAttendanceIsOpen: boolean;
  setBatchAttendanceIsOpen: Dispatch<SetStateAction<boolean>>;
  hasFetchedBatches: boolean;
  setHasFetchedBatches: Dispatch<SetStateAction<boolean>>;
  slideOverIsOpen: boolean;
  setSlideOverIsOpen: Dispatch<SetStateAction<boolean>>;
  alertSubmissionIsOpen: boolean;
  setAlertSubmissionIsOpen: Dispatch<SetStateAction<boolean>>;
  setToastOptions: (color: ToastType["color"], title: string, content: string | undefined) => void;
  toastIsOpen: boolean;
  setToastIsOpen: Dispatch<SetStateAction<boolean>>;
  toastType: ToastType;
  setToastType: Dispatch<SetStateAction<ToastType>>;
  requirements: Array<TrainingRequirement>;
  setRequirements: Dispatch<SetStateAction<Array<TrainingRequirement>>>;
  requirementsModalIsOpen: boolean;
  setRequirementsModalIsOpen: Dispatch<SetStateAction<boolean>>;
  temporarySelectedBatch: BatchWithEmployees;
  setTemporarySelectedBatch: Dispatch<SetStateAction<BatchWithEmployees>>;
};

export type NewTrainingRequirements = Pick<TrainingRequirement, "document">;

export type EmployeeWithRequirements = {
  employeeId: string;
  name: string;
  nomineeId: string;
  requirements: Array<TrainingRequirement>;
  status: string;
};

export type BatchWithEmployees = {
  batchNumber: number;
  trainingDate: { from: string; to: string };
  employees: Array<EmployeeWithRequirements>;
  requirements: Array<TrainingRequirement>;
};

export type TrainingWithRequirements = {
  batches: Array<BatchWithEmployees>;
  requirements: Array<NewTrainingRequirements>;
};

export const RecentContext = createContext({} as RecentState);

export const RecentDataTable: FunctionComponent = () => {
  const [requirementsModalIsOpen, setRequirementsModalIsOpen] = useState<boolean>(false);
  const [slideOverIsOpen, setSlideOverIsOpen] = useState<boolean>(false);
  const [alertSubmissionIsOpen, setAlertSubmissionIsOpen] = useState<boolean>(false);
  const [selectedBatch, setSelectedBatch] = useState<BatchWithEmployees>({} as BatchWithEmployees);
  const [batchAttendanceIsOpen, setBatchAttendanceIsOpen] = useState<boolean>(false);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [requirements, setRequirements] = useState<Array<TrainingRequirement>>([]);
  const [temporarySelectedBatch, setTemporarySelectedBatch] = useState<BatchWithEmployees>({} as BatchWithEmployees);
  const [hasFetchedBatches, setHasFetchedBatches] = useState<boolean>(false);
  const { columns, id, setId, batchesWithEmployees, setBatchesWithEmployees } = useRecentDataTable();
  const setSelectedTrainingSource = useTrainingNoticeStore((state) => state.setSelectedTrainingSource);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setSelectedFacilitators = useTrainingNoticeStore((state) => state.setSelectedFacilitators);
  const setSelectedTags = useTrainingNoticeStore((state) => state.setSelectedTags);
  const setSlotDistribution = useTrainingNoticeStore((state) => state.setSlotDistribution);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setNumberOfHours = useTrainingNoticeStore((state) => state.setNumberOfHours);
  const setLocation = useTrainingNoticeStore((state) => state.setLocation);
  const setTrainingRequirements = useTrainingNoticeStore((state) => state.setTrainingRequirements);
  const setBucketFiles = useTrainingNoticeStore((state) => state.setBucketFiles);
  const setSelectedTrainingDesign = useTrainingNoticeStore((state) => state.setSelectedTrainingDesign);
  const setCourseContent = useTrainingNoticeStore((state) => state.setCourseContent);

  const setToastOptions = (color: typeof toastType.color, title: string, content: string | undefined) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  // per training notice query
  useQuery({
    queryKey: ["view-training-details", id],
    enabled: !!id && slideOverIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training/${id}`)) as any;
        if (!isEmpty(data)) {
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
  });

  // this is to check the status if it already has batching and fetch the batches
  useQuery({
    queryKey: ["training-details-nominees-batches", id],
    enabled: !!id && hasFetchedBatches === false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      // const { data } = await axios.get(`${url}/training/${id}/batch`);
      const { data } = await axios.get(`${url}/training/${id}/requirements`);
      let updatedSelectedEmployees: EmployeeWithRequirements[] = [];

      const fetchedBatches = data.batches.map((batch: BatchWithEmployees) => {
        if (batch.employees.length > 0) updatedSelectedEmployees.push(...batch.employees!);
        return {
          batchNumber: batch.batchNumber,

          trainingDate: {
            from: dayjs(batch.trainingDate?.from).format("YYYY-MM-DD hh:mm"),
            to: dayjs(batch.trainingDate?.to).format("YYYY-MM-DD hh:mm"),
          },
          isOneDayTraining:
            dayjs(batch.trainingDate?.from).isSame(dayjs(batch.trainingDate?.to), "day") === true ? true : false,
          employees: batch.employees,
        };
      });

      setRequirements(data.requirements);

      // set fetched batches to true
      setHasFetchedBatches(true);
      setBatchesWithEmployees(fetchedBatches);

      // setTotalSelectedEmployees(updatedSelectedEmployees.sort((a, b) => (a.name > b.name ? 1 : -1)));
      // setEmployeePool([]);

      return fetchedBatches;
    },
  });

  return (
    <>
      <RecentContext.Provider
        value={{
          id,
          selectedBatch,
          batchesWithEmployees,
          batchAttendanceIsOpen,
          hasFetchedBatches,
          slideOverIsOpen,
          alertSubmissionIsOpen,
          toastIsOpen,
          toastType,
          requirements,
          requirementsModalIsOpen,
          temporarySelectedBatch,
          setTemporarySelectedBatch,
          setRequirements,
          setBatchesWithEmployees,
          setRequirementsModalIsOpen,
          setToastIsOpen,
          setId,
          setToastOptions,
          setToastType,
          setAlertSubmissionIsOpen,
          setSlideOverIsOpen,
          setHasFetchedBatches,
          setBatchAttendanceIsOpen,
          setSelectedBatch,
        }}
      >
        <DataTable<TrainingNotice>
          datasource={`${url}/training/recent`}
          queryKey={["recent-trainings"]}
          columns={columns}
          title="Recent Trainings"
          subtitle="Newly finished trainings"
          onRowClick={(row) => {
            setSlideOverIsOpen(true);
            setId(row.original.id);
          }}
        />
        <RecentSlideOver />
        <RecentRequirementsModal />
        <RecentRequirementsSummaryModal />
      </RecentContext.Provider>
    </>
  );
};
