import cls from "classnames";

export const styles = {
  navItem: (selected: boolean) =>
    cls(
      "flex items-center justify-center hover:bg-zinc-700/60 p-2 text-zinc-400 hover:text-zinc-50 transition-colors",
      {
        "bg-zinc-700/60 text-zinc-50": selected,
      }
    ),
};
