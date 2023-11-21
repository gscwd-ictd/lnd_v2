// import axios from "axios";
import { TrainingSourceDataTable } from "./TrainingSourceDataTable";
// import { Pagination } from "@lms/utilities/types/table-pagination.type";
// import { TrainingSource } from "@lms/utilities/types/training-source.type";

// export const getData = async () => {
//   const { data } = await axios.get(`http://172.20.110.45:5286/api/lms/v1/training-sources`);
//   return data as Pagination<TrainingSource>;
// };

export default async function TrainingSource() {
  // const tableData = await getData();
  return (
    <>
      <div className="p-5">
        {/* <TrainingSourceDataTable data={tableData.items} /> */}
        <TrainingSourceDataTable />
      </div>
    </>
  );
}
