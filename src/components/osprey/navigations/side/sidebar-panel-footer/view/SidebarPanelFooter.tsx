import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { FunctionComponent } from "react";
import { SidebarPanelFooterProps } from "../utils/props";

export const SidebarPanelFooter: FunctionComponent<SidebarPanelFooterProps> = ({ photoUrl, name, email }) => {
  return (
    <footer className="flex items-center gap-2 p-2 border-t">
      <Avatar source={photoUrl} alt="user" size="sm" />
      <div className="flex flex-col w-36">
        <h3 className="text-xs font-semibold text-zinc-600">{name}</h3>
        <p className="text-xs truncate text-zinc-500">{email}</p>
      </div>
    </footer>
  );
};
