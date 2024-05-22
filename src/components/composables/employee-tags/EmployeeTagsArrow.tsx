"use client";
import UseWindowDimensions from "@lms/utilities/functions/WindowDimensions";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

export const EmployeeTagsArrow = () => {
  const { windowWidth } = UseWindowDimensions();
  return (
    <>
      {windowWidth! < 1024 ? (
        <HiOutlineChevronDown className="w-12 h-12 text-indigo-700" />
      ) : (
        <HiOutlineChevronRight className="w-9 h-9 text-indigo-700" />
      )}
    </>
  );
};
