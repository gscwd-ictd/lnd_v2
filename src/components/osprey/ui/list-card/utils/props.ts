import { HTMLAttributes } from "react";

export type UlProps = Omit<HTMLAttributes<HTMLUListElement>, "disabled"> & {
  /**
   * UL Props
   */

  variant?: "solid" | "outline" | "ghost" | "soft" | "white";
  size?: "small" | "default" | "large";
  color?: "skyblue" | "rose" | "yellow-orange" | "lavender" | "violet" | "teal" | "cyan";
  disabled?: boolean;
};
