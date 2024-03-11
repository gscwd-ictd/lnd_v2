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
};

export enum OthersCategory {
  MEETING = "meeting",
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  SYMPOSIUM = "symposium",
  SEMINAR = "seminar",
}
