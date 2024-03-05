import cls from "classnames";

export const styles = {
  spinner: (
    className?: string,
    size?: "xs" | "small" | "medium" | "large",
    color?: "blue" | "red" | "green" | "indigo" | "light",
    borderSize?: number
  ) =>
    cls(
      `border-${borderSize}  animate-spin rounded-full`,
      {
        "border-blue-600 border-r-blue-200": color === "blue",
        "border-red-600 border-r-red-200": color === "red",
        "border-green-600 border-r-green-200": color === "green",
        "border-indigo-600 border-r-indigo-200": color === "indigo",
        "border-indigo-200 border-r-white": color === "light",
        "w-7 h-7": size === "xs",
        "w-10 h-10": size === "small",
        "w-15 h-15": size === "medium",
        "w-20 h-20": size === "large",
      },
      className
    ),
};
