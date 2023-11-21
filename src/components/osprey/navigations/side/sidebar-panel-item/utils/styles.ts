import cls from "classnames";

export const styles = {
  panelItem: (selected: boolean) =>
    cls(
      "p-2 flex items-center gap-2 hover:bg-zinc-100 text-sm text-zinc-600 hover:text-zinc-700 border-r-4 hover:border-r-indigo-500",
      {
        "border-r-indigo-500 bg-zinc-100": selected,
        "border-r-transparent": !selected,
      }
    ),
};
