import { ButtonHTMLAttributes } from "react";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & {
  /**
   * custom button props
   */
  variant?: "solid" | "outline" | "ghost" | "soft" | "white";
  size?: "small" | "default" | "large";
  color?: "primary" | "warning" | "danger";
  disabled?: boolean;
  fluid?: boolean;
};
