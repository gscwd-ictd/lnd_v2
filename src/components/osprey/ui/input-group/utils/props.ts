import { InputHTMLAttributes, ReactNode } from "react";

export type InputGroupProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "small" | "default" | "large";
  startIcon?: JSX.Element;
  children?: ReactNode | ReactNode[];
};
