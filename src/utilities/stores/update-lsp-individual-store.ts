import { create } from "zustand";
import { LearningServiceProvider } from "../types/lsp";

type UpdateLspStore = {
  lsp: LearningServiceProvider | undefined;
  setLsp: (lsp: LearningServiceProvider) => void;
};

export const useUpdateLspIndividualStore = create<UpdateLspStore>((set) => ({
  lsp: undefined,
  setLsp: (lsp) => set({ lsp }),
}));
