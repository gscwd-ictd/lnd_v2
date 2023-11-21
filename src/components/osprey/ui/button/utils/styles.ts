import cls from "classnames";
import { ButtonProps } from "./props";

type CustomButtonProps = Pick<ButtonProps, "variant" | "size" | "color" | "className" | "disabled" | "fluid">;

export const styles = {
  button: ({ color, variant, size, className, disabled, fluid }: CustomButtonProps) =>
    cls(
      "inline-flex justify-center items-center gap-2 rounded-md font-semibold focus:ring-offset-2 transition-all text-sm outline-none focus:ring-2",
      {
        /**
         * variant = solid & color = primary
         */
        "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500 border border-transparent":
          variant === "solid" && color === "primary" && !disabled,

        /**
         * variant = solid & color = warning
         */
        "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 border border-transparent":
          variant === "solid" && color === "warning" && !disabled,

        /**
         * variant = solid & color = danger
         */
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 border border-transparent":
          variant === "solid" && color === "danger" && !disabled,

        "bg-indigo-400 hover:bg-indigo-400 text-white": variant === "solid" && color === "primary" && disabled,

        "bg-orange-300 hover:bg-orange-300 text-white": variant === "solid" && color === "warning" && disabled,

        "bg-red-400 hover:bg-red-400 text-white": variant === "solid" && color === "danger" && disabled,

        /**
         * variant = outline & color = primary
         */
        "text-indigo-500 hover:text-white hover:bg-indigo-500 hover:border-indigo-500 focus:ring-indigo-500 border-2 border-gray-200":
          variant === "outline" && color === "primary",

        /**
         * variant = outline & color = warning
         */
        "text-orange-500 hover:text-white hover:bg-orange-500 hover:border-orange-500 focus:ring-orange-500 border-2 border-gray-200":
          variant === "outline" && color === "warning",

        /**
         * variant = outline & color = danger
         */
        "text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 focus:ring-red-500 border-2 border-gray-200":
          variant === "outline" && color === "danger",

        /**
         * variant = ghost & color = primary
         */
        "border border-transparent font-semibold text-indigo-500 hover:bg-indigo-100 focus:ring-indigo-500":
          variant === "ghost" && color === "primary",

        /**
         * variant = ghost & color = warning
         */
        "border border-transparent font-semibold text-orange-500 hover:bg-orange-100 focus:ring-orange-500":
          variant === "ghost" && color === "warning",

        /**
         * variant = ghost & color = danger
         */
        "border border-transparent font-semibold text-red-500 hover:bg-red-100 focus:ring-red-500":
          variant === "ghost" && color === "danger",

        /**
         * variant = soft & color = primary
         */
        "bg-indigo-100 border border-transparent text-indigo-500 hover:text-white hover:bg-indigo-500 focus:ring-2 ring-offset-white focus:ring-indigo-500":
          variant === "soft" && color === "primary",

        /**
         * variant = soft & color = warning
         */
        "bg-orange-100 border border-transparent text-orange-500 hover:text-white hover:bg-orange-500 focus:ring-2 ring-offset-white focus:ring-orange-500":
          variant === "soft" && color === "warning",

        /**
         * variant = soft & color = danger
         */
        "bg-red-100 border border-transparent text-red-500 hover:text-white hover:bg-red-500 focus:ring-2 ring-offset-white focus:ring-red-500":
          variant === "soft" && color === "danger",

        /**
         * variant = white & color = primary
         */
        "border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-indigo-600":
          variant === "white" && color === "primary",

        /**
         * variant = white & color = warning
         */
        "border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-orange-500":
          variant === "white" && color === "warning",

        /**
         * variant = white & color = danger
         */
        "border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-red-600":
          variant === "white" && color === "danger",

        /**
         * size = small
         */
        "py-2 px-3": size === "small",

        /**
         * size = default
         */
        "py-3 px-4": size === "default",

        /**
         * size = large
         */
        "py-3 px-4 sm:p-5": size === "large",

        "w-full": fluid,
      },
      className
    ),
};
