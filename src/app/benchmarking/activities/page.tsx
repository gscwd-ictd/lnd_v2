import { BenchmarkingDataTable } from "@lms/components/composables/benchmarking/activities/data-table/BenchmarkingDataTable";
import { AddNewBenchmarkingModal } from "@lms/components/composables/benchmarking/activities/modal/AddNewBenchmarkingModal";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { Suspense } from "react";

export default function Benchmarking() {
  return (
    <div className="p-5">
      {/* <div className="mb-3">
        <Suspense
          fallback={
            <div className="w-full justify-center">
              <Spinner />
            </div>
          }
        >
          <AddNewBenchmarkingModal />
        </Suspense>
      </div> */}
      <BenchmarkingDataTable />
    </div>
  );
}
