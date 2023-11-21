import { TagsDataTable } from "@lms/components/composables/tags-data-table/TagsDataTable";
import { AddNewTagModal } from "@lms/components/composables/tags-modal/AddNewTagModal";

import Link from "next/link";

export default function Tags() {
  return (
    <>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <AddNewTagModal />
          <div>
            <ul className="flex items-center gap-1 text-sm">
              <Link href="/trainings/on-going" className="text-gray-700">
                Settings /
              </Link>
              <li className="text-gray-500">Tags</li>
            </ul>
          </div>
        </div>
        <TagsDataTable />
      </div>
    </>
  );
}
