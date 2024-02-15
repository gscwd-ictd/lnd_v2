import { RecentDataTable } from "@lms/components/composables/recent-data-table/RecentDataTable";
import Link from "next/link";

export default async function OnGoingTrainings() {
  return (
    <>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <ul className="flex items-center gap-1 text-sm">
              <Link href="/trainings/on-going" className="text-gray-700">
                Trainings /
              </Link>
              <li className="text-gray-500">Recent</li>
            </ul>
          </div>
        </div>
        <RecentDataTable />
      </div>
    </>
  );
}
