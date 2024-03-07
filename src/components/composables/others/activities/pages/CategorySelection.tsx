"use client";

import { RadioGroup } from "@headlessui/react";
import { useOthersCategoryStore } from "@lms/utilities/stores/others-store";
import { OthersCategory } from "@lms/utilities/types/others";
import { Fragment, FunctionComponent } from "react";

export const OtherCategorySelection: FunctionComponent = () => {
  const category = useOthersCategoryStore((state) => state.category);
  const setCategory = useOthersCategoryStore((state) => state.setCategory);

  return (
    <RadioGroup name="category">
      <div className="mt-5 mb-3">
        <RadioGroup.Label as="div">
          <h3>
            Choose Category <span className="text-red-600 text-md">*</span>
          </h3>
          <p className="text-xs text-gray-500">Select from the list of other activities </p>
        </RadioGroup.Label>
      </div>
      {/* Meeting */}
      <RadioGroup.Option value={OthersCategory.MEETING} as={Fragment}>
        {({ checked }) => {
          checked = category === OthersCategory.MEETING;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setCategory(OthersCategory.MEETING);
              }}
            >
              <p>Meeting</p>
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

      {/* Conference */}
      <RadioGroup.Option value={OthersCategory.CONFERENCE} as={Fragment}>
        {({ checked }) => {
          checked = category === OthersCategory.CONFERENCE;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setCategory(OthersCategory.CONFERENCE);
              }}
            >
              <p>Conference</p>
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

      {/* Workshop */}
      <RadioGroup.Option value={OthersCategory.WORKSHOP} as={Fragment}>
        {({ checked }) => {
          checked = category === OthersCategory.WORKSHOP;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setCategory(OthersCategory.WORKSHOP);
              }}
            >
              <p>Workshop</p>
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

      {/* Symposium */}
      <RadioGroup.Option value={OthersCategory.SYMPOSIUM} as={Fragment}>
        {({ checked }) => {
          checked = category === OthersCategory.SYMPOSIUM;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setCategory(OthersCategory.SYMPOSIUM);
              }}
            >
              <p>Symposium</p>
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

      {/* Seminar */}
      <RadioGroup.Option value={OthersCategory.SEMINAR} as={Fragment}>
        {({ checked }) => {
          checked = category === OthersCategory.SEMINAR;
          return (
            <div
              className={`${
                checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
              } cursor-pointer px-4 py-2 mb-2 border rounded flex items-center justify-between hover:scale-105 transition-transform`}
              onClick={() => {
                setCategory(OthersCategory.SEMINAR);
              }}
            >
              <p>Seminar</p>
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
