"use client";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Others } from "@lms/utilities/types/others";
import { useOrientationDataTable } from "./hooks/use-others-data-table";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { AddNewOthersModal } from "../modal/AddNewOthersModal";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { useOthersStore } from "@lms/utilities/stores/others-store";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";

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
};

const OthersToastContext = createContext({} as OthersToastState);
const OthersSlideOverContext = createContext({} as SlideOverState);

export const OthersDataTable: FunctionComponent = () => {
  const { columns } = useOrientationDataTable();
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [slideOverIsOpen, setSlideOverIsOpen] = useState<boolean>(false);
  const [hasFetchedParticipants, setHasFetchedParticipants] = useState<boolean>(false);
  const setId = useOthersStore((state) => state.setId);

  return (
    <>
      <OthersSlideOverContext.Provider
        value={{ slideOverIsOpen, hasFetchedParticipants, setHasFetchedParticipants, setSlideOverIsOpen }}
      >
        <OthersToastContext.Provider value={{ toastIsOpen, toastType, setToastIsOpen, setToastType }}>
          <AddNewOthersModal />
          <DataTable<Others>
            datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/default-table`}
            queryKey={["other-activities"]}
            columns={columns}
            title="Orientations, Meetings, and Symposiums"
            subtitle="List of all activities related."
            onRowClick={(row) => {
              setId(row.original.id);
              setSlideOverIsOpen(true);
            }}
          />
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
  const { slideOverIsOpen, hasFetchedParticipants, setHasFetchedParticipants, setSlideOverIsOpen } =
    useContext(OthersSlideOverContext);

  return { slideOverIsOpen, hasFetchedParticipants, setHasFetchedParticipants, setSlideOverIsOpen };
};
