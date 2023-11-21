export type TrainingSource = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  name: string;
};

export type CourseContent = {
  title: string;
};

export enum TrainingPreparationStatus {
  PENDING = "pending",
  ON_GOING_NOMINATION = "on going nomination",
  PDC_APPROVAL = "for pdc approval",
  GM_APPROVAL = "for gm approval",
  NOMINATION_DONE = "nomination done",
  DONE = "done",
}

export enum TrainingStatus {
  UPCOMING = "upcoming",
  ONGOING = "on going",
  COMPLETED = "completed",
}

export enum TrainingNomineeStatus {
  DECLINED = "declined",
  PENDING = "pending",
  ACCEPTED = "accepted",
}

export type EmployeeWithStatus = {
  employeeId: string;
  employeeFullName: string;
  status: TrainingNomineeStatus;
};

export type TrainingNotice = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  lspId: string;
  lspName: string;
  location: string;
  courseTitle: string;
  trainingStart: Date;
  trainingEnd: Date;
  numberOfHours: number;
  courseContent: Array<CourseContent>;
  nomineeQualifications: Array<string>;
  deadlineForSubmission: Date;
  invitationUrl: string;
  numberOfParticipants: number;
  source: "Internal" | "External";
  type: "foundational" | "technical" | "professional" | "supervisory" | "leadership/managerial";
  preparationStatus: TrainingPreparationStatus;
  bucketFiles: Array<string>;
  trainingStatus: TrainingStatus;
};

export type TrainingType = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  name: string;
  description?: string;
};
