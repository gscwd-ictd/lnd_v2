export type Others = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  title: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  category: OthersCategory;
  orientationId: string;
  status: OthersStatus;
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
