import { HTMLAttributes } from "react";

type Crumb = {
  layerText: string;
  path: string;
};

export type BreadCrumbsProps = HTMLAttributes<HTMLDivElement> & {
  crumbs: Array<Crumb>;
};
