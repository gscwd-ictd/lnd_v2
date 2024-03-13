import cls from "classnames";
import { CardProps } from "./props";
import { HTMLAttributes } from "react";

type CardMiniStatsVariant = Pick<CardProps, "variant" | "className">;

type CardMiniStatsClassName = Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const styles = {
  card: ({ className, variant }: CardMiniStatsVariant) =>
    cls(
      "flex w-full h-full bg-white rounded-md overflow-hidden",
      {
        "border shadow-md ": variant === "default",
        "border-2": variant === "outlined",
      },
      className
    ),
  cardcontent: ({ className }: CardMiniStatsClassName) => cls("flex-1 px-5 mb-5 text-gray-600", className),
};
