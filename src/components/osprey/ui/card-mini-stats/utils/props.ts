import { HTMLAttributes, ReactNode } from "react";

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  variant?: "default" | "outlined" | undefined;
  children?: ReactNode | ReactNode[];
  icon?: ReactNode | ReactNode[];
  title?: string;
  subtitle?: string;
  content?: ReactNode | ReactNode[];
};

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
};
