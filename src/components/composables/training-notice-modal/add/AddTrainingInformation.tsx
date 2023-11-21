"use client";

import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Tag, useTrainingNoticeModalStore, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { url } from "@lms/utilities/url/api-url";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import Select from "react-select";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";

const schema = yup.object({
  selectedTags: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
      })
    )
    .label("Training Tag/Tags")
    .required(),
  numberOfParticipants: yup
    .number()
    .typeError("Number of participants should not be empty")
    .min(1, "Cannot start the training without any participants")
    .nullable()
    .required(),
  trainingStart: yup
    .string()
    .label("Date start")
    .trim()
    .notRequired()
    .test("DS", "Date is not permissible", (value) => {
      if (!isEmpty(value)) {
        return dayjs().diff(dayjs(value), "day") <= 0;
      } else return true;
    }),
  trainingEnd: yup
    .string()
    .label("Date end")
    .test({
      name: "min",
      exclusive: false,
      params: {},
      message: "Date is not permissible",
      test: function (value) {
        if (!isEmpty(value)) {
          return value! >= this.parent.trainingStart && dayjs().diff(dayjs(value), "day") <= 0;
        } else return true;
      },
    })
    .notRequired(),
  numberOfHours: yup
    .number()
    .nullable()
    .notRequired()
    .transform((v, o) => (o === !Number.isNaN(o) || o === undefined || o === "" ? null : v))
    .test({
      name: "min",
      exclusive: false,
      params: {},
      message: "Invalid number of hours",
      test: function (value) {
        if (value !== null && value !== 0) return value! >= 1;
        else if (value === 0) return true;
        else return true;
      },
    }),
  location: yup.string().label("Location").required("Please input location"),
});

export const AddTrainingInformation: FunctionComponent = () => {
  const [searchTag, setSearchTag] = useState("");
  const location = useTrainingNoticeStore((state) => state.location);
  const trainingEnd = useTrainingNoticeStore((state) => state.trainingEnd);
  const numberOfHours = useTrainingNoticeStore((state) => state.numberOfHours);
  const trainingStart = useTrainingNoticeStore((state) => state.trainingStart);
  const [trainingTags, setTrainingTags] = useState<Tag[]>([]);
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const setSelectedTags = useTrainingNoticeStore((state) => state.setSelectedTags);
  const setLocation = useTrainingNoticeStore((state) => state.setLocation);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const setNumberOfHours = useTrainingNoticeStore((state) => state.setNumberOfHours);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setHasFetchedRecommendations = useTrainingNoticeStore((state) => state.setHasFetchedRecommendations);
  const setPage = useTrainingNoticeModalStore((state) => state.setPage);
  const isOnline = useTrainingNoticeStore((state) => state.isOnline);
  const setIsOnline = useTrainingNoticeStore((state) => state.setIsOnline);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const filteredTags =
    searchTag === ""
      ? trainingTags
      : trainingTags.filter((element) => element.name.toLowerCase().includes(searchTag.toLowerCase()));

  // on submit
  const onSubmit = () => {
    setPage(5);
  };

  useEffect(() => {
    const getTags = async () => {
      const result = await axios.get(`${url}/tags?limit=500`);

      setTrainingTags(result.data.items);
    };

    getTags();
    register("selectedTags");
  }, []);

  // set the value of tag to react form
  useEffect(() => {
    if (selectedTags.length > 0) {
      setValue("selectedTags", selectedTags);

      clearErrors("selectedTags");
    } else if (selectedTags.length === 0) {
      setValue("selectedTags", undefined!);
    }
  }, [selectedTags]);

  useEffect(() => {
    if (isOnline) {
      setValue("location", "Online");
      setLocation("Online");
      clearErrors("location");
    }
  }, [isOnline]);

  return (
    <>
      <form id="trainingInformationForm" key="trainingInformationForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-1">
          <div className="mt-1 mb-4">
            <div className="mb-2">
              <label htmlFor="keyword" className="block text-xs font-medium text-gray-700">
                Keyword <span className="text-red-600 text-md">*</span>
              </label>
              <p className="text-xs text-gray-500">
                Tag this training to a certain keyword to identify recommended personnel.
              </p>
            </div>
            {/* {errors?.selectedTags ? errors?.selectedTags.message : undefined} */}
            <div className="text-xs text-red-600">
              {!isEmpty(errors?.selectedTags) ? errors.selectedTags?.message : undefined}
            </div>
            <div className="flex w-full gap-2">
              <div className="flex-1 ">
                <Select
                  id="customReactSelectTags"
                  className="basic-multi-select"
                  classNamePrefix="select2-selection"
                  value={selectedTags.map((tag) => {
                    return { value: tag.id, label: tag.name };
                  })}
                  onChange={(value) => {
                    setSelectedTags(
                      value.map((tags) => {
                        return { id: tags.value, name: tags.label };
                      })
                    );

                    setHasFetchedRecommendations(false);
                  }}
                  closeMenuOnSelect={false}
                  options={trainingTags.map((tag) => {
                    return { value: tag.id, label: tag.name };
                  })}
                  isMulti
                />
              </div>
            </div>
          </div>

          <div className="mt-1 mb-4">
            <div className="mb-2">
              <label htmlFor="no-of-participants" className="block text-xs font-medium text-gray-700">
                No. of participants <span className="text-red-600 text-md">*</span>
              </label>
              <p className="text-xs text-gray-500">The total number of persons who will take part of the training.</p>
            </div>
            <Input
              color={!isEmpty(errors.numberOfParticipants) ? "error" : "primary"}
              helperText={errors.numberOfParticipants ? errors.numberOfParticipants?.message : undefined}
              {...register("numberOfParticipants", {
                value: numberOfParticipants,
                onChange: (e) => setNumberOfParticipants(Number(e.target.value)),
              })}
              type="number"
              id="no-of-participants"
              placeholder="Please indicate the training's duration in hours"
              size="small"
              className="placeholder:text-xs"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="from" className="block text-xs font-medium text-gray-700">
              Inclusive dates
              {/* <span className="text-red-600 text-md">*</span> */}
            </label>
            <p className="text-xs text-gray-500">The specific timeframe during which the training would take place.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-full pb-2 ">
              <div className="flex justify-between gap-2">
                <label htmlFor="from" className="block pl-1 text-xs font-medium text-indigo-700">
                  From
                </label>
                <span className="text-xs text-red-600">
                  {!isEmpty(errors.trainingStart) ? errors.trainingStart?.message : undefined}
                </span>
              </div>
              <input
                id="from"
                {...register("trainingStart", {
                  value: trainingStart,
                  onChange: (e) => setTrainingStart(e.target.value),
                })}
                type="date"
                // className="w-full text-sm text-gray-700 border-gray-200 rounded focus:border-indigo-500 focus:ring-indigo-500"
                className={`block w-full placeholder:text-gray-400  ${
                  errors.trainingStart
                    ? "outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500"
                    : "outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
                }`}
              />
            </div>
            <div className="w-full pb-2">
              <div className="flex justify-between gap-2">
                <label htmlFor="to" className="block pl-1 text-xs font-medium text-indigo-700">
                  To
                </label>
                <span className="text-xs text-red-600">
                  {!isEmpty(errors.trainingEnd) ? errors.trainingEnd?.message : undefined}
                </span>
              </div>
              <input
                id="to"
                {...register("trainingEnd", { value: trainingEnd, onChange: (e) => setTrainingEnd(e.target.value) })}
                type="date"
                className={`mb-1 ${
                  errors.trainingEnd
                    ? "block w-full placeholder:text-gray-400 outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500"
                    : "block w-full placeholder:text-gray-400 outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div className="mb-2">
            <label htmlFor="hrs" className="block text-xs font-medium text-gray-700">
              No. of hours
              {/* <span className="text-red-600 text-md">*</span> */}
            </label>
            <p className="text-xs text-gray-500">The duration or length of the training.</p>
          </div>
          <Input
            type="number"
            id="hrs"
            {...register("numberOfHours", {
              value: numberOfHours,
              onChange: (e) => setNumberOfHours(Number(e.target.value)),
            })}
            placeholder="Please indicate the training's duration in hours"
            size="small"
            className="placeholder:text-xs"
            color={errors.numberOfHours ? "error" : "primary"}
            helperText={!isEmpty(errors.numberOfHours) ? errors.numberOfHours?.message : undefined}
          />
        </div>

        <div className="mt-1">
          <div className="items-center mt-2">
            <label htmlFor="location" className="items-center block text-xs font-medium text-gray-700">
              Location <span className="text-red-600 text-md">*</span>
            </label>
            <div className="flex w-full">
              <div className="w-full text-xs text-gray-500">The designated venue or setting for the training.</div>
              <div className="flex items-center w-auto gap-2 pb-2 text-xs">
                <Checkbox
                  id={`checkboxLocation`}
                  label="Conducted online"
                  checked={isOnline}
                  onChange={(e) => {
                    setIsOnline(!isOnline);
                    if (e.currentTarget.checked === true) {
                      setValue("location", "Online");
                      setLocation("Online");
                      clearErrors("location");
                    } else if (e.currentTarget.checked === false) {
                      setValue("location", "");
                      setLocation("");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {!isOnline ? (
            <textarea
              {...register("location", { value: location, onChange: (e) => setLocation(e.target.value) })}
              id="location"
              style={{ resize: "none" }}
              rows={2}
              placeholder="Please indicate the training's venue"
              // className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md placeholder:text-gray-300 placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500"

              className={`block w-full px-4 py-3 placeholder:text-gray-300 rounded-md  ${
                errors.location
                  ? "outline-none border focus:ring-2 text-sm transition-colors border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500"
                  : "outline-none border focus:ring-2 text-sm transition-colors border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
              }`}
            />
          ) : null}
          <div className="text-xs text-red-600">{!isEmpty(errors.location) ? errors.location?.message : undefined}</div>
          {!isOnline ? (
            <div className="flex items-center float-right gap-2">
              <div className="text-xs text-gray-600">Suggested: </div>
              <button
                tabIndex={-1}
                className="px-1.5 py-0.5 mt-1 bg-orange-200 border border-orange-500 text-orange-700 rounded hover:bg-orange-500 hover:text-white"
                type="button"
                onClick={() => {
                  setLocation(
                    "General Santos City Water District - Training Hall, E. Fernandez St., Lagao, General Santos City"
                  );
                  setValue(
                    "location",
                    "General Santos City Water District - Training Hall, E. Fernandez St., Lagao, General Santos City"
                  );
                  clearErrors("location");
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center gap-1 text-xs text-center transition-all">
                  <span>GSCWD Training Hall</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    className={`w-3 h-3 ${isHovered ? "stroke-orange-800" : "stroke-orange-600"} `}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
};
