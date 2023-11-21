"use client";

import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const EducationDetailsInternal: FunctionComponent = () => {
  const education = useLspDetailsStore((state) => state.education);

  return (
    <>
      <p className="text-xs font-medium text-gray-600">Education</p>
      <ul className="space-y-2">
        {education.map((item, index) => (
          <div
            key={index}
            className="text-sm border-l-4 border-l-rose-400 border-y border-r rounded-r grid grid-cols-12"
          >
            <div className="col-span-10 pl-4 py-2">
              <h3 className="font-medium">{item.degree}</h3>
              <p className="text-xs text-gray-500">{item.institution}</p>
            </div>
            <div className="col-span-2 py-2 text-center flex items-start justify-center gap-1"></div>
          </div>
        ))}
      </ul>
    </>
  );
};
