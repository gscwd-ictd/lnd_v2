"use client";

import { FunctionComponent, useContext } from "react";
import { ToolbarButton } from "../buttons/view/ToolbarButton";
import { ToolbarContext } from "./Toolbar";

export const FormatAlignJustify: FunctionComponent = () => {
  const { editor } = useContext(ToolbarContext);

  return (
    <ToolbarButton
      tooltip="Align Justify (Ctrl + Shift + J)"
      action="align-justify"
      onClick={() =>
        editor?.isActive({ textAlign: "justify" }) === false
          ? editor?.chain().focus().setTextAlign("justify").run()
          : editor?.commands.unsetTextAlign()
      }
      className="border"
    >
      <svg
        width="20"
        height="20"
        className={
          editor?.isActive({ textAlign: "justify" })
            ? "bg-gray-100 rounded-sm fill-gray-900"
            : "bg-transparent  fill-gray-900"
        }
        strokeWidth={0.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4Z" />
        <path d="M4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4Z" />
        <path d="M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14Z" />
        <path d="M4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H4Z" />
      </svg>
    </ToolbarButton>
  );
};
