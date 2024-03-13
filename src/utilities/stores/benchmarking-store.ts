import { create } from "zustand";
import { Employee } from "./employee-tags-store";
import { EmployeeFlatWithSupervisor } from "../types/training";
import { BucketFile } from "./training-notice-store";

export type BenchmarkingModalStore = {
  page: number;
  setPage: (page: number) => void;
  action: "create" | "update" | undefined;
  setAction: (action: "create" | "update" | undefined) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  resetModal: () => void;
};

export type BenchmarkingState = {
  id: string;
  setId: (id: string) => void;
  title: string;
  setTitle: (title: string) => void;
  partner: string;
  setPartner: (partner: string) => void;
  participants: Array<EmployeeFlatWithSupervisor>;
  setParticipants: (participants: Array<EmployeeFlatWithSupervisor>) => void;
  location: string;
  setLocation: (location: string) => void;
  dateFrom: string;
  setDateFrom: (dateFrom: string) => void;
  dateTo: string;
  setDateTo: (dateTo: string) => void;
  filesToUpload: Array<File>;
  setFilesToUpload: (filesToUpload: Array<File>) => void;
  bucketFiles: Array<BucketFile>;
  setBucketFIles: (bucketFiles: Array<BucketFile>) => void;
  reset: () => void;
};

export const useBenchmarkingModalStore = create<BenchmarkingModalStore>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  action: undefined,
  setAction: (action: "create" | "update" | undefined) => set({ action }),
  modalIsOpen: false,
  setModalIsOpen: (modalIsOpen: boolean) => set({ modalIsOpen }),
  resetModal: () => {
    set({
      modalIsOpen: false,
      action: undefined,
      page: 1,
    });
  },
}));

export const useBenchmarkingStore = create<BenchmarkingState>((set) => ({
  id: "",
  setId: (id) => set({ id }),
  title: "",
  setTitle: (title) => set({ title }),
  partner: "",
  setPartner: (partner) => set({ partner }),
  participants: [],
  setParticipants: (participants) => set({ participants }),
  location: "",
  setLocation: (location) => set({ location }),
  dateFrom: "",
  setDateFrom: (dateFrom) => set({ dateFrom }),
  dateTo: "",
  setDateTo: (dateTo) => set({ dateTo }),
  filesToUpload: [],
  setFilesToUpload: (filesToUpload) => set({ filesToUpload }),
  bucketFiles: [],
  setBucketFIles: (bucketFiles) => set({ bucketFiles }),
  reset: () => {
    set({
      id: "",
      location: "",
      title: "",
      participants: [],
      partner: "",
      dateFrom: "",
      dateTo: "",
      filesToUpload: [],
    });
  },
}));
