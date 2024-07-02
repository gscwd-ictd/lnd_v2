import { TrainingTypes } from "../stores/training-notice-store";

export type Others = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  title: string;
  description: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  category: OthersCategory;
  orientationId: string;
  status: OthersStatus;
  type: TrainingTypes | undefined;
};

export enum OthersCategory {
  MEETING = "meeting",
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  SYMPOSIUM = "symposium",
  SEMINAR = "seminar",
  CONVENTION = "convention",
  ORIENTATION = "orientation",
}

export enum OthersStatus {
  PENDING = "pending",
  DONE = "done",
}
