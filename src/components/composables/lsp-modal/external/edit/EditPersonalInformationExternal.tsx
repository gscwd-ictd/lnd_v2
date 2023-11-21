"use client";

import { RadioGroup } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Sex, useEditLspModalStore, useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { isEmpty, trim } from "lodash";
import { Fragment, FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().trim().label("First name").required(),
  middleName: yup.string().label("Middle name").trim().required(),
  lastName: yup.string().trim().label("Last name").required(),
  prefixName: yup.string().nullable().trim().notRequired(),
  suffixName: yup.string().nullable().trim().notRequired(),
  extensionName: yup.string().nullable().label("Extension Name").trim().notRequired(),
  experience: yup.number().min(0).required(),
  sex: yup.string().label("Sex").required(),
  introduction: yup.string().trim().label("Introduction").required(),
});

export const EditPersonalInformationExternal: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const extensionName = useLspDetailsStore((state) => state.extensionName);
  const setExtensionName = useLspDetailsStore((state) => state.setExtensionName);

  const prefixName = useLspDetailsStore((state) => state.prefixName);
  const setPrefixName = useLspDetailsStore((state) => state.setPrefixName);

  const suffixName = useLspDetailsStore((state) => state.suffixName);
  const setSuffixName = useLspDetailsStore((state) => state.setSuffixName);

  const fname = useLspDetailsStore((state) => state.firstName);
  const setFname = useLspDetailsStore((state) => state.setFirstName);

  const mname = useLspDetailsStore((state) => state.middleName);
  const setMname = useLspDetailsStore((state) => state.setMiddleName);

  const lname = useLspDetailsStore((state) => state.lastName);
  const setLname = useLspDetailsStore((state) => state.setLastName);

  const experience = useLspDetailsStore((state) => state.experience);
  const setExperience = useLspDetailsStore((state) => state.setExperience);

  const intro = useLspDetailsStore((state) => state.introduction);
  const setIntro = useLspDetailsStore((state) => state.setIntroduction);

  const sex = useLspDetailsStore((state) => state.sex);
  const setSex = useLspDetailsStore((state) => state.setSex);

  const setPage = useEditLspModalStore((state) => state.setPage);

  // on submit
  const onSubmit = () => {
    setPage(2);
  };

  useEffect(() => {
    if (!isEmpty(prefixName)) setValue("prefixName", prefixName);

    if (!isEmpty(suffixName)) setValue("suffixName", suffixName);

    if (!isEmpty(fname)) setValue("firstName", fname);

    if (!isEmpty(mname)) setValue("middleName", mname);

    if (!isEmpty(lname)) setValue("lastName", lname);

    if (experience) setValue("experience", Number(experience));

    if (sex) setValue("sex", sex);

    if (!isEmpty(intro)) setValue("introduction", intro);
  }, [prefixName, suffixName, fname, mname, lname, experience, intro, sex]);

  return (
    <>
      <form id="editPersonalInfoExternalForm" key="editPersonalInfoExternalForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label htmlFor="prefixName" className="text-xs font-medium text-gray-600">
            Name prefix
          </label>

          <Input
            id="prefixName"
            {...register("prefixName", { value: prefixName, onChange: (e) => setPrefixName(trim(e.target.value)) })}
            size="small"
            placeholder="(Dr.,Prof., Fr., Sen., etc.), leave blank if not applicable"
            className="placeholder:text-xs"
          />
        </div>

        <div className="">
          <label htmlFor="fname" className="text-xs font-medium text-gray-600">
            First Name
          </label>

          <Input
            id="fname"
            {...register("firstName", { value: fname, onChange: (e) => setFname(trim(e.target.value)) })}
            size="small"
            placeholder="Enter first name"
            className="placeholder:text-xs"
            color={errors?.firstName ? "error" : "primary"}
            helperText={!isEmpty(errors?.firstName) ? errors?.firstName?.message : undefined}
          />
        </div>

        <div>
          <label htmlFor="mname" className="text-xs font-medium text-gray-600">
            Middle Name
          </label>
          <Input
            id="mname"
            {...register("middleName", { value: mname, onChange: (e) => setMname(trim(e.target.value)) })}
            size="small"
            placeholder="Enter middle name"
            className="placeholder:text-xs"
            color={errors?.middleName ? "error" : "primary"}
            helperText={!isEmpty(errors?.middleName) ? errors?.middleName?.message : undefined}
          />
        </div>

        <div>
          <label htmlFor="lname" className="text-xs font-medium text-gray-600">
            Last Name
          </label>
          <Input
            id="lname"
            {...register("lastName", { value: lname, onChange: (e) => setLname(trim(e.target.value)) })}
            size="small"
            placeholder="Enter last name"
            className="placeholder:text-xs"
            color={errors?.lastName ? "error" : "primary"}
            helperText={!isEmpty(errors?.lastName) ? errors?.lastName?.message : undefined}
          />
        </div>

        <div>
          <label htmlFor="extensionName" className="text-xs font-medium text-gray-600">
            Extension Name
          </label>

          <Input
            id="extensionName"
            {...register("extensionName", {
              value: extensionName,
              onChange: (e) => setExtensionName(trim(e.target.value)),
            })}
            size="small"
            placeholder="(Sr., Jr., III, etc.), leave blank if not applicable"
            className="placeholder:text-xs"
          />
        </div>

        <div>
          <label htmlFor="suffixName" className="text-xs font-medium text-gray-600">
            Name Suffix
          </label>

          <Input
            id="suffixName"
            value={suffixName}
            onChange={(e) => setSuffixName(e.target.value)}
            size="small"
            placeholder="(PhD, MD, etc.), leave blank if not applicable"
            className="placeholder:text-xs"
          />
        </div>

        <div>
          <RadioGroup name="sex">
            <div className="mt-2">
              <RadioGroup.Label as="div">
                <p className="text-xs font-medium text-gray-600">Sex</p>
              </RadioGroup.Label>
            </div>

            {/* <div className={`p-1 mb-2 border rounded ${errors.sex ? "border-red-400" : "border-inherit"}`}> */}
            <RadioGroup.Option value={Sex} as={Fragment}>
              {({ checked }) => {
                checked = sex === Sex.MALE;
                return (
                  <div
                    className={`${
                      checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
                    } cursor-pointer px-4 py-1  border rounded flex items-center justify-between hover:bg-indigo-300 hover:text-white transition-transform`}
                    onClick={() => {
                      setSex(Sex.MALE);
                      setValue("sex", "Male");
                    }}
                  >
                    <p className="text-sm">Male</p>
                    {checked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
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
            <RadioGroup.Option value={Sex} as={Fragment}>
              {({ checked }) => {
                checked = sex === Sex.FEMALE;
                return (
                  <div
                    className={`${
                      checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
                    } cursor-pointer px-4 py-1 border rounded flex items-center justify-between hover:bg-indigo-300 hover:text-white transition-transform`}
                    onClick={() => {
                      setSex(Sex.FEMALE);
                      setValue("sex", "Female");
                    }}
                  >
                    <p className="text-sm">Female</p>
                    {checked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
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
            {/* </div> */}
          </RadioGroup>
        </div>

        <div>
          <label htmlFor="exp" className="text-xs font-medium text-gray-600">
            Years of Experience
          </label>
          <Input
            id="exp"
            {...register("experience", {
              value: Number(experience),
              onChange: (e) => setExperience(Number(e.target.value)),
            })}
            size="small"
            placeholder="Enter number of years"
            className="placeholder:text-xs"
            color={errors?.experience ? "error" : "primary"}
            helperText={errors?.experience ? errors?.experience?.message : undefined}
          />
        </div>

        <div className="mt-1">
          <label htmlFor="intro" className="block mb-1 text-xs font-medium text-gray-600">
            Introduction
          </label>
          <textarea
            id="intro"
            {...register("introduction", { value: intro, onChange: (e) => setIntro(trim(e.target.value)) })}
            rows={2}
            placeholder="Please enter the LSP's preferred introduction here"
            className={`block w-full px-4 py-3 text-sm ${
              errors?.introduction
                ? "border border-red-600 focus:ring-red-100 "
                : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs`}
          />
          {errors?.introduction ? (
            <span className="pl-1 text-xs text-red-500">{errors?.introduction?.message}</span>
          ) : null}
        </div>
      </form>
    </>
  );
};
