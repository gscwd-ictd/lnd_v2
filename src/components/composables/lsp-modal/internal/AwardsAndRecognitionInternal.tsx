"use client";

import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const AwardsAndRecognitionInternal: FunctionComponent = () => {
  const awards = useLspDetailsStore((state) => state.awards);

  return (
    <>
      <p className="text-xs font-medium text-gray-600">Awards & recognitions</p>
      <ul className="space-y-2">
        {awards.length === 0 ? (
          <div className="flex items-center justify-center p-5 rounded bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-400">Nothing to display</h3>
          </div>
        ) : (
          awards.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 text-sm border-l-4 border-r rounded-r border-l-blue-400 border-y"
            >
              <h3 className="col-span-10 py-2 pl-4">{item.name}</h3>
            </div>
          ))
        )}
      </ul>
    </>
  );
};
