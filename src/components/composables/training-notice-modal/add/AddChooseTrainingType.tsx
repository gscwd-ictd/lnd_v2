"use client";

import { RadioGroup } from "@headlessui/react";
import { getTrainingTypeFromString } from "@lms/utilities/functions/getTrainingTypeFromString";

import { useTrainingNoticeModalStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import { TrainingType } from "@lms/utilities/types/training";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, FunctionComponent, useEffect } from "react";

export const AddChooseTrainingType: FunctionComponent = () => {
  // the state to hold all training type options
  const { trainingTypes } = useTrainingTypesStore();

  const action = useTrainingNoticeModalStore((state) => state.action);

  // the state to hold the selected training type from the options
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);

  useEffect(() => {
    if (action === "create") {
      if (selectedTrainingType === undefined)
        setSelectedTrainingType(getTrainingTypeFromString(trainingTypes[0].value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainingTypes, selectedTrainingType, action]);

  return (
    <>
      <RadioGroup name="type" className="">
        <div className="mt-5 mb-3">
          <RadioGroup.Label as="div">
            <h3>Training Types</h3>
            <p className="text-xs text-gray-500">Choose a training type from the options below</p>
          </RadioGroup.Label>
        </div>
        {trainingTypes.map((type, index) => (
          <RadioGroup.Option key={index} value={type.value} as={Fragment}>
            {({ checked }) => {
              // set checked value if training type from global store is equal to current name
              checked = selectedTrainingType === type.value;

              return (
                <div
                  className={`${
                    checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
                  } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
                  onClick={() => setSelectedTrainingType(getTrainingTypeFromString(type.value))}
                >
                  <p>{type.label}</p>
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
        ))}
      </RadioGroup>
    </>
  );
};
