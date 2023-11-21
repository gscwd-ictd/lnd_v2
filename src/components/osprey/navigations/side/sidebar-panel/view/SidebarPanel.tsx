import { Fragment, FunctionComponent, useContext } from "react";
import { sidebarItems } from "../../sidebar/constants/sidebar-items";
import { SidebarContext } from "../../sidebar/utils/contexts";
import { SidebarPanelItem } from "../../sidebar-panel-item/view/SidebarPanelItem";
import { SidebarPanelHeader } from "../../sidebar-panel-header/view/SidebarPanelHeader";
import { SidebarPanelFooter } from "../../sidebar-panel-footer/view/SidebarPanelFooter";

export const SidebarPanel: FunctionComponent = () => {
  const { activeNav } = useContext(SidebarContext);

  return (
    <div className="flex-1 bg-white">
      <div className="flex flex-col h-screen overflow-y-auto">
        <SidebarPanelHeader title={sidebarItems[activeNav].header} subtitle={sidebarItems[activeNav].subheader} />

        <main className="flex-auto">
          <ul className="space-y-1">
            {sidebarItems[activeNav].panelItems.map((item, index) => (
              <Fragment key={index}>
                <SidebarPanelItem label={item.label as string} path={item.path}>
                  {item.icon}
                </SidebarPanelItem>
              </Fragment>
            ))}
          </ul>
        </main>

        {/* <SidebarPanelFooter
          photoUrl="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          name="John Doe"
          email="johndoe@gmail.com"
        /> */}
      </div>
    </div>
  );
};
