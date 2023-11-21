import cls from "classnames";

export const styles = {
  input: (
    className?: string,
    size?: "small" | "default" | "large",
    disabled?: boolean,
    color?: "primary" | "success" | "error"
  ) =>
    cls(
      "block w-full placeholder:text-gray-400 outline-none border focus:ring-2 rounded text-sm transition-colors",
      {
        "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400":
          color === "primary" && !disabled,

        "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100 hover:border-emerald-500":
          color === "success" && !disabled,

        "border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500": color === "error" && !disabled,

        "bg-gray-100 border-gray-100 text-gray-500": disabled,

        "py-2 px-3": size === "small",

        "py-3 px-4": size === "default",

        "py-3 px-4 sm:p-5": size === "large",
      },
      className
    ),

  helperText: (color?: "primary" | "success" | "error") =>
    cls("text-xs ml-1 mt-1", {
      "text-gray-500": color === "primary",
      "text-emerald-500": color == "success",
      "text-red-500": color == "error",
    }),
};
