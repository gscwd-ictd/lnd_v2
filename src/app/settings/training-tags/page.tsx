import { TagsDataTable } from "@lms/components/composables/tags-data-table/TagsDataTable";
import { AddNewTagModal } from "@lms/components/composables/tags-modal/AddNewTagModal";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";

import Link from "next/link";

export default function Tags() {
  return (
    <>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <AddNewTagModal />
          <BreadCrumbs
            crumbs={[
              { layerText: "Settings", path: "" },
              { layerText: "Training Tags", path: "/settings/tags" },
            ]}
          />
        </div>
        <TagsDataTable />
      </div>
    </>
  );
}
