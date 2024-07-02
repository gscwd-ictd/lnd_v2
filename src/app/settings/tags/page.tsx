import { EmployeeTagsArrow } from "@lms/components/composables/employee-tags/EmployeeTagsArrow";
import TagsWithEmployeesLeft from "@lms/components/composables/employee-tags/TagsWithEmployeesLeft";
import TagsWithEmployeesList from "@lms/components/composables/employee-tags/TagsWithEmployeesList";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";
import UseWindowDimensions from "@lms/utilities/functions/WindowDimensions";
import Link from "next/link";

export default function EmployeeTags() {
  return (
    <div className="h-full p-5">
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-3">
          <div>Tags</div>
          <BreadCrumbs
            crumbs={[
              { layerText: "Settings", path: "" },
              { layerText: "Training Tags", path: "/settings/tags" },
              { layerText: "List", path: "" },
            ]}
          />
        </div>
        <div className="flex sm:flex-col lg:flex-row  gap-3 h-full">
          <div className="flex sm:w-full lg:w-5/12">
            {/* <EmployeeTagTabs /> */}
            <TagsWithEmployeesLeft />
          </div>
          <div className="flex sm:w-full lg:w-1/12">
            <div className="place-items-center flex justify-center w-full">
              <EmployeeTagsArrow />
            </div>
          </div>
          <div className="flex sm:w-full lg:w-7/12 p-3 bg-white ">
            {/* <EmployeeTagList /> */}
            <TagsWithEmployeesList />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex">
<div>1</div>
<div className="flex-1 bg-white">2</div>
</div> */
}
