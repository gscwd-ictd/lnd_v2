import { FunctionComponent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";

const actionItems = ["View Daily Time Record", "View Leave Ledger"];

type ActionDropdownProps = {
  children: ReactNode | ReactNode[];
};

export const ActionDropdown: FunctionComponent<ActionDropdownProps> = ({ children }) => {
  const router = useRouter();

  return (
    <Popover.Root>
      <Popover.Trigger
        className="h-full select-none border border-gray-200 whitespace-nowrap rounded bg-slate-500 px-3 py-[0.2rem] transition-colors ease-in-out hover:bg-slate-400 active:bg-slate-600"
        asChild
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="text-white">...</span>
      </Popover.Trigger>

      <Popover.Content
        className="transition-all shadow-lg PopoverContent"
        sideOffset={5}
        collisionPadding={20}
        avoidCollisions
        // style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        {children}
      </Popover.Content>
      {/* menu items here */}
    </Popover.Root>
  );
};
