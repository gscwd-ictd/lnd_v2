import { InputHTMLAttributes } from "react";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "small" | "default" | "large";
  color?: "primary" | "success" | "error";
  helperText?: string;
  
};
