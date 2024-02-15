"use client";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { User } from "@lms/lib/types/users";
import { useUsersModalStore, useUsersStore } from "@lms/utilities/stores/users-store";
import { createColumnHelper } from "@tanstack/react-table";

export const useUsersDataTable = () => {
  const helper = createColumnHelper<User>();
  const setConfirmRemoveIsOpen = useUsersModalStore((state) => state.setConfirmRemoveIsOpen);
  const setId = useUsersStore((state) => state.setId);

  const columns = [
    helper.accessor("fullName", { cell: (info) => info.getValue(), header: "Full Name " }),
    helper.accessor("positionTitle", { header: "Position Title", cell: (info) => info.getValue() }),
    helper.accessor("employeeId", {
      header: "Actions",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center w-full">
          <Tooltip content="Remove User" withArrow>
            <button
              className="text-gray-800 transition-colors rounded"
              onClick={(e) => {
                e.stopPropagation();
                setId(props.row.original.employeeId);
                setConfirmRemoveIsOpen(true);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Tooltip>
        </div>
      ),
    }),
  ];

  return {
    columns,
  };
};
