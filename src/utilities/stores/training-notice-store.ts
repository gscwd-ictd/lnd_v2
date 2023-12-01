import { create } from "zustand";
import { CourseContent, TrainingType } from "../types/training";
import { TrainingSource } from "@lms/lib/types/training-source.type";
import { TrainingDesign } from "@lms/lib/types/training-design.type";
import { LspSource } from "./lsp-details-store";
import { devtools } from "zustand/middleware";

export type SelectList = {
  label: string;
  value: string;
};

export const trainingTypesList: Array<{ label: string; value: string }> = [
  { label: "Foundational", value: "foundational" },
  { label: "Technical", value: "technical" },
  { label: "Professional", value: "professional" },
  { label: "Supervisory", value: "supervisory" },
  { label: "Leadership/Managerial", value: "leadership/managerial" },
];

export enum TrainingTypes {
  FOUNDATIONAL = "foundational",
  TECHNICAL = "technical",
  PROFESSIONAL = "professional",
  SUPERVISORY = "supervisory",
  LEADERSHIP_MANAGERIAL = "leadership/managerial",
}

export type NomineeQualification = {
  tag: string;
};

export type TrainingTypesStore = {
  trainingTypes: SelectList[];
  selectedTrainingType: TrainingTypes | undefined;
  setSelectedTrainingType: (selectedTrainingType: TrainingTypes | undefined) => void;
  reset: () => void;
};

export type SelectedTrainingTypeStore = {
  selectedTrainingType: TrainingType | undefined;
  setSelectedTrainingType: (selectedTrainingType: TrainingType | undefined) => void;
};

export type TrainingFacilitator = {
  id: string;
  name: string;
  type: string;
};

export type TrainingFacilitatorWithType = {
  id: string;
  name: string;
  email: string;
  type: "individual" | "organization";
  source: "internal" | "external";
};

export type SelectedTrainingDesign = Pick<TrainingDesign, "id" | "courseTitle"> & {
  updatedAt?: string;
  createdAt?: string;
};
export type Tag = {
  id: string;
  name: string;
};

export type RecommendedEmployee = {
  employeeId: string;
};

export type TrainingRequirement = {
  document: string;
  isSelected?: boolean;
};

export type Recommendation = {
  supervisor: {
    supervisorId: string;
    name?: string;
  };
  employees: { employeeId: string; name?: string; positionTitle?: string }[];
  numberOfSlots: number;
};

export type Batch = {
  number: number;
  date?: string;
  employees: Array<{
    employeeId: string;
    employeeFullName: string;
    supervisor: { supervisorId: string; name: string };
    distributionId: string;
  }>;
};

export type TrainingNoticeModalStore = {
  page: number;
  setPage: (page: number) => void;
  action: "create" | "update" | undefined;
  setAction: (action: "create" | "update" | undefined) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  // confirmCompleteModalIsOpen: boolean;
  // setConfirmCompleteModalIsOpen: (confirmCompleteModalIsOpen: boolean) => void;
  // sendConfirmationModalIsOpen: boolean;
  // setSendConfirmationModalIsOpen: (sendConfirmationModalIsOpen: boolean) => void;
  resetModal: () => void;
};

// external type of course outline page
export type ExternalCourseOutlineValidation = Pick<
  TrainingNoticeStore,
  "courseTitle" | "facilitator" | "courseContent"
>;

// internal type of course outline page
export type InternalCourseOutlineValidation = Pick<TrainingNoticeStore, "facilitator" | "courseContent"> & {
  courseTitle: { id: string; courseTitle: string; createdAt: string; updatedAt: string };
};

// training information type
export type TrainingInformation = Pick<
  TrainingNoticeStore,
  "numberOfParticipants" | "trainingStart" | "trainingEnd" | "numberOfHours" | "location"
>;

export type BucketFile = {
  id: string;
  name: string;
  href: string;
  fileLink: string;
  sizeOriginal: string;
  mimeType: string;
};

export type TrainingNoticeStore = {
  hasSetTrainingRequirements: boolean;
  setHasSetTrainingRequirements: (hasSetTrainingRequirements: boolean) => void;
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
  hasSelectedFacilitators: boolean;
  setHasSelectedFacilitators: (hasSelectedFacilitators: boolean) => void;
  filesToDelete: Array<string>;
  setFilesToDelete: (filesToDelete: Array<string>) => void;
  filesToUpload: Array<File>;
  setFilesToUpload: (filesToUpload: Array<File>) => void;
  bucket: string;
  bucketStrings: Array<string>;
  setBucketStrings: (bucketStrings: Array<string>) => void;
  bucketFiles: Array<BucketFile>;
  setBucketFiles: (bucketFiles: Array<BucketFile>) => void;
  consumedSlots: number;
  setConsumedSlots: (consumedSlots: number) => void;
  selectedTrainingDesign: SelectedTrainingDesign;
  setSelectedTrainingDesign: (selectedTrainingDesign: SelectedTrainingDesign) => void;
  selectedFacilitator: TrainingFacilitator;
  setSelectedFacilitator: (selectedFacilitator: TrainingFacilitator) => void;

  // added
  selectedFacilitators: TrainingFacilitatorWithType[];
  setSelectedFacilitators: (selectedFacilitators: TrainingFacilitatorWithType[] | undefined) => void;

  selectedTags: Tag[];
  setSelectedTags: (selectedTags: Tag[] | undefined) => void;

  facilitators: TrainingFacilitatorWithType[];
  setFacilitators: (facilitators: TrainingFacilitatorWithType[]) => void;

  selectedTag: Tag;
  setSelectedTag: (selectedTag: Tag) => void;
  id: string | null;
  setId: (id: string | null) => void;
  trainingType: string;
  setTrainingType: (trainingType: string) => void;
  trainingSource: string;
  setTrainingSource: (trainingSource: string) => void;
  trainingDesign: SelectedTrainingDesign;
  setTrainingDesign: (trainingDesign: SelectedTrainingDesign) => void;
  lspDetails: string;
  setLspDetails: (lspDetails: string) => void;
  location: string;
  setLocation: (location: string) => void;
  courseTitle: string;
  setCourseTitle: (courseTitle: string) => void;
  facilitator: TrainingFacilitator;
  setFacilitator: (facilitator: TrainingFacilitator) => void;
  trainingStart: string;
  setTrainingStart: (trainingStart: string) => void;
  trainingEnd: string;
  setTrainingEnd: (trainingEnd: string) => void;
  numberOfHours: number;
  setNumberOfHours: (numberOfHours: number) => void;
  courseContent: CourseContent[];
  setCourseContent: (courseContent: CourseContent[]) => void;
  nomineeQualifications: NomineeQualification[];
  setNomineeQualifications: (nomineeQualifications: NomineeQualification[]) => void;
  deadlineForSubmission: string;
  setDeadlineForSubmission: (deadlineForSubmission: string) => void;
  invitationUrl: string;
  setInvitationUrl: (invitationUrl: string) => void;
  numberOfParticipants: number;
  setNumberOfParticipants: (numberOfParticipants: number) => void;
  recommendations: Recommendation[];
  setRecommendations: (recommendations: Recommendation[]) => void;
  slotDistribution: Recommendation[];
  setSlotDistribution: (slotDistribution: Recommendation[]) => void;
  // trainingDocuments: TrainingDocument[];
  // setTrainingDocuments: (trainingDocuments: TrainingDocument[]) => void;
  status: string;
  setStatus: (status: string) => void;
  selectedTrainingSource: TrainingSource;
  setSelectedTrainingSource: (selectedTrainingSource: TrainingSource) => void;
  // initialTrainingDocuments: InitialTrainingDocuments[];
  // setInitialTrainingDocuments: (initialTrainingDocuments: InitialTrainingDocuments[]) => void;
  reset: () => void;
  hasFetchedRecommendations: boolean;
  setHasFetchedRecommendations: (hasFetchedRecommendations: boolean) => void;
  lspSource: LspSource | undefined;
  setLspSource: (lspSource: LspSource | undefined) => void;
  trainingRequirements: TrainingRequirement[];
  setTrainingRequirements: (trainingRequirements: TrainingRequirement[]) => void;
  initialTrainingRequirements: TrainingRequirement[];
  setInitialTrainingRequirements: (initialTrainingRequirements: TrainingRequirement[]) => void;
};

export const useTrainingTypesStore = create<TrainingTypesStore>((set) => ({
  trainingTypes: trainingTypesList,
  selectedTrainingType: undefined,
  setSelectedTrainingType: (selectedTrainingType: TrainingTypes | undefined) => set({ selectedTrainingType }),
  reset: () =>
    set({
      selectedTrainingType: undefined,
      trainingTypes: trainingTypesList,
    }),
}));

export const useTrainingNoticeModalStore = create<TrainingNoticeModalStore>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  action: undefined,
  setAction: (action: "create" | "update" | undefined) => set({ action }),
  modalIsOpen: false,
  setModalIsOpen: (modalIsOpen: boolean) => set({ modalIsOpen }),
  // confirmCompleteModalIsOpen: false,
  // setConfirmCompleteModalIsOpen: (confirmCompleteModalIsOpen) => set({ confirmCompleteModalIsOpen }),
  // sendConfirmationModalIsOpen: false,
  // setSendConfirmationModalIsOpen: (sendConfirmationModalIsOpen) => set({ sendConfirmationModalIsOpen }),

  resetModal: () => {
    set({
      modalIsOpen: false,
      action: undefined,
      page: 1,
      // confirmCompleteModalIsOpen: false,
      // sendConfirmationModalIsOpen: false,
    });
  },
}));

export const useTrainingNoticeStore = create<TrainingNoticeStore>()(
  devtools((set, get) => ({
    hasSetTrainingRequirements: false,
    setHasSetTrainingRequirements: (hasSetTrainingRequirements) => set({ hasSetTrainingRequirements }),
    trainingRequirements: [],
    setTrainingRequirements: (trainingRequirements) => set({ trainingRequirements }),
    isOnline: false,
    setIsOnline: (isOnline) => set({ isOnline }),
    hasSelectedFacilitators: false,
    setHasSelectedFacilitators: (hasSelectedFacilitators) => set({ hasSelectedFacilitators }),
    selectedFacilitators: [],
    selectedTags: [],
    facilitators: [],
    filesToDelete: [],
    setFilesToDelete: (filesToDelete) => set({ filesToDelete }),
    bucketStrings: [],
    setBucketStrings: (bucketStrings: Array<string>) => set({ bucketStrings }),

    setFacilitators: (facilitators) => set({ facilitators }),

    setSelectedFacilitators: (selectedFacilitators) => set({ selectedFacilitators }),
    setSelectedTags: (selectedTags) => set({ selectedTags }),

    bucket: "65234fb1bdf59e72df9d",
    bucketFiles: [],
    filesToUpload: [],
    setFilesToUpload: (filesToUpload: Array<File> | undefined) => set({ filesToUpload }),
    setBucketFiles: (bucketFiles: Array<BucketFile>) => set({ bucketFiles }),
    trainingDesign: { courseTitle: "", id: "" },
    setTrainingDesign: (trainingDesign: SelectedTrainingDesign) => set({ trainingDesign }),
    lspSource: undefined,
    setLspSource: (lspSource: LspSource | undefined) => set({ lspSource }),
    selectedTrainingDesign: { id: "", courseTitle: "" },
    setSelectedTrainingDesign: (selectedTrainingDesign: SelectedTrainingDesign) => set({ selectedTrainingDesign }),
    selectedFacilitator: { id: "", name: "", type: "" } as TrainingFacilitator,
    setSelectedFacilitator: (selectedFacilitator: TrainingFacilitator) => set({ selectedFacilitator }),
    selectedTag: { id: "", name: "" } as Tag,
    setSelectedTag: (selectedTag: Tag) => set({ selectedTag }),
    consumedSlots: 0,
    setConsumedSlots: (consumedSlots: number) => set({ consumedSlots }),
    selectedTrainingSource: {} as TrainingSource,
    setSelectedTrainingSource: (selectedTrainingSource: TrainingSource) => set({ selectedTrainingSource }),
    id: "",
    setId: (id: string | null) => set({ id }),
    trainingType: "",
    setTrainingType: (trainingType) => set({ trainingType }),
    trainingSource: "",
    setTrainingSource: (trainingSource) => set({ trainingSource }),
    hasFetchedRecommendations: false,
    setHasFetchedRecommendations: (hasFetchedRecommendations: boolean) => set({ hasFetchedRecommendations }),
    status: "",
    setStatus: (status: string) => set({ status }),
    lspDetails: "",
    setLspDetails: (lspDetails) => set({ lspDetails }),
    location: "",
    setLocation: (location) => set({ location }),
    courseTitle: "",
    setCourseTitle: (courseTitle) => set({ courseTitle }),
    facilitator: { id: "", name: "", type: "" },
    setFacilitator: (facilitator) => set({ facilitator }),
    trainingStart: "",
    setTrainingStart: (trainingStart) => set({ trainingStart }),
    trainingEnd: "",
    setTrainingEnd: (trainingEnd) => set({ trainingEnd }),
    numberOfHours: 0,
    setNumberOfHours: (numberOfHours) => set({ numberOfHours }),
    courseContent: [],
    setCourseContent: (courseContent) => set({ courseContent }),
    nomineeQualifications: [],
    setNomineeQualifications: (nomineeQualifications) => set({ nomineeQualifications }),
    deadlineForSubmission: "",
    setDeadlineForSubmission: (deadlineForSubmission) => set({ deadlineForSubmission }),
    invitationUrl: "",
    setInvitationUrl: (invitationUrl) => set({ invitationUrl }),
    numberOfParticipants: 0,
    setNumberOfParticipants: (numberOfParticipants) => set({ numberOfParticipants }),

    recommendations: [],
    setRecommendations: (recommendations) => set({ recommendations }),

    slotDistribution: [],
    setSlotDistribution: (slotDistribution: Recommendation[]) => set({ slotDistribution }),

    initialTrainingRequirements: [],
    setInitialTrainingRequirements: (initialTrainingRequirements) => set({ initialTrainingRequirements }),

    // setTrainingDocuments: (trainingDocuments: TrainingDocument[]) => set({ trainingDocuments }),
    reset: () =>
      set({
        hasSetTrainingRequirements: false,
        isOnline: false,
        filesToUpload: [],
        bucketFiles: [],
        selectedTags: [],
        hasSelectedFacilitators: false,
        selectedFacilitators: [],
        selectedFacilitator: { id: "", name: "", type: "" } as TrainingFacilitator,
        consumedSlots: 0,
        trainingDesign: undefined!,
        selectedTrainingDesign: undefined,
        selectedTrainingSource: {} as TrainingSource,
        trainingType: "",
        trainingSource: "",
        status: "",
        lspDetails: "",
        location: "",
        courseTitle: "",
        facilitator: { id: "", name: "", type: "" },
        trainingStart: "",
        trainingEnd: "",
        numberOfHours: 0,
        courseContent: [],
        nomineeQualifications: [],
        deadlineForSubmission: "",
        invitationUrl: "",
        numberOfParticipants: 0,
        recommendations: [],
        slotDistribution: [],
        trainingRequirements: [],
        hasFetchedRecommendations: false,
        initialTrainingRequirements: [],
      }),
  }))
);
