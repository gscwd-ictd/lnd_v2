import { BenchmarkingStatus } from "../types/benchmarking";

export const getBenchmarkingStatusBadgePill = (status: BenchmarkingStatus | undefined) => {
  if (status === BenchmarkingStatus.PENDING) {
    return <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium">Pending</span>;
  } else if (status === BenchmarkingStatus.DONE) {
    return <span className="bg-rose-200 text-rose-600 px-1 py-0.5 text-xs rounded font-medium">Done</span>;
  }
};
