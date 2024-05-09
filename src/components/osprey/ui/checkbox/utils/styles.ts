import cls from "classnames";

export const styles = {
  checkbox: (className?: string, color?: "green" | "indigo" | "red", disabled?: boolean) =>
    cls(
      "transition-colors border-2 border-gray-200 rounded-sm ",
      {
        "cursor-default hover:checked:bg-gray-200 hover:active:bg-gray-200 active:bg-gray-200 hover:bg-gray-200 checked:bg-gray-500 focus:checked:bg-gray-500 focus:ring-gray-500":
          disabled && (color === "green" || color === "indigo" || color === "red"),
        "cursor-pointer hover:checked:bg-green-700 hover:bg-green-300 active:bg-green-600 checked:bg-green-500 focus:checked:bg-green-500 focus:ring-green-500":
          color === "green" && !disabled,
        "cursor-pointer hover:checked:bg-indigo-700 hover:bg-indigo-300 active:bg-indigo-600 checked:bg-indigo-500 focus:checked:bg-indigo-500 focus:ring-indigo-500":
          color === "indigo" && !disabled,
        "cursor-pointer hover:checked:bg-red-700 hover:bg-red-300 active:bg-red-600 checked:bg-red-500 focus:checked:bg-red-500 focus:ring-red-500":
          color === "red" && !disabled,
      },
      className
    ),
};
