import { create } from "zustand";

export type BenchmarkingModalStore = {
  page: number;
  setPage: (page: number) => void;
  action: "create" | "update" | undefined;
  setAction: (action: "create" | "update" | undefined) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  resetModal: () => void;
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
