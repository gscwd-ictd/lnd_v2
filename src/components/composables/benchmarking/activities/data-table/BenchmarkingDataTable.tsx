"use client";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { useBenchmarkingDataTable } from "./hooks/use-benchmarking-data-table";
import { Benchmarking } from "@lms/utilities/types/benchmarking";
import { url } from "@lms/utilities/url/api-url";
import { EditBenchmarkingModal } from "../modal/EditBenchmarkingModal";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { DeleteBenchmarkingModal } from "../modal/DeleteBenchmarkingModal";
import { BenchmarkingSlideOver } from "../slideover/BenchmarkingSlideOver";
import { useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { AddNewBenchmarkingModal } from "../modal/AddNewBenchmarkingModal";
import { BenchmarkingRequirementsModal } from "../modal/BenchmarkingRequirementsModal";
import { EmployeeFlatWithSupervisor } from "@lms/utilities/types/training";

type BenchmarkingToastState = {
  toastIsOpen: boolean;
  setToastIsOpen: Dispatch<SetStateAction<boolean>>;
  toastType: ToastType;
  setToastType: Dispatch<SetStateAction<ToastType>>;
};

type SlideOverState = {
  id: string | null;
  slideOverIsOpen: boolean;
  setSlideOverIsOpen: Dispatch<SetStateAction<boolean>>;
  hasFetchedParticipants: boolean;
  setHasFetchedParticipants: Dispatch<SetStateAction<boolean>>;
  participantsModalIsOpen: boolean;
  setParticipantsModalIsOpen: Dispatch<SetStateAction<boolean>>;
  participantsWithRequirements: Array<EmployeeFlatWithSupervisor>;
  setParticipantsWithRequirements: (participantsWithRequirements: Array<EmployeeFlatWithSupervisor>) => void;
  hasFetchedParticipantsWithRequirements: boolean;
  setHasFetchedParticipantsWithRequirements: (hasFetchedParticipantsWithRequirements: boolean) => void;
};

const BenchmarkingToastContext = createContext({} as BenchmarkingToastState);

const BenchmarkingSlideOverContext = createContext({} as SlideOverState);

export const BenchmarkingDataTable: FunctionComponent = () => {
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [slideOverIsOpen, setSlideOverIsOpen] = useState<boolean>(false);
  const [hasFetchedParticipants, setHasFetchedParticipants] = useState<boolean>(false);
  const setId = useBenchmarkingStore((state) => state.setId);
  const [participantsModalIsOpen, setParticipantsModalIsOpen] = useState<boolean>(false);
  const [participantsWithRequirements, setParticipantsWithRequirements] = useState<Array<EmployeeFlatWithSupervisor>>(
    []
  );
  const setTitle = useBenchmarkingStore((state) => state.setTitle);
  const setPartner = useBenchmarkingStore((state) => state.setPartner);
  const setLocation = useBenchmarkingStore((state) => state.setLocation);
  const setDateFrom = useBenchmarkingStore((state) => state.setDateFrom);
  const setDateTo = useBenchmarkingStore((state) => state.setDateTo);

  const [hasFetchedParticipantsWithRequirements, setHasFetchedParticipantsWithRequirements] = useState<boolean>(false);

  const { columns, benchmarkingId } = useBenchmarkingDataTable();

  return (
    <>
      <BenchmarkingSlideOverContext.Provider
        value={{
          id: benchmarkingId,
          slideOverIsOpen,
          hasFetchedParticipants,
          participantsModalIsOpen,
          participantsWithRequirements,
          hasFetchedParticipantsWithRequirements,
          setHasFetchedParticipantsWithRequirements,
          setParticipantsWithRequirements,
          setParticipantsModalIsOpen,
          setHasFetchedParticipants,
          setSlideOverIsOpen,
        }}
      >
        <BenchmarkingToastContext.Provider value={{ toastIsOpen, setToastIsOpen, setToastType, toastType }}>
          <AddNewBenchmarkingModal />
          <DataTable<Benchmarking>
            // datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/default-table`}
            datasource={`${url}/benchmark?page=1&limit=1000`}
            queryKey={["benchmarking-activities"]}
            columns={columns}
            title="Benchmarking Activities"
            subtitle="List of all benchmarking activities "
            onRowClick={(row) => {
              setId(row.original.id);
              setTitle(row.original.title);
              setPartner(row.original.partner);
              setLocation(row.original.location);
              setDateFrom(row.original.dateFrom);
              setDateTo(row.original.dateTo);
              setSlideOverIsOpen(true);
            }}
          />
          <EditBenchmarkingModal />
          <DeleteBenchmarkingModal />
          <BenchmarkingSlideOver />
          <BenchmarkingRequirementsModal />
        </BenchmarkingToastContext.Provider>
      </BenchmarkingSlideOverContext.Provider>
      <Toast
        duration={toastType.color === "danger" ? 2500 : 2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};

// hook for the toast
export const useBenchmarkingToastOptions = () => {
  // use context here
  const { toastType, setToastType, setToastIsOpen, toastIsOpen } = useContext(BenchmarkingToastContext);

  // set the toast options here
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };
  return { toastIsOpen, setToastIsOpen, toastType, setToastOptions, setToastType };
};

// hook for the benchmarking slide over
export const useBenchmarkingSlideOver = () => {
  // use context here
  const {
    id,
    slideOverIsOpen,
    hasFetchedParticipants,
    participantsModalIsOpen,
    participantsWithRequirements,
    hasFetchedParticipantsWithRequirements,
    setHasFetchedParticipantsWithRequirements,
    setHasFetchedParticipants,
    setSlideOverIsOpen,
    setParticipantsModalIsOpen,
    setParticipantsWithRequirements,
  } = useContext(BenchmarkingSlideOverContext);

  return {
    id,
    slideOverIsOpen,
    hasFetchedParticipants,
    participantsModalIsOpen,
    participantsWithRequirements,
    hasFetchedParticipantsWithRequirements,
    setHasFetchedParticipantsWithRequirements,
    setParticipantsWithRequirements,
    setParticipantsModalIsOpen,
    setHasFetchedParticipants,
    setSlideOverIsOpen,
  };
};
