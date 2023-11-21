"use client";

import { Fragment, FunctionComponent, useContext } from "react";
import { sidebarItems } from "../../sidebar/constants/sidebar-items";
import { SidebarNavigationItem } from "../../sidebar-navigation-item/view/SidebarNavigationItem";
import { SidebarContext } from "../../sidebar/utils/contexts";

export const SidebarNavigation: FunctionComponent = () => {
  const { activeNav, setActiveNav } = useContext(SidebarContext);

  return (
    <div className="bg-zinc-800 w-14">
      <ul className="h-full space-y-2 ">
        {sidebarItems.map((item, index) => (
          <Fragment key={index}>
            <SidebarNavigationItem
              selected={index === activeNav}
              path={item.panelItems[0].path}
              tooltip={item.tooltip}
              onSelect={() => setActiveNav(index)}
            >
              {item.icon}
            </SidebarNavigationItem>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
