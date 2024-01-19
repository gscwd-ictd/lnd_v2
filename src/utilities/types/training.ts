import { Recommendation } from "../stores/training-notice-store";

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
  NOMINATION_DONE = "nomination done",
  PDC_APPROVAL = "for pdc approval",
  GM_APPROVAL = "for gm approval",
  FOR_BATCHING = "for batching",
  DONE_BATCHING = "done batching",
  DONE = "done",
}

export enum TrainingStatus {
  UPCOMING = "upcoming",
  ONGOING = "on going",
  REQUIREMENTS_SUBMISSION = "requirements submission",
  COMPLETED = "completed",
}

export enum TrainingNomineeStatus {
  DECLINED = "declined",
  PENDING = "pending",
  ACCEPTED = "accepted",
}

export type EmployeeWithStatus = {
  employeeId: string;
  nomineeId?: string;
  name: string;
  status?: TrainingNomineeStatus;
  remarks?: string | null;
};

export type EmployeeWithSupervisor = EmployeeWithStatus &
  Pick<Recommendation, "supervisor"> & { isOneDayTraining?: boolean };

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
  status: TrainingStatus;
};

export type TrainingType = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  name: string;
  description?: string;
};
