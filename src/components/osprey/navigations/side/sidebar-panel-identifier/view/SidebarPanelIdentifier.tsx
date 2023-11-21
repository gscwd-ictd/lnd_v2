"use client";

import { FunctionComponent, useContext, useEffect } from "react";
import { SidebarContext } from "../../sidebar/utils/contexts";
import { SidebarPanelIdentifierProps } from "../utils/props";

export const SidebarPanelIdentifier: FunctionComponent<SidebarPanelIdentifierProps> = ({ activeNav }) => {
  const { setActiveNav } = useContext(SidebarContext);

  useEffect(() => setActiveNav(activeNav), [setActiveNav, activeNav]);

  return null;
};
