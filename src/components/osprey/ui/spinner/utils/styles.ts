import cls from "classnames";

export const styles = {
  spinner: (
    className?: string,
    size?: "small" | "medium" | "large",
    color?: "blue" | "red" | "green",
    borderSize?: number
  ) =>
    cls(
      `border-${borderSize} border-r-transparent animate-spin rounded-full`,
      {
        "border-blue-600": color === "blue",
        "border-red-600": color === "red",
        "border-green-600": color === "green",
        "w-10 h-10": size === "small",
        "w-15 h-15": size === "medium",
        "w-20 h-20": size === "large",
      },
      className
    ),
};
