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
  status: BenchmarkingStatus | undefined;
};

export enum BenchmarkingStatus {
  PENDING = "pending",
  DONE = "done",
}
