import { ReactNode } from "react";

export type AlertProps = {
  title: string;
  // content: string;
  color?: "success" | "danger" | "info" | "warning";
  children: ReactNode | ReactNode[];
};
