import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useBenchmarkingModalStore, useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { FunctionComponent } from "react";
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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const title = useBenchmarkingStore((state) => state.title);
  const dateTo = useBenchmarkingStore((state) => state.dateTo);
  const location = useBenchmarkingStore((state) => state.location);
  const dateFrom = useBenchmarkingStore((state) => state.dateFrom);
  const setPage = useBenchmarkingModalStore((state) => state.setPage);
  const setTitle = useBenchmarkingStore((state) => state.setTitle);
  const setDateTo = useBenchmarkingStore((state) => state.setDateTo);
  const setLocation = useBenchmarkingStore((state) => state.setLocation);
  const setDateFrom = useBenchmarkingStore((state) => state.setDateFrom);

  const onSubmit = () => {
    setPage(2);
  };

  return (
    <>
      <form id="benchmarkDetailsForm" key="benchmarkDetailsForm" onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Please indicate the benchmarking activity's title"
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
          <p className="text-xs text-gray-500">The specific timeframe which the benchmarking would take place.</p>
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
            <div className="flex w-full gap-2 pb-2">
              <div className="text-xs text-gray-500">The designated venue or setting for the activity.</div>
            </div>
          </div>

          <textarea
            {...register("location", { value: location, onChange: (e) => setLocation(e.target.value) })}
            id="location"
            style={{ resize: "none" }}
            rows={2}
            placeholder="Please indicate the place where the benchmarking will be conducted"
            // className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md placeholder:text-gray-300 placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500"

            className={`block w-full px-4 py-3 placeholder:text-gray-300 placeholder:text-xs rounded-md  ${
              errors.location
                ? "outline-none border focus:ring-2 text-sm transition-colors border-red-400 focus:border-red-500 focus:ring-red-100 hover:border-red-500"
                : "outline-none border focus:ring-2 text-sm transition-colors border-gray-200 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
            }`}
          />

          <div className="text-xs text-red-600">{!isEmpty(errors.location) ? errors.location?.message : undefined}</div>
        </div>
      </form>
    </>
  );
};
