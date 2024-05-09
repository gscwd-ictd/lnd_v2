import { InputHTMLAttributes } from "react";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  color?: "green" | "indigo" | "red";
};
