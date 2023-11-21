"use client";

import { FunctionComponent } from "react";
import { SidebarNavigationItemProps } from "../utils/props";
import { styles } from "../utils/styles";
import Link from "next/link";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";

export const SidebarNavigationItem: FunctionComponent<SidebarNavigationItemProps> = ({
  selected,
  path,
  tooltip,
  children,
  onSelect,
}) => {
  return (
    <Tooltip
      content={tooltip}
      side="right"
      sideOffset={0}
      className="p-2 text-xs font-semibold rounded-lg bg-zinc-800 text-zinc-200"
      withArrow
    >
      <Link role="button" href={path} className={styles.navItem(selected)} onClick={(e) => onSelect(e)}>
        {children}
      </Link>
    </Tooltip>
  );
};
