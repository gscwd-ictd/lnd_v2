"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import {
  EmployeeSearch,
  LspAward,
  LspCertification,
  LspEducation,
  Sex,
  useAddLspModalStore,
  useEditLspModalStore,
  useEmployeeSearchStore,
  useLspDetailsStore,
} from "@lms/utilities/stores/lsp-details-store";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";
import { FunctionComponent, useCallback, useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type CreatePersonalInformationInternalForm = {
  employeeId: string;
  experience: number;
  intro: number;
};

const schema = yup.object({
  employeeId: yup.string().label("Employee").required("Employee is required"),
  experience: yup.number().min(0).required(),
  intro: yup.string().label("Introduction").required(),
  tin: yup
    .string()
    // .max(12)
    .trim()
    // .matches(/^([0-9]{12})$|^([0-9]{9})$|^N\/A$/, 'Write a valid TIN Number or N/A')
    .matches(
      /^([0-9]{3}[\-][0-9]{3}[\-][0-9]{3}[\-][0-9]{3})$|^([0-9]{9})$|^([0-9]{12})$|^([0-9]{3}[\-][0-9]{3}[\-][0-9]{3})$|^N\/A$/,
      "Your TIN no. should be 9 or 12-digit with or without dashes(-)"
    )
    .required()
    .label("TIN Number"),
  // sex: yup.string().label("Sex").required("Sex is required"),
});

export const EditPersonalInformationInternal: FunctionComponent = () => {
  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const tin = useLspDetailsStore((state) => state.tin);
  const employeeId = useLspDetailsStore((state) => state.employeeId);
  const name = useLspDetailsStore((state) => state.name);
  const experience = useLspDetailsStore((state) => state.experience);
  const sex = useLspDetailsStore((state) => state.sex);
  const intro = useLspDetailsStore((state) => state.introduction);
  const setExperience = useLspDetailsStore((state) => state.setExperience);
  const setIntro = useLspDetailsStore((state) => state.setIntroduction);
  const setPage = useEditLspModalStore((state) => state.setPage);
  const setName = useLspDetailsStore((state) => state.setName);
  const setSex = useLspDetailsStore((state) => state.setSex);

  // on submit
  const onSubmit = () => {
    setPage(2);
  };

  useEffect(() => {
    if (!isEmpty(intro)) {
      setValue("intro", intro);
    }
  }, [intro]);

  useEffect(() => {
    if (!isEmpty(employeeId)) {
      setValue("employeeId", employeeId!);
    }
  }, [employeeId]);

  useEffect(() => {
    if (experience) setValue("experience", Number(experience));
  }, [experience]);

  useEffect(() => {
    if (!isEmpty(tin)) setValue("tin", tin);
  }, [tin]);

  // useEffect(() => {
  //   if (!isEmpty(sex)) setValue("sex", sex!);
  // }, [sex]);

  // on initial load
  useEffect(() => {
    register("employeeId");
    register("tin");
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <form id="editPersonalInfoInternalForm" key="editPersonalInfoInternalForm" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="employeeName" className="text-xs font-medium text-gray-600">
            Full Name
          </label>
          {name && (
            <Input
              id="employeeName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              placeholder=""
              disabled
              className="placeholder:text-xs"
            />
          )}
        </div>

        {sex !== undefined && (
          <div>
            <label htmlFor="sex" className="text-xs font-medium text-gray-600">
              Sex
            </label>
            <div className="w-[8rem] mb-2">
              {sex === Sex.MALE ? (
                <span className="w-full px-2 py-1 text-xs text-white bg-indigo-500 rounded">Male</span>
              ) : sex === Sex.FEMALE ? (
                <span className="w-full px-2 py-1 text-xs border border-indigo-700 text-indigo-700 rounded bg-indigo-200">
                  Female
                </span>
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        )}

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

        <div>
          <label htmlFor="tin" className="text-xs font-medium text-gray-600">
            Taxpayer Identification Number (TIN)
          </label>
          <div className="p-2 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded">
            {tin ? tin : "N/A"}
          </div>
        </div>

        <div className="mt-1">
          <label htmlFor="intro" className="block mb-1 text-xs font-medium text-gray-600">
            Introduction
          </label>
          <textarea
            id="intro"
            {...register("intro", { value: intro, onChange: (e) => setIntro(e.target.value) })}
            rows={2}
            placeholder="Please enter the LSP's preferred introduction here"
            className={`block w-full px-4 py-3 text-sm ${
              errors?.intro
                ? "border border-red-600 focus:ring-1 focus:ring-red-100"
                : "border border-gray-200 focus:border-indigo-500 focus:ring-1  focus:ring-indigo-500"
            } rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs`}
          />
          {errors?.intro ? <span className="pl-1 text-xs text-red-500">{errors?.intro?.message}</span> : null}
        </div>
      </form>
    </>
  );
};
