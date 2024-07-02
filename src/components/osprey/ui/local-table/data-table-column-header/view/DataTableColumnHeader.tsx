import { FunctionComponent, ReactNode, createContext, useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { DataTableColumnSearch } from "../../data-table-column-search/view/DataTableColumnSearch";
import { Column } from "@tanstack/react-table";

type DataTableColumnHeaderProps = {
  children: ReactNode | ReactNode[];
  column: Column<any, unknown>;
};

type DataTableColumnHeaderContextState = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const DataTableColumnHeaderContext = createContext({} as DataTableColumnHeaderContextState);

export const DataTableColumnHeader: FunctionComponent<DataTableColumnHeaderProps> = ({ children, column }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="flex items-center gap-1 group select-none text-xs font-semibold text-left text-gray-600 hover:bg-gray-200/50 px-2 py-1 rounded transition-colors">
        {children}
      </Popover.Trigger>

      <AnimatePresence>
        {open ? (
          <Popover.Portal forceMount>
            <Popover.Content
              align="start"
              sideOffset={1}
              className="z-50 bg-white border w-56 rounded-md overflow-x-clip shadow"
              asChild
            >
              <motion.div initial={{ y: -5, opacity: 0 }} animate={{ y: 1, opacity: 1 }} exit={{ y: -5, opacity: 0 }}>
                <DataTableColumnHeaderContext.Provider value={{ open, setOpen }}>
                  <DataTableColumnSearch placeholder="Search" column={column} />
                </DataTableColumnHeaderContext.Provider>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        ) : null}
      </AnimatePresence>
    </Popover.Root>
  );
};
