import cls from "classnames";

export const styles = {
  panelItem: (selected: boolean, withIndentation: boolean) =>
    cls(
      "flex items-center p-2  gap-2 hover:bg-zinc-100 text-sm text-zinc-600 hover:text-zinc-700 border-r-4 hover:border-r-indigo-500",
      {
        "border-r-indigo-500 bg-zinc-100 ": selected && !withIndentation,
        "border-r-transparent": !selected && !withIndentation,
        "pl-4 border-r-indigo-500 bg-zinc-100": selected && withIndentation,
        "pl-4 border-r-transparent ": !selected && withIndentation,
      }
    ),
};
