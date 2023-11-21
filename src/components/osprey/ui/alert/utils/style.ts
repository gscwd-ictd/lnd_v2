import cls from "classnames";
import { AlertProps } from "./props";

type CustomAlertProps = Pick<AlertProps, "color">;

export const styles = {
  alert: ({ color }: CustomAlertProps) =>
    cls("px-4 py-3 rounded relative shadow-md", {
      "bg-teal-100  text-teal-700": color === "success",
      "bg-red-100  text-red-700": color === "danger",
      "bg-blue-100  text-blue-700": color === "info",
      "bg-orange-100  text-orange-700": color === "warning",
    }),
};
