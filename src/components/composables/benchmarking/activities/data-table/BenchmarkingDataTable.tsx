"use client";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { useBenchmarkingDataTable } from "./hooks/use-benchmarking-data-table";
import { Benchmarking } from "@lms/utilities/types/benchmarking";
import { url } from "@lms/utilities/url/api-url";
import { EditBenchmarkingModal } from "../modal/EditBenchmarkingModal";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";

type BenchmarkingToastType = {
  toastIsOpen: boolean;
  setToastIsOpen: Dispatch<SetStateAction<boolean>>;
  toastType: ToastType;
  setToastType: Dispatch<SetStateAction<ToastType>>;
};

const BenchmarkingToastContext = createContext({} as BenchmarkingToastType);

export const BenchmarkingDataTable: FunctionComponent = () => {
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  const { columns } = useBenchmarkingDataTable();

  return (
    <>
      <BenchmarkingToastContext.Provider value={{ toastIsOpen, setToastIsOpen, setToastType, toastType }}>
        <DataTable<Benchmarking>
          // datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/default-table`}
          datasource={`${url}/benchmark?page=1&limit=1000`}
          queryKey={["benchmarking-activities"]}
          columns={columns}
          title="Benchmarking Activities"
          subtitle="List of all benchmarking activities "
        />
        <EditBenchmarkingModal />
      </BenchmarkingToastContext.Provider>
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
