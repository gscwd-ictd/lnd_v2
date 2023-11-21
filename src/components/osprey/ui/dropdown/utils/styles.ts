import classNames from "classnames";
import cls from "classnames";
import { HTMLAttributes } from "react";

type DropdownClassName = Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const styles = {
  // header: () => {
  //     return cls({
  //         "flex items-start justify-between": withCloseBtn,
  //       });
  //   },
  dropdowncontent: ({ className }: DropdownClassName) => cls("z-40 bg-white shadow-md rounded-lg p-2", className),
  dropdownsubitem: ({ className }: DropdownClassName) => cls("z-40 bg-white shadow-md rounded-lg p-2", className),
};
