"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useOthersModalStore, useOthersStore } from "@lms/utilities/stores/others-store";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().label("Title").required(),
  dateFrom: yup
    .string()
    .label("Date start")
    .trim()
    .notRequired()
    .test("DS", "Date is not permissible", (value) => {
      if (!isEmpty(value)) {
        return dayjs().diff(dayjs(value), "day") <= 0;
      } else return true;
    }),
  dateTo: yup
    .string()
    .label("Date end")
    .test({
      name: "min",
      exclusive: false,
      params: {},
      message: "Date is not permissible",
      test: function (value) {
        if (!isEmpty(value)) {
          return value! >= this.parent.dateFrom && dayjs().diff(dayjs(value), "day") <= 0;
        } else return true;
      },
    })
    .notRequired(),

  location: yup.string().label("Location").required("Please input location"),
});

export const ActivityDetails: FunctionComponent = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const title = useOthersStore((state) => state.title);
  const dateTo = useOthersStore((state) => state.dateTo);
  const location = useOthersStore((state) => state.location);
  const dateFrom = useOthersStore((state) => state.dateFrom);
  const setTitle = useOthersStore((state) => state.setTitle);
  const setDateTo = useOthersStore((state) => state.setDateTo);
  const setDateFrom = useOthersStore((state) => state.setDateFrom);
  const setLocation = useOthersStore((state) => state.setLocation);
  const setPage = useOthersModalStore((state) => state.setPage);

  const onSubmit = () => {
    setPage(3);
  };

  useEffect(() => {
    if (location === "Online") {
      setIsOnline(true);
    }
  }, [location]);

  return (
    <>
      <form id="othersDetailsForm" key="othersDetailsForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-1 mb-4">
          <div className="mb-2">
            <label htmlFor="course-title" className="block text-xs font-medium text-gray-700">
              Title<span className="text-red-600 text-md">*</span>
            </label>
            <p className="text-xs text-gray-500">
              A concise and descriptive identifier that reflects the content, focus, or objectives.
            </p>
          </div>
          <Input
            {...register("title", { value: title, onChange: (e) => setTitle(e.target.value) })}
            placeholder="Please indicate the activity's title"
            size="small"
            className="placeholder:text-xs"
            autoComplete="off"
            color={!isEmpty(errors.title) ? "error" : "primary"}
            helperText={!isEmpty(errors.title) ? errors.title?.message : undefined}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="from" className="block text-xs font-medium text-gray-700">
            Inclusive dates
          </label>
          <p className="text-xs text-gray-500">The specific timeframe during which the activity would take place.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full pb-2 ">
            <div className="flex justify-between gap-2">
              <label htmlFor="from" className="block pl-1 text-xs font-medium text-indigo-700">
                From <span className="text-red-600 text-md">*</span>
              </label>
              <span className="text-xs text-red-600">
                {!isEmpty(errors.dateFrom) ? errors.dateFrom?.message : undefined}
              </span>
            </div>
            <input
              id="from"
              {...register("dateFrom", {
                value: dateFrom,
                onChange: (e) => {
                  setDateFrom(e.target.value);
                },
              })}
              type="date"
              // className="w-full text-sm text-gray-700 border-gray-200 rounded focus:border-indigo-500 focus:ring-indigo-500"
              className={`block w-full placeholder:text-gray-400  ${
                errors.dateFrom
                  ? "outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500"
                  : "outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
              }`}
            />
          </div>
          <div className="w-full pb-2">
            <div className="flex justify-between gap-2">
              <label htmlFor="to" className="block pl-1 text-xs font-medium text-indigo-700">
                To <span className="text-red-600 text-md">*</span>
              </label>
              <span className="text-xs text-red-600">
                {!isEmpty(errors.dateTo) ? errors.dateTo?.message : undefined}
              </span>
            </div>
            <input
              id="to"
              {...register("dateTo", { value: dateTo, onChange: (e) => setDateTo(e.target.value) })}
              type="date"
              className={`mb-1 ${
                errors.dateTo
                  ? "block w-full placeholder:text-gray-400 outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500"
                  : "block w-full placeholder:text-gray-400 outline-none border focus:ring-2 rounded text-sm transition-colors py-2 px-3 border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
              }`}
            />
          </div>
        </div>

        <div className="mt-1">
          <div className="items-center mt-2">
            <label htmlFor="location" className="block text-xs font-medium text-gray-700">
              Location <span className="text-red-600 text-md">*</span>
            </label>
            <div className="flex w-full gap-2">
              <div className="text-xs text-gray-500">The designated venue or setting for the activity.</div>
              <div className="flex items-center w-auto gap-1 pb-2 text-xs">
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
              placeholder="Please indicate the activity's venue"
              // className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md placeholder:text-gray-300 placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500"

              className={`block w-full px-4 py-3 placeholder:text-gray-300 placeholder:text-xs rounded-md  ${
                errors.location
                  ? "outline-none border focus:ring-2 text-sm transition-colors border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500"
                  : "outline-none border focus:ring-2 text-sm transition-colors border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
              }`}
            />
          ) : null}
          <div className="text-xs text-red-600">{!isEmpty(errors.location) ? errors.location?.message : undefined}</div>
          {/* {!isOnline ? (
            <div className="flex items-center float-right gap-2">
              <div className="text-xs text-gray-600">Suggested: </div>
              <div className="grid grid-cols-3 gap-1">
                <button
                  tabIndex={-1}
                  className="px-1.5 py-0.5 mt-1 bg-orange-200 border border-orange-500 text-orange-700 rounded hover:bg-orange-500 hover:text-white"
                  type="button"
                  onClick={() => {
                    setLocation(
                      "General Santos City Water District - Multi-Purpose Hall, E. Fernandez St., Lagao, General Santos City"
                    );
                    setValue(
                      "location",
                      "General Santos City Water District - Multi-Purpose Hall, E. Fernandez St., Lagao, General Santos City"
                    );
                    clearErrors("location");
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex items-center gap-1 text-xs text-center transition-all">
                    <span>GSCWD Multi-Purpose Hall</span>
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
                <button
                  tabIndex={-1}
                  className="px-1.5 py-0.5 mt-1 bg-indigo-200 border border-indigo-500 text-indigo-700 rounded hover:bg-indigo-500 hover:text-white"
                  type="button"
                  onClick={() => {
                    setLocation(
                      "General Santos City Water District - Orientation Room, E. Fernandez St., Lagao, General Santos City"
                    );
                    setValue(
                      "location",
                      "General Santos City Water District - Orientation Room, E. Fernandez St., Lagao, General Santos City"
                    );
                    clearErrors("location");
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex items-center gap-1 text-xs text-center transition-all">
                    <span>GSCWD Orientation Room</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      className={`w-3 h-3 ${isHovered ? "stroke-indigo-800" : "stroke-indigo-600"} `}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                </button>
                <button
                  tabIndex={-1}
                  className="px-1.5 py-0.5 mt-1 bg-rose-200 border border-rose-500 text-rose-700 rounded hover:bg-rose-500 hover:text-white"
                  type="button"
                  onClick={() => {
                    setLocation(
                      "General Santos City Water District - Board of Directors Room, E. Fernandez St., Lagao, General Santos City"
                    );
                    setValue(
                      "location",
                      "General Santos City Water District - Board of Directors Room, E. Fernandez St., Lagao, General Santos City"
                    );
                    clearErrors("location");
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex items-center gap-1 text-xs text-center transition-all">
                    <span>GSCWD BOD Room</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      className={`w-3 h-3 ${isHovered ? "stroke-rose-800" : "stroke-rose-600"} `}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ) : null} */}
        </div>
      </form>
    </>
  );
};
