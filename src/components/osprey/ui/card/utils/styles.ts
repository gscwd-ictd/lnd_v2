import cls from "classnames";
import { CardProps } from "./props";
import { HTMLAttributes } from "react";

type CardVariant = Pick<CardProps, "variant" | "className">;

type CardClassName = Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const styles = {
  card: ({ className, variant }: CardVariant) =>
    cls(
      "flex flex-col bg-white rounded-lg",
      {
        "border shadow-md ": variant === "default",
        "border-2": variant === "outlined",
      },
      className
    ),
  cardcontent: ({ className }: CardClassName) => cls("flex-1 px-5 mb-5 text-gray-600", className),
  cardactions: ({ className }: CardClassName) => cls("px-5 pb-5", className),
};
