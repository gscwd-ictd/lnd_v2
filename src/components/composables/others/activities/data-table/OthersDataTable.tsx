"use client";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Others } from "@lms/utilities/types/others";
import { useOthersDataTable } from "./hooks/use-others-data-table";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { AddNewOthersModal } from "../modal/AddNewOthersModal";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { useOthersCategoryStore, useOthersStore } from "@lms/utilities/stores/others-store";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { EmployeeFlatWithSupervisor } from "@lms/utilities/types/training";
import { OthersSlideOver } from "../slideover/OthersSlideOver";
import { url } from "@lms/utilities/url/api-url";
import { EditOthersModal } from "../modal/EditOthersModal";
import { DeleteOthersModal } from "../modal/DeleteOthersModal";

type OthersToastState = {
  toastIsOpen: boolean;
  setToastIsOpen: Dispatch<SetStateAction<boolean>>;
  toastType: ToastType;
  setToastType: Dispatch<SetStateAction<ToastType>>;
};

type SlideOverState = {
  slideOverIsOpen: boolean;
  setSlideOverIsOpen: Dispatch<SetStateAction<boolean>>;
  hasFetchedParticipants: boolean;
  setHasFetchedParticipants: Dispatch<SetStateAction<boolean>>;
  participantsModalIsOpen: boolean;
  setParticipantsModalIsOpen: (participantsModalIsOpen: boolean) => void;
  participantsWithRequirements: Array<EmployeeFlatWithSupervisor>;
  setParticipantsWithRequirements: (participantsWithRequirements: Array<EmployeeFlatWithSupervisor>) => void;
};

const OthersToastContext = createContext({} as OthersToastState);
const OthersSlideOverContext = createContext({} as SlideOverState);

export const OthersDataTable: FunctionComponent = () => {
  const { columns } = useOthersDataTable();
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [slideOverIsOpen, setSlideOverIsOpen] = useState<boolean>(false);
  const [hasFetchedParticipants, setHasFetchedParticipants] = useState<boolean>(false);
  const [participantsModalIsOpen, setParticipantsModalIsOpen] = useState<boolean>(false);
  const [participantsWithRequirements, setParticipantsWithRequirements] = useState<Array<EmployeeFlatWithSupervisor>>(
    []
  );
  const setId = useOthersStore((state) => state.setId);
  const setTitle = useOthersStore((state) => state.setTitle);
  const setCategory = useOthersCategoryStore((state) => state.setCategory);
  const setLocation = useOthersStore((state) => state.setLocation);
  const setDateFrom = useOthersStore((state) => state.setDateFrom);
  const setDateTo = useOthersStore((state) => state.setDateTo);

  return (
    <>
      <OthersSlideOverContext.Provider
        value={{
          slideOverIsOpen,
          hasFetchedParticipants,
          participantsModalIsOpen,
          participantsWithRequirements,
          setParticipantsModalIsOpen,
          setParticipantsWithRequirements,
          setHasFetchedParticipants,
          setSlideOverIsOpen,
        }}
      >
        <OthersToastContext.Provider value={{ toastIsOpen, toastType, setToastIsOpen, setToastType }}>
          <AddNewOthersModal />
          <DataTable<Others>
            // datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/test-others`}
            datasource={`${url}/other/trainings`}
            queryKey={["other-activities"]}
            columns={columns}
            title="Conventions, Meetings, Orientations, and etc. "
            subtitle="List of all activities related."
            onRowClick={(row) => {
              setId(row.original.id);
              setSlideOverIsOpen(true);
              setTitle(row.original.title);
              setCategory(row.original.category);
              setLocation(row.original.location);
              setDateFrom(row.original.dateFrom);
              setDateTo(row.original.dateTo);
            }}
          />
          <OthersSlideOver />
          <EditOthersModal />
          <DeleteOthersModal />
        </OthersToastContext.Provider>
      </OthersSlideOverContext.Provider>

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

// hook for toast
export const useOthersToastOptions = () => {
  const { toastIsOpen, toastType, setToastIsOpen, setToastType } = useContext(OthersToastContext);

  // set the toast options here
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  return { toastIsOpen, setToastIsOpen, toastType, setToastOptions, setToastType };
};

// hook for slide over
export const useOthersSlideOver = () => {
  const {
    slideOverIsOpen,
    hasFetchedParticipants,
    participantsModalIsOpen,
    participantsWithRequirements,
    setParticipantsModalIsOpen,
    setParticipantsWithRequirements,
    setHasFetchedParticipants,
    setSlideOverIsOpen,
  } = useContext(OthersSlideOverContext);

  return {
    slideOverIsOpen,
    participantsModalIsOpen,
    participantsWithRequirements,
    hasFetchedParticipants,
    setHasFetchedParticipants,
    setSlideOverIsOpen,
    setParticipantsModalIsOpen,
    setParticipantsWithRequirements,
  };
};
