"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { TrainingNotice } from "@lms/utilities/types/training";
import { url } from "@lms/utilities/url/api-url";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";
import {
  Batch,
  BatchEmployee,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import { getTrainingTypeFromString } from "@lms/utilities/functions/getTrainingTypeFromString";
import dayjs from "dayjs";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { OngoingAlertSubmission } from "../ongoing/alert/OngoingAlert";
import { OngoingToastComponent } from "../ongoing/toast/ToastComponent";
import { OngoingSlideOver } from "../ongoing/slideover/OngoingSlideOver";
import { useRecentDataTable } from "../recent-data-table/hooks/use-recent-data-table";

type OnGoingState = {
  id: string;
  batches: Array<Batch>;
  setBatches: Dispatch<SetStateAction<Array<Batch>>>;
  selectedBatch: Batch;
  setSelectedBatch: Dispatch<SetStateAction<Batch>>;
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
};
export const OnGoingContext = createContext({} as OnGoingState);

export const OnGoingDataTable: FunctionComponent = () => {
  const [slideOverIsOpen, setSlideOverIsOpen] = useState<boolean>(false);
  const [alertSubmissionIsOpen, setAlertSubmissionIsOpen] = useState<boolean>(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch>({} as Batch);
  const [batchAttendanceIsOpen, setBatchAttendanceIsOpen] = useState<boolean>(false);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [batches, setBatches] = useState<Array<Batch>>([]);
  const { columns, id, hasFetchedBatches, setHasFetchedBatches, setId } = useRecentDataTable();
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
      const { data } = await axios.get(`${url}/training/${id}`, { withCredentials: true });

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

      return data;
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
      try {
        const { data } = (await axios.get(`${url}/training/${id}/batch`, { withCredentials: true })) as any;
        let updatedSelectedEmployees: BatchEmployee[] = [];
        const fetchedBatches = data.map((batch: Batch) => {
          if (batch.employees.length > 0) updatedSelectedEmployees.push(...batch.employees);
          return {
            batchNumber: batch.batchNumber,

            trainingDate: {
              from: dayjs(batch.trainingDate.from).format("YYYY-MM-DD hh:mm"),
              to: dayjs(batch.trainingDate.to).format("YYYY-MM-DD hh:mm"),
            },
            isOneDayTraining:
              dayjs(batch.trainingDate.from).isSame(dayjs(batch.trainingDate.to), "day") === true ? true : false,
            employees: batch.employees,
          };
        });

        // set fetched batches to true
        setHasFetchedBatches(true);
        setBatches(fetchedBatches);

        // setTotalSelectedEmployees(updatedSelectedEmployees.sort((a, b) => (a.name > b.name ? 1 : -1)));
        // setEmployeePool([]);

        return batches;
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <>
      <OnGoingContext.Provider
        value={{
          id,
          batches,
          selectedBatch,
          batchAttendanceIsOpen,
          hasFetchedBatches,
          slideOverIsOpen,
          alertSubmissionIsOpen,
          toastIsOpen,
          toastType,
          setToastIsOpen,
          setToastOptions,
          setToastType,
          setAlertSubmissionIsOpen,
          setSlideOverIsOpen,
          setHasFetchedBatches,
          setBatchAttendanceIsOpen,
          setSelectedBatch,
          setBatches,
        }}
      >
        <DataTable<TrainingNotice>
          datasource={`${url}/training/ongoing`}
          queryKey={["on-going-training"]}
          columns={columns}
          title="On-Going Trainings"
          subtitle="Trainings in progress"
          onRowClick={(row) => {
            setSlideOverIsOpen(true);
            setId(row.original.id);
          }}
        />
        <OngoingSlideOver />
        <OngoingAlertSubmission />
        <OngoingToastComponent />
      </OnGoingContext.Provider>
    </>
  );
};
