"use client";

import { RadioGroup } from "@headlessui/react";
import { useOthersTrainingTypeStore } from "@lms/utilities/stores/others-store";
import { TrainingTypes } from "@lms/utilities/stores/training-notice-store";
import { Fragment, FunctionComponent } from "react";

export const TrainingTypeSelection: FunctionComponent = () => {
  const trainingType = useOthersTrainingTypeStore((state) => state.trainingType);
  const setTrainingType = useOthersTrainingTypeStore((state) => state.setTrainingType);

  return (
    <RadioGroup name="category">
      <div className="mt-5 mb-3">
        <RadioGroup.Label as="div">
          <h3>
            Choose Training Type <span className="text-red-600 text-md">*</span>
          </h3>
          <p className="text-xs text-gray-500">Select from the list of training types </p>
        </RadioGroup.Label>
      </div>

      {/* Conference */}
      <RadioGroup.Option value={TrainingTypes.FOUNDATIONAL} as={Fragment}>
        {({ checked }) => {
          checked = trainingType === TrainingTypes.FOUNDATIONAL;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setTrainingType(TrainingTypes.FOUNDATIONAL);
              }}
            >
              <p>Foundational</p>
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

      {/* Convention */}
      <RadioGroup.Option value={TrainingTypes.TECHNICAL} as={Fragment}>
        {({ checked }) => {
          checked = trainingType === TrainingTypes.TECHNICAL;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setTrainingType(TrainingTypes.TECHNICAL);
              }}
            >
              <p>Technical</p>
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

      {/* Meeting */}
      <RadioGroup.Option value={TrainingTypes.PROFESSIONAL} as={Fragment}>
        {({ checked }) => {
          checked = trainingType === TrainingTypes.PROFESSIONAL;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setTrainingType(TrainingTypes.PROFESSIONAL);
              }}
            >
              <p>Professional</p>
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

      {/* Orientation */}
      <RadioGroup.Option value={TrainingTypes.LEADERSHIP_MANAGERIAL} as={Fragment}>
        {({ checked }) => {
          checked = trainingType === TrainingTypes.LEADERSHIP_MANAGERIAL;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setTrainingType(TrainingTypes.LEADERSHIP_MANAGERIAL);
              }}
            >
              <p>Leadership/Managerial</p>
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
