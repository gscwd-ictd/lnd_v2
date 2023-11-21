import cls from "classnames";

export const styles = {
  input: (startIcon?: JSX.Element, size?: "small" | "default" | "large") =>
    cls(
      "block w-full outline-none border focus:ring-2 shadow-sm border-gray-200 rounded-l-md text-sm  focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400 transition-colors",
      {
        "pl-11": startIcon,
        "py-2 px-3 ": size === "small",

        "py-3 px-4": size === "default",

        "py-3 px-4 sm:p-5 sm:pl-11": size === "large",
      }
    ),
  button: (size?: "small" | "default" | "large") =>
    cls(
      "inline-flex flex-shrink-0 justify-center items-center rounded-r-md border border-transparent font-semibold bg-indigo-500 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500  transition-all text-sm",
      {
        "py-2 px-3 ": size === "small",

        "py-3 px-4": size === "default",

        "py-3 px-4 sm:p-5": size === "large",
      }
    ),
};
