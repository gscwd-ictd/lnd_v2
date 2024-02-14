"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { EmployeeWithSupervisor, TrainingNotice } from "@lms/utilities/types/training";
import { url } from "@lms/utilities/url/api-url";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useEffect, useState } from "react";
import { useOnGoingDataTable } from "./hooks/use-on-going-data-table";
import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
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
import { OnGoingSlideOverBody } from "../ongoing/slideover/OnGoingSlideOverBody";
import dayjs from "dayjs";

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
};
export const OnGoingContext = createContext({} as OnGoingState);

export const OnGoingDataTable: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch>({} as Batch);
  const [batchAttendanceIsOpen, setBatchAttendanceIsOpen] = useState<boolean>(false);
  const { columns, id, hasFetchedBatches, batches, setHasFetchedBatches, setId, setBatches } = useOnGoingDataTable();
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
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingRequirements = useTrainingNoticeStore((state) => state.setTrainingRequirements);
  const setBucketFiles = useTrainingNoticeStore((state) => state.setBucketFiles);
  const setSelectedTrainingDesign = useTrainingNoticeStore((state) => state.setSelectedTrainingDesign);
  const setCourseContent = useTrainingNoticeStore((state) => state.setCourseContent);

  // per training notice query
  useQuery({
    queryKey: ["view-training-details", id],
    enabled: !!id && open !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/training-details/${id}`)) as any;
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
      try {
        const { data } = (await axios.get(`${url}/training-nominees/${id}/batch`)) as any;
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
          setHasFetchedBatches,
          setBatchAttendanceIsOpen,
          setSelectedBatch,
          setBatches,
        }}
      >
        <SlideOver open={open} setOpen={setOpen} size="lg">
          <SlideOver.Body>
            <OnGoingSlideOverBody />
          </SlideOver.Body>
        </SlideOver>
        <DataTable<TrainingNotice>
          datasource={`${url}/training-details/upcoming`}
          // datasource={`${url}/training-details?page=1&limit=1000`}
          queryKey={["on-going-training"]}
          columns={columns}
          title="On-Going Trainings"
          subtitle="Trainings in progress"
          onRowClick={(row) => {
            setOpen(true);
            setId(row.original.id);
            //! this is a test setting of batches
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
          }}
        />
      </OnGoingContext.Provider>
    </>
  );
};
