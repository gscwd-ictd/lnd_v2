"use client";

import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const EducationDetailsInternal: FunctionComponent = () => {
  const education = useLspDetailsStore((state) => state.education);

  return (
    <>
      <p className="text-xs font-medium text-gray-600">Education</p>
      <ul className="space-y-2">
        {education.length === 0 ? (
          <div className="flex items-center justify-center p-5 rounded bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-400">Nothing to display</h3>
          </div>
        ) : (
          education.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 text-sm border-l-4 border-r rounded-r border-l-rose-400 border-y"
            >
              <div className="col-span-10 py-2 pl-4">
                <h3 className="font-medium">{item.degree}</h3>
                <p className="text-xs text-gray-500">{item.institution}</p>
              </div>
              <div className="flex items-start justify-center col-span-2 gap-1 py-2 text-center"></div>
            </div>
          ))
        )}
      </ul>
    </>
  );
};
