import { RecentDataTable } from "@lms/components/composables/recent-data-table/RecentDataTable";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";
import Link from "next/link";

export default async function OnGoingTrainings() {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-end items-center py-2.5  gap-1 text-sm">
          <BreadCrumbs
            crumbs={[
              { layerText: "Trainings", path: "/trainings/notice" },
              { layerText: "Recent", path: "" },
            ]}
          />
        </div>
        <RecentDataTable />
      </div>
    </>
  );
}
