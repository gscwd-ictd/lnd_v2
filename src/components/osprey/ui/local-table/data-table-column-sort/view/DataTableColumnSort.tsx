"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Column } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type DataTableColumnSortProps<T extends unknown> = {
  column: Column<T>;
};

export const DataTableColumnSort = <T extends unknown>({ column }: DataTableColumnSortProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.75739 10.5858L9.1716 9.17154L12 12L14.8284 9.17157L16.2426 10.5858L12 14.8284L7.75739 10.5858Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
            fill="currentColor"
          />
        </svg>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {open ? (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content align="end" asChild>
              <motion.div
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 1, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                className="z-[200] bg-white border shadow-lg rounded-md overflow-clip"
              >
                <DropdownMenu.Item
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center gap-1  p-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>

                  <p>Sort Ascending</p>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center gap-1 p-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                    />
                  </svg>

                  <p>Sort Descending</p>
                </DropdownMenu.Item>
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        ) : null}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
};
