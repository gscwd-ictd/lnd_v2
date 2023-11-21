import { FunctionComponent } from "react";
import { SidebarPanelHeaderProps } from "../utils/props";

export const SidebarPanelHeader: FunctionComponent<SidebarPanelHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="sticky h-16 p-3 ">
      <h3 className="font-bold text-gray-600">{title}</h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </header>
  );
};
