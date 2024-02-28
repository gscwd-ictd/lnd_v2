import { BenchmarkingDataTable } from "@lms/components/composables/benchmarking/schedules/data-table/BenchmarkingDataTable";
import { AddNewBenchmarkingModal } from "@lms/components/composables/benchmarking/schedules/modal/AddNewBenchmarkingModal";

export default function Benchmarking() {
  return (
    <div className="p-5">
      <div className="mb-3">
        <AddNewBenchmarkingModal />
      </div>
      <BenchmarkingDataTable />
    </div>
  );
}
