import { OnGoingDataTable } from "@lms/components/composables/on-going-data-table/OnGoingDataTable";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";

export default async function OnGoingTrainings() {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-end items-center py-2.5  gap-1 text-sm">
          <BreadCrumbs
            crumbs={[
              { layerText: "Trainings", path: "/trainings/notice" },
              { layerText: "On-going", path: "" },
            ]}
          />
        </div>
        <OnGoingDataTable />
      </div>
    </>
  );
}
