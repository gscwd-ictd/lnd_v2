"use client";

import { RadioGroup } from "@headlessui/react";
import {
  LspSource,
  useEmployeeSearchStore,
  useLspDetailsStore,
  useLspSourceStore,
} from "@lms/utilities/stores/lsp-details-store";
import { Fragment, FunctionComponent } from "react";

export const ChooseLspSource: FunctionComponent = () => {
  //const setLspType = useLspTypeStore((state) => state.setLspType);

  const { setEmployeeId, setEmployeePds, setSearchInput } = useEmployeeSearchStore();

  const lspSource = useLspSourceStore((state) => state.lspSource);

  const setLspSource = useLspSourceStore((state) => state.setLspSource);

  const reset = useLspDetailsStore((state) => state.reset);

  return (
    <RadioGroup name="lsp-type">
      <div className="mt-5 mb-3">
        <RadioGroup.Label as="div">
          <h3>Learning Service Provider Source</h3>
          <p className="text-xs text-gray-500">Choose the LSP source from the options below</p>
        </RadioGroup.Label>
      </div>

      <RadioGroup.Option value={LspSource.INTERNAL} as={Fragment}>
        {({ checked }) => {
          checked = lspSource === LspSource.INTERNAL;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setLspSource(LspSource.INTERNAL);
                setEmployeeId(undefined);
                setEmployeePds(undefined);
                setSearchInput("");
                reset();
              }}
            >
              <p>Internal</p>
              {checked && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          );
        }}
      </RadioGroup.Option>
      <RadioGroup.Option value={LspSource.EXTERNAL} as={Fragment}>
        {({ checked }) => {
          checked = lspSource === LspSource.EXTERNAL;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setLspSource(LspSource.EXTERNAL);
                setEmployeeId(undefined);
                setEmployeePds(undefined);
                setSearchInput("");
                reset();
              }}
            >
              <p>External</p>
              {checked && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          );
        }}
      </RadioGroup.Option>
    </RadioGroup>
  );
};
