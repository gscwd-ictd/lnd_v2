import cls from "classnames";
import { ToastProps } from "./props";

type CustomAlertProps = Pick<ToastProps, "color">;

export const styles = {
  wrapper: ({ color }: CustomAlertProps) =>
    cls("flex md:w-full md:max-w-sm shadow-lg rounded-lg border ", {
      "bg-white": color === "default",
      "bg-teal-100": color === "success",
      "bg-red-100": color === "danger",
      "bg-blue-100": color === "info",
      "bg-orange-100 ": color === "warning",
    }),
  title: ({ color }: CustomAlertProps) =>
    cls("text-sm font-medium ", {
      "text-gray-900": color === "default",
      "text-teal-900": color === "success",
      "text-red-900": color === "danger",
      "text-blue-900": color === "info",
      "text-orange-900 ": color === "warning",
    }),
  // text-gray-700
  description: ({ color }: CustomAlertProps) =>
    cls("mt-1 text-xs  ", {
      "text-gray-700": color === "default",
      "text-teal-800": color === "success",
      "text-red-800": color === "danger",
      "text-blue-800": color === "info",
      "text-orange-800 ": color === "warning",
    }),
  //   root: "z-50 fixed bottom-4 inset-x-4 w-auto md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm shadow-lg rounded-lg bg-white",
  close: "px-3 py-2",
  closeIcon: ({ color }: CustomAlertProps) =>
    cls("w-4 h-4 ", {
      "text-gray-600": color === "default",
      "text-teal-900": color === "success",
      "text-red-900": color === "danger",
      "text-blue-900": color === "info",
      "text-orange-900 ": color === "warning",
    }),
  //   "w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
};
