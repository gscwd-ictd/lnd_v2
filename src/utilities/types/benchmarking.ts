export type Benchmarking = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  title: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  partner: string;
};
