import { TrainingTypeDataTable } from "@lms/components/composables/training-type-data-table/TrainingTypeDataTable";
import { AddTrainingTypeModal } from "../../../components/composables/training-type-modal/AddTrainingTypeModal";
import { TrainingType } from "../../../utilities/types/training-type.type";
import Link from "next/link";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";

// export const getData = async () => {
//   const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_SERVER}/training-types`);
//   return data as Pagination<TrainingType>;
// };

export default function TrainingType() {
  // const tableData = await getData();

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center py-2.5 text-sm">
          <AddTrainingTypeModal />
          <BreadCrumbs
            crumbs={[
              { layerText: "Settings", path: "" },
              { layerText: "Training Type", path: "" },
            ]}
          />
        </div>

        <TrainingTypeDataTable />
      </div>
    </>
  );
}
