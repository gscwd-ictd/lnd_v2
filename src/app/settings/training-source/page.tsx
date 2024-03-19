import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";
import { TrainingSourceDataTable } from "./TrainingSourceDataTable";

export default async function TrainingSource() {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-end items-center py-2.5  text-sm">
          <BreadCrumbs
            crumbs={[
              { layerText: "Settings", path: "" },
              { layerText: "Training Source", path: "" },
            ]}
          />
        </div>
        <TrainingSourceDataTable />
      </div>
    </>
  );
}
