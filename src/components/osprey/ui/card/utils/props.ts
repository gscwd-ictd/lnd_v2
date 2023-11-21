import { HTMLAttributes, ReactNode } from "react";

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  variant?: "default" | "outlined" | undefined;
  children?: ReactNode | ReactNode[];
};

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  startIcon?: ReactNode | ReactNode[];
  title: string;
  subtitle?: string;
  action?: ReactNode | ReactNode[];
};
