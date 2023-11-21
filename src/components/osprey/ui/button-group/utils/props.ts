import { HTMLAttributes, ReactNode } from "react";

export type ButtonGroupProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode | ReactNode[];
  size?: "small" | "default" | "large";
  orientation?: "horizontal" | "vertical";
};
