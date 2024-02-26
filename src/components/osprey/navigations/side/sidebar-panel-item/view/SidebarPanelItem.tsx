"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { styles } from "../utils/styles";

export type SidebarPanelItemProps = {
  label: string;
  path: string;
  children: ReactNode | ReactNode[];
  withIndentation?: boolean;
};

export const SidebarPanelItem: FunctionComponent<SidebarPanelItemProps> = ({
  label,
  path,
  children,
  withIndentation = false,
}) => {
  const [selected, setSelected] = useState(false);
  const pathName = usePathname();

  useEffect(() => setSelected(pathName.split("/")[2] === path.split("/")[2]), [path, pathName]);

  return (
    <Link href={path} className={styles.panelItem(selected, withIndentation)}>
      {withIndentation ? ">" : null}
      <span>{children}</span>
      <p className="text-sm font-medium">{label}</p>
    </Link>
  );
};
