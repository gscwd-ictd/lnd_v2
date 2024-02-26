"use client";

import { FunctionComponent, useContext, useEffect } from "react";
import { SidebarContext } from "../utils/contexts";
import { styles } from "../utils/styles";
import { SidebarNavigation } from "../../sidebar-navigation/view/SidebarNavigation";
import { SidebarPanel } from "../../sidebar-panel/view/SidebarPanel";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../constants/sidebar-items";

export const Sidebar: FunctionComponent = () => {
  //const [activeNav, setActiveNav] = useState(0);
  const { setActiveNav } = useContext(SidebarContext);

  const pathname = usePathname();

  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      item.panelItems.forEach((panelItem) => {
        if (panelItem.path === pathname) {
          setActiveNav(index);
        }
      });
    });
  }, [pathname, setActiveNav]);

  return (
    <aside className={styles.sidebar()}>
      <SidebarNavigation />
      <SidebarPanel />
    </aside>
  );
};
