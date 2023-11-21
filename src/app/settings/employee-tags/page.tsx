import EmployeeTagList from "@lms/components/composables/employee-tags/EmployeeTagList";
import EmployeeTagTabs from "@lms/components/composables/employee-tags/EmployeeTagTabs";
import Link from "next/link";

export default function EmployeeTags() {
  return (
    <div className="h-full p-5">
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-3">
          <div>Employee Tag</div>
          <div>
            <ul className="flex items-center gap-1 text-sm">
              <Link href="/trainings/on-going" className="text-gray-700">
                Settings /
              </Link>
              <li className="text-gray-500">Employee Tags</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 gap-3">
          <div className="flex flex-col w-1/3">
            <EmployeeTagTabs />
          </div>
          <div className="flex flex-1 p-3 bg-white">
            <EmployeeTagList />
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
