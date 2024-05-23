import { create } from "zustand";

type RankingStore = {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
};

export const useRankingStore = create<RankingStore>((set) => ({
  modalIsOpen: false,
  setModalIsOpen: (modalIsOpen) => set({ modalIsOpen }),
}));
