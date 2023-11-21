import cls from "classnames";
import { ModalSize } from "./types";

export const styles = {
  container: "fixed inset-0 transition-all z-40",
  overlay: "fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-opacity-0",
  content: (size: ModalSize | undefined, center: boolean | undefined) =>
    cls("flex flex-col items-center w-full h-full", {
      "py-5": !center && size !== "full",
      "py-7": center && size !== "full",
      "justify-center": center,
    }),

  motionDiv: (size: ModalSize | undefined, shake: boolean, animate: boolean) => {
    return cls("bg-white z-50 text-midnight-700 flex flex-col dark:bg-midnight-800 dark:text-midnight-200", {
      "rounded-md": size !== "full",
      "animate-shake": shake && animate,
    });
  },

  childrenContainer: "h-full flex flex-col",
  title: "p-4",
  body: "px-4 pb-2 flex-1 overflow-y-auto overflow-clip",
  footer: "px-4 py-2",
};
