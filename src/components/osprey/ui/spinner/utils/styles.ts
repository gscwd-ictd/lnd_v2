import cls from "classnames";

export const styles = {
  spinner: (
    className?: string,
    size?: "small" | "medium" | "large",
    color?: "blue" | "red" | "green",
    borderSize?: number
  ) =>
    cls(
      `border-${borderSize}  animate-spin rounded-full`,
      {
        "border-blue-600 border-r-blue-200": color === "blue",
        "border-red-600 border-r-red-200": color === "red",
        "border-green-600 border-r-green-200": color === "green",
        "w-10 h-10": size === "small",
        "w-15 h-15": size === "medium",
        "w-20 h-20": size === "large",
      },
      className
    ),
};
