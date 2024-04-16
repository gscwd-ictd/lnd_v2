import { create } from "zustand";
import { OthersCategory } from "../types/others";
import { BucketFile } from "./training-notice-store";

export type OthersModalStore = {
  page: number;
  setPage: (page: number) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  resetModal: () => void;
};

export type OthersCategoryState = {
  category: OthersCategory | undefined;
  setCategory: (category: OthersCategory | undefined) => void;
};

export type OthersState = {
  id: string;
  setId: (id: string) => void;
  filesToUpload: Array<File>;
  setFilesToUpload: (filesToUpload: Array<File>) => void;
  bucketFiles: Array<BucketFile>;
  setBucketFIles: (bucketFiles: Array<BucketFile>) => void;
  title: string;
  setTitle: (title: string) => void;
  dateFrom: string;
  setDateFrom: (dateFrom: string) => void;
  dateTo: string;
  setDateTo: (dateTo: string) => void;
  location: string;
  setLocation: (location: string) => void;
  action: "create" | "update" | undefined;
  setAction: (action: "create" | "update" | undefined) => void;
  reset: () => void;
};

export const useOthersModalStore = create<OthersModalStore>((set) => ({
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

export const useOthersCategoryStore = create<OthersCategoryState>((set) => ({
  category: undefined,
  setCategory: (category) => set({ category }),
}));

export const useOthersStore = create<OthersState>((set) => ({
  id: "",
  setId: (id) => set({ id }),
  filesToUpload: [],
  setFilesToUpload: (filesToUpload) => set({ filesToUpload }),
  title: "",
  setTitle: (title) => set({ title }),
  dateFrom: "",
  setDateFrom: (dateFrom) => set({ dateFrom }),
  dateTo: "",
  setDateTo: (dateTo) => set({ dateTo }),
  location: "",
  setLocation: (location) => set({ location }),
  bucketFiles: [],
  setBucketFIles: (bucketFiles) => set({ bucketFiles }),
  action: undefined,
  setAction: (action) => set({ action }),
  reset: () =>
    set({
      action: undefined,
      filesToUpload: [],
      title: "",
      dateFrom: "",
      dateTo: "",
      location: "",
      bucketFiles: [],
      id: "",
    }),
}));
