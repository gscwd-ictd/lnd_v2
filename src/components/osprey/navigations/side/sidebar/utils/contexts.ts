import { createContext } from "react";
import { SidebarContextState } from "./types";

export const SidebarContext = createContext({
  activeNav: 0,
  setActiveNav: (index = 0) => index,
} as SidebarContextState);
