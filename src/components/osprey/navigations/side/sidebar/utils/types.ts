export type NavigationItem = {
  header: string;
  subheader: string;
  tooltip: string;
  icon: JSX.Element;
  panelItems: PanelItem[];
};

export type PanelItem = {
  path: string;
  label?: string;
  withIndentation?: boolean;
  icon?: JSX.Element;
};

export type SidebarItems = NavigationItem[];

export type SidebarContextState = {
  activeNav: number;
  setActiveNav: (index: number) => void;
};
