"use client";

import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const CertificationsInternal: FunctionComponent = () => {
  const certifications = useLspDetailsStore((state) => state.certifications);

  return (
    <>
      <p className="text-xs font-medium text-gray-600">Certifications</p>
      <ul className="space-y-2">
        {certifications.length === 0 ? (
          <div className="bg-gray-50 p-5 flex items-center justify-center rounded">
            <h3 className="font-semibold text-gray-400 text-lg">Nothing to display</h3>
          </div>
        ) : (
          certifications.map((item, index) => (
            <div
              key={index}
              className="text-sm border-l-4 border-l-cyan-400 border-y border-r rounded-r grid grid-cols-12"
            >
              <h3 className="col-span-10 pl-4 py-2">{item.name}</h3>
            </div>
          ))
        )}
      </ul>
    </>
  );
};
