import { HTMLAttributes } from "react";
import cls from "classnames";
import { BreadCrumbsProps } from "./props";

type BreadCrumbsClassName = Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const styles = {
  breadCrumb: ({ title, crumbs }: BreadCrumbsProps) => cls(),
};
