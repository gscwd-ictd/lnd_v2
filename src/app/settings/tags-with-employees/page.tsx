import { EmployeeTagsArrow } from "@lms/components/composables/employee-tags/EmployeeTagsArrow";
import TagsWithEmployeesLeft from "@lms/components/composables/employee-tags/TagsWithEmployeesLeft";
import TagsWithEmployeesList from "@lms/components/composables/employee-tags/TagsWithEmployeesList";
import UseWindowDimensions from "@lms/utilities/functions/WindowDimensions";
import Link from "next/link";

export default function EmployeeTags() {
  return (
    <div className="h-full p-5">
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-3">
          <div>Tags with Employees</div>
          <div>
            <ul className="flex items-center gap-1 text-sm">
              <Link href="/trainings/on-going" className="text-gray-700">
                Settings /
              </Link>
              <li className="text-gray-500">Tags with Employees</li>
            </ul>
          </div>
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
