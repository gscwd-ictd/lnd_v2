import { create } from "zustand";
import { OthersCategory } from "../types/others";
import { BucketFile, TrainingTypes } from "./training-notice-store";
import { EmployeeFlatWithSupervisor } from "../types/training";

export type TrainingRequirement = {
  document: string;
  isSelected?: boolean;
};

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

export type OthersTrainingTypeState = {
  trainingType: TrainingTypes | undefined;
  setTrainingType: (trainingType: TrainingTypes | undefined) => void;
  reset: () => void;
};

export type OthersState = {
  id: string;
  setId: (id: string) => void;
  description: string;
  setDescription: (description: string) => void;
  initialTitle: string;
  setInitialTitle: (initialTitle: string) => void;
  filesToUpload: Array<File>;
  setFilesToUpload: (filesToUpload: Array<File>) => void;
  bucketFiles: Array<BucketFile>;
  setBucketFiles: (bucketFiles: Array<BucketFile>) => void;
  filesToDelete: Array<BucketFile>;
  setFilesToDelete: (filesToDelete: Array<BucketFile>) => void;
  participants: Array<EmployeeFlatWithSupervisor>;
  setParticipants: (participants: Array<EmployeeFlatWithSupervisor>) => void;
  participantsPool: Array<EmployeeFlatWithSupervisor>;
  setParticipantsPool: (participantsPool: Array<EmployeeFlatWithSupervisor>) => void;
  filteredParticipantsPool: Array<EmployeeFlatWithSupervisor>;
  setFilteredParticipantsPool: (filteredParticipantsPool: Array<EmployeeFlatWithSupervisor>) => void;
  hasFetchedParticipants: boolean;
  setHasFetchedParticipants: (hasFetchedParticipants: boolean) => void;
  hasFetchedFiles: boolean;
  setHasFetchedFiles: (hasFetchedFiles: boolean) => void;
  initialTrainingRequirements: Array<TrainingRequirement>;
  setInitialTrainingRequirements: (initialTrainingRequirements: Array<TrainingRequirement>) => void;
  trainingRequirements: Array<TrainingRequirement>;
  setTrainingRequirements: (trainingRequirements: Array<TrainingRequirement>) => void;
  hasTrainingRequirements: boolean;
  setHasTrainingRequirements: (hasTrainingRequirements: boolean) => void;
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

export const useAddOthersModalStore = create<OthersModalStore>((set) => ({
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

export const useEditOthersModalStore = create<OthersModalStore>((set) => ({
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

type DeleteOthersModalStore = {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
};
export const useDeleteOthersModalStore = create<DeleteOthersModalStore>((set) => ({
  modalIsOpen: false,
  setModalIsOpen: (modalIsOpen: boolean) => set({ modalIsOpen }),
}));

export const useOthersCategoryStore = create<OthersCategoryState>((set) => ({
  category: undefined,
  setCategory: (category) => set({ category }),
}));

export const useOthersTrainingTypeStore = create<OthersTrainingTypeState>((set) => ({
  trainingType: undefined,
  setTrainingType: (trainingType) => set({ trainingType }),
  reset: () => set({ trainingType: undefined }),
}));

export const useOthersStore = create<OthersState>((set) => ({
  id: "",
  setId: (id) => set({ id }),
  description: "",
  setDescription: (description) => set({ description }),
  filesToUpload: [],
  setFilesToUpload: (filesToUpload) => set({ filesToUpload }),
  title: "",
  setTitle: (title) => set({ title }),
  initialTitle: "",
  setInitialTitle: (initialTitle) => set({ initialTitle }),
  filesToDelete: [],
  setFilesToDelete: (filesToDelete) => set({ filesToDelete }),
  dateFrom: "",
  setDateFrom: (dateFrom) => set({ dateFrom }),
  dateTo: "",
  setDateTo: (dateTo) => set({ dateTo }),
  participants: [],
  setParticipants: (participants) => set({ participants }),
  participantsPool: [],
  setParticipantsPool: (participantsPool) => set({ participantsPool }),
  filteredParticipantsPool: [],
  setFilteredParticipantsPool: (filteredParticipantsPool) => set({ filteredParticipantsPool }),
  location: "",
  setLocation: (location) => set({ location }),
  bucketFiles: [],
  setBucketFiles: (bucketFiles) => set({ bucketFiles }),
  action: undefined,
  setAction: (action) => set({ action }),
  hasFetchedFiles: false,
  setHasFetchedFiles: (hasFetchedFiles) => set({ hasFetchedFiles }),
  hasFetchedParticipants: false,
  setHasFetchedParticipants: (hasFetchedParticipants) => set({ hasFetchedParticipants }),
  initialTrainingRequirements: [
    { document: "Attendance", isSelected: true },
    { document: "Certificate of Appearance", isSelected: false },
    { document: "Certificate of Training", isSelected: false },
    { document: "Course Evaluation Report", isSelected: false },
    { document: "Course Materials", isSelected: false },
    { document: "Learning Application Plan", isSelected: false },
    { document: "Post Training Report", isSelected: false },
    { document: "Post-test", isSelected: false },
    { document: "Pre-test", isSelected: false },
    { document: "Program", isSelected: false },
  ],
  setInitialTrainingRequirements: (initialTrainingRequirements) => set({ initialTrainingRequirements }),
  trainingRequirements: [],
  setTrainingRequirements: (trainingRequirements) => set({ trainingRequirements }),
  hasTrainingRequirements: false,
  setHasTrainingRequirements: (hasTrainingRequirements) => set({ hasTrainingRequirements }),
  reset: () =>
    set({
      action: undefined,
      filesToUpload: [],
      description: "",
      title: "",
      dateFrom: "",
      dateTo: "",
      location: "",
      bucketFiles: [],
      filesToDelete: [],
      participants: [],
      participantsPool: [],
      filteredParticipantsPool: [],
      hasFetchedFiles: false,
      hasFetchedParticipants: false,
      hasTrainingRequirements: false,
      initialTrainingRequirements: [],
      trainingRequirements: [],
      id: "",
    }),
}));
