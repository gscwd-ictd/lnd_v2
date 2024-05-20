import EmployeeTagList from "@lms/components/composables/employee-tags/EmployeeTagList";
import EmployeeTagTabs from "@lms/components/composables/employee-tags/EmployeeTagTabs";
import EmployeeWithTagsLeft from "@lms/components/composables/employee-tags/EmployeeWithTagsLeft";
import EmployeeWithTagsList from "@lms/components/composables/employee-tags/EmployeeWithTagsList";
import Link from "next/link";

export default function EmployeeTags() {
  return (
    <div className="h-full p-5">
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-3">
          <div>Employees with Tags</div>
          <div>
            <ul className="flex items-center gap-1 text-sm">
              <Link href="/trainings/on-going" className="text-gray-700">
                Settings /
              </Link>
              <li className="text-gray-500">Employees with Tags</li>
            </ul>
          </div>
        </div>
        <div className="flex sm:flex-col lg:flex-row  gap-3 h-full">
          <div className="flex sm:w-full lg:w-1/3">
            {/* <EmployeeTagTabs /> */}
            <EmployeeWithTagsLeft />
          </div>
          <div className="flex sm:w-full lg:w-2/3 p-3 bg-white">
            {/* <EmployeeTagList /> */}
            <EmployeeWithTagsList />
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
