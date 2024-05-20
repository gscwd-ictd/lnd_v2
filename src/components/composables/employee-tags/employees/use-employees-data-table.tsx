import { EmployeeProps } from "@lms/utilities/types/tags";
import { createColumnHelper } from "@tanstack/react-table";

export const useEmployeesDataTable = () => {
  const helper = createColumnHelper<EmployeeProps>();

  const columns = [
    helper.accessor("fullName", { header: "Name", cell: (info) => info.getValue() }),
    helper.accessor("positionTitle", { header: "Position Title", cell: (info) => info.getValue() }),
  ];

  return { columns };
};
