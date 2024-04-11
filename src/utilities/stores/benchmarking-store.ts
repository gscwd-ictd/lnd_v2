import { create } from "zustand";
import { Employee } from "./employee-tags-store";
import { EmployeeFlatWithSupervisor } from "../types/training";
import { BucketFile } from "./training-notice-store";

export type BenchmarkingModalStore = {
  page: number;
  setPage: (page: number) => void;
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
  dateStarted: string;
  setDateStarted: (dateFrom: string) => void;
  dateEnd: string;
  setDateEnd: (dateTo: string) => void;
  filesToUpload: Array<File>;
  setFilesToUpload: (filesToUpload: Array<File>) => void;
  bucketFiles: Array<BucketFile>;
  setBucketFiles: (bucketFiles: Array<BucketFile>) => void;
  filesToDelete: Array<string>;
  setFilesToDelete: (filesToDelete: Array<string>) => void;
  action: "create" | "update" | undefined;
  setAction: (action: "create" | "update" | undefined) => void;
  reset: () => void;
};

export const useAddBenchmarkingModalStore = create<BenchmarkingModalStore>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  modalIsOpen: false,
  setModalIsOpen: (modalIsOpen: boolean) => set({ modalIsOpen }),
  resetModal: () => {
    set({
      modalIsOpen: false,
      page: 1,
    });
  },
}));

export const useEditBenchmarkingModalStore = create<
  BenchmarkingModalStore & { hasFetchedFiles: boolean; setHasFetchedFiles: (hasFetchedFiles: boolean) => void }
>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
  hasFetchedFiles: false,
  setHasFetchedFiles: (hasFetchedFiles) => set({ hasFetchedFiles }),
  modalIsOpen: false,
  setModalIsOpen: (modalIsOpen) => set({ modalIsOpen }),
  resetModal: () => {
    set({
      modalIsOpen: false,
      page: 1,
      hasFetchedFiles: false,
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
  action: undefined,
  setAction: (action) => set({ action }),
  participants: [],
  setParticipants: (participants) => set({ participants }),
  location: "",
  setLocation: (location) => set({ location }),
  dateStarted: "",
  setDateStarted: (dateStarted) => set({ dateStarted }),
  dateEnd: "",
  setDateEnd: (dateEnd) => set({ dateEnd }),
  filesToUpload: [],
  setFilesToUpload: (filesToUpload) => set({ filesToUpload }),
  bucketFiles: [],
  setBucketFiles: (bucketFiles) => set({ bucketFiles }),
  filesToDelete: [],
  setFilesToDelete: (filesToDelete) => set({ filesToDelete }),
  reset: () => {
    set({
      id: "",
      location: "",
      title: "",
      participants: [],
      partner: "",
      dateStarted: "",
      dateEnd: "",
      filesToUpload: [],
      action: undefined,
    });
  },
}));
