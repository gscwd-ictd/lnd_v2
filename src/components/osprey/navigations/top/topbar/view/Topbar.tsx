import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { FunctionComponent } from "react";

export const Topbar: FunctionComponent = () => {
  return (
    <ul className="sticky z-10 flex items-center justify-end w-full gap-2 px-10 bg-white border-b sm:right-0 h-14">
      <li
        role="button"
        className="flex items-center justify-center w-8 h-8 transition-colors rounded hover:bg-gray-100 group"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-700 group-hover:text-gray-800"
        >
          <path
            d="M20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7C14 5.34315 15.3431 4 17 4C18.6569 4 20 5.34315 20 7Z"
            fill="currentColor"
            className="text-rose-500 animate-pulse"
          />
          <path d="M12 6H4V20H18V12H16V18H6V8H12V6Z" fill="currentColor" />
        </svg>
      </li>

      <li role="button">
        <Avatar
          size="sm"
          source="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="avtar"
        />
      </li>
    </ul>
  );
};
