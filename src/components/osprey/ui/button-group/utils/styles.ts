import cls from "classnames";
import { ButtonGroupProps } from "./props";

type CustomButtonGroupProps = Pick<ButtonGroupProps, "size" | "className" | "orientation">;

export const styles = {
  buttonGroup: ({ className, orientation }: CustomButtonGroupProps) =>
    cls(
      "w-full rounded-md shadow-sm",
      {
        "inline-flex": orientation === "horizontal",
        "flex flex-col": orientation === "vertical",
      },
      className
    ),

  buttonItem: ({ size, orientation, className }: CustomButtonGroupProps) => {
    return cls(
      "outline-none inline-flex justify-center items-center gap-2 border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm",
      {
        "-ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg": orientation === "horizontal",

        "-mt-px first:rounded-t-md last:rounded-b-md border": orientation === "vertical",

        "py-2 px-4": size === "small",

        "py-2 px-4 sm:p-4": size === "default",

        "py-2 px-4 sm:p-[1.3125rem]": size === "large",
      },
      className
    );
  },
};
