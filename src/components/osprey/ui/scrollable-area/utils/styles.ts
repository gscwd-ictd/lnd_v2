import cls from "classnames";

export const styles = {
  root: "relative overflow-hidden h-full w-full",
  viewport: "h-full w-full rounded-[inherit]",
  thumb:
    "relative flex-1 rounded-lg bg-midnight-400 hover:bg-midnight-500 transition-colors cursor-pointer dark:bg-midnight-500 dark:hover:bg-midnight-400",
  scrollbar: (orientation: "horizontal" | "vertical") =>
    cls("flex touch-none select-none transition-colors", {
      "h-full w-3 px-1 py-4": orientation === "vertical",
      "h-2.5 p-[3px]": orientation === "horizontal",
    }),
};
