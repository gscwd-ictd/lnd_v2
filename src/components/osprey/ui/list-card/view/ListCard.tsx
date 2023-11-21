import { forwardRef } from "react";
import { UlProps } from "../utils/props";

export const ListCard = forwardRef<HTMLUListElement, UlProps>(({ children, className, ...props }, ref) => {
  return (
    <ul className="space-y-2" ref={ref} {...props}>
      {/* {items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 text-sm border-l-4 border-r rounded-r border-l-rose-400 border-y">
          <div className="col-span-10 py-2 pl-4">
            <h3 className="font-medium">{item.degree}</h3>
            <p className="text-xs text-gray-500">{item.institution}</p>
          </div>
          <div className="flex items-start justify-center col-span-2 gap-1 py-2 text-center"></div>
        </div>
      ))} */}
    </ul>
  );
});

ListCard.displayName = "ListCard";
