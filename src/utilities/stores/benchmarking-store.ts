import { create } from "zustand";
import { EmployeeFlatWithSupervisor } from "../types/training";
import { BucketFile } from "./training-notice-store";
import { BenchmarkingStatus } from "../types/benchmarking";

export type BenchmarkingModalStore = {
  page: number;
  setPage: (page: number) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  resetModal: () => void;
};

export type BenchmarkingState = {
  id: string | null;
  setId: (id: string | null) => void;
  initialTitle: string;
  setInitialTitle: (initialTitle: string) => void;
  title: string;
  setTitle: (title: string) => void;
  partner: string;
  setPartner: (partner: string) => void;
  participants: Array<EmployeeFlatWithSupervisor>;
  setParticipants: (participants: Array<EmployeeFlatWithSupervisor>) => void;
  participantsPool: Array<EmployeeFlatWithSupervisor>;
  setParticipantsPool: (participantsPool: Array<EmployeeFlatWithSupervisor>) => void;
  filteredParticipantsPool: Array<EmployeeFlatWithSupervisor>;
  setFilteredParticipantsPool: (participantsPool: Array<EmployeeFlatWithSupervisor>) => void;
  hasFetchedParticipants: boolean;
  setHasFetchedParticipants: (hasFetchedParticipants: boolean) => void;
  location: string;
  setLocation: (location: string) => void;
  dateFrom: string;
  setDateFrom: (dateFrom: string) => void;
  dateTo: string;
  setDateTo: (dateTo: string) => void;
  filesToUpload: Array<File>;
  setFilesToUpload: (filesToUpload: Array<File>) => void;
  bucketFiles: Array<BucketFile>;
  setBucketFiles: (bucketFiles: Array<BucketFile>) => void;
  filesToDelete: Array<BucketFile>;
  setFilesToDelete: (filesToDelete: Array<BucketFile>) => void;
  action: "create" | "update" | undefined;
  status: BenchmarkingStatus | undefined;
  setStatus: (status: BenchmarkingStatus | undefined) => void;
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
  initialTitle: "",
  setInitialTitle: (initialTitle) => set({ initialTitle }),
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
  dateFrom: "",
  setDateFrom: (dateFrom) => set({ dateFrom }),
  dateTo: "",
  setDateTo: (dateTo) => set({ dateTo }),
  filesToUpload: [],
  setFilesToUpload: (filesToUpload) => set({ filesToUpload }),
  bucketFiles: [],
  setBucketFiles: (bucketFiles) => set({ bucketFiles }),
  filesToDelete: [],
  setFilesToDelete: (filesToDelete) => set({ filesToDelete }),
  participantsPool: [],
  setParticipantsPool: (participantsPool) => set({ participantsPool }),
  filteredParticipantsPool: [],
  setFilteredParticipantsPool: (filteredParticipantsPool) => set({ filteredParticipantsPool }),
  hasFetchedParticipants: false,
  setHasFetchedParticipants: (hasFetchedParticipants) => set({ hasFetchedParticipants }),
  status: undefined,
  setStatus: (status) => set({ status }),
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
      action: undefined,
      initialTitle: "",
      participantsPool: [],
      filteredParticipantsPool: [],
      hasFetchedParticipants: false,
    });
  },
}));

type DeleteBenchmarkingModalState = {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
};
export const useDeleteBenchmarkingModalStore = create<DeleteBenchmarkingModalState>((set) => ({
  modalIsOpen: false,
  setModalIsOpen: (modalIsOpen) => set({ modalIsOpen }),
}));
