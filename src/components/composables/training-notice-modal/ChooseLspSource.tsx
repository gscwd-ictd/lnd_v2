"use client";

import { RadioGroup } from "@headlessui/react";
import { LspSource, useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import { useTrainingNoticeModalStore, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { Fragment, FunctionComponent, useEffect } from "react";

export const ChooseLspSource: FunctionComponent = () => {
  // the state to hold all training type options

  const action = useTrainingNoticeModalStore((state) => state.action);

  // the state to hold the selected training type from the options
  const lspSource = useLspSourceStore((state) => state.lspSource);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);
  const selectedTrainingSource = useTrainingNoticeStore((state) => state.selectedTrainingSource);
  const setHasSelectedFacilitators = useTrainingNoticeStore((state) => state.setHasSelectedFacilitators);
  const setSelectedFacilitators = useTrainingNoticeStore((state) => state.setSelectedFacilitators);

  useEffect(() => {
    if (action === "update") {
      if (lspSource === undefined && selectedTrainingSource?.name === "Internal") setLspSource(LspSource.INTERNAL);
      else if (lspSource === undefined && selectedTrainingSource?.name === "External") setLspSource(LspSource.EXTERNAL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lspSource, action]);

  return (
    <RadioGroup name="type" className="">
      <div className="mt-5 mb-3">
        <RadioGroup.Label as="div">
          <h3>
            Learning Service Provider Source <span className="text-red-600 text-md">*</span>
          </h3>
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
                setHasSelectedFacilitators(false);
                setSelectedFacilitators([]);
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
                setHasSelectedFacilitators(false);
                setSelectedFacilitators([]);
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
