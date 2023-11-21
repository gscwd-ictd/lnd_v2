import { TrainingTypeDataTable } from "@lms/components/composables/training-type-data-table/TrainingTypeDataTable";
import { AddTrainingTypeModal } from "../../../components/composables/training-type-modal/AddTrainingTypeModal";
import { TrainingType } from "../../../utilities/types/training-type.type";
import Link from "next/link";

// export const getData = async () => {
//   const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_SERVER}/training-types`);
//   return data as Pagination<TrainingType>;
// };

export default function TrainingType() {
  // const tableData = await getData();

  return (
    <>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <AddTrainingTypeModal />
          <div>
            <ul className="flex items-center gap-1 text-sm">
              <Link href="/trainings/on-going" className="text-gray-700">
                Settings /
              </Link>
              <li className="text-gray-500">Training Type</li>
            </ul>
          </div>
        </div>
        <TrainingTypeDataTable />
      </div>
    </>
  );
}
