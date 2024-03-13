"use client";

import { Combobox, RadioGroup } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useDebounce } from "@lms/hooks/use-debounce";
import {
  EmployeeSearch,
  LspAward,
  LspCertification,
  LspEducation,
  LspSource,
  Sex,
  useAddLspModalStore,
  useEmployeeSearchStore,
  useLspDetailsStore,
} from "@lms/utilities/stores/lsp-details-store";
import { portalBackendUrl, url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";
import { FunctionComponent, useCallback, useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  employeeId: yup.string().label("Employee").required("Employee is required"),
  experience: yup.number().min(0).required(),
  intro: yup.string().label("Introduction").required(),
  sex: yup.string().label("Sex").required(),
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
});

export const CreatePersonalInformationInternal: FunctionComponent = () => {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const tin = useLspDetailsStore((state) => state.tin);

  const setTin = useLspDetailsStore((state) => state.setTin);

  const setLspEmployeeId = useLspDetailsStore((state) => state.setEmployeeId);

  const setName = useLspDetailsStore((state) => state.setName);

  //const fname = useLspDetailsStore((state) => state.firstName);
  const setFname = useLspDetailsStore((state) => state.setFirstName);

  //const mname = useLspDetailsStore((state) => state.middleName);
  const setMname = useLspDetailsStore((state) => state.setMiddleName);

  const setLname = useLspDetailsStore((state) => state.setLastName);

  const experience = useLspDetailsStore((state) => state.experience);

  const setExperience = useLspDetailsStore((state) => state.setExperience);

  const intro = useLspDetailsStore((state) => state.introduction);

  const setIntro = useLspDetailsStore((state) => state.setIntroduction);

  const setContactNumber = useLspDetailsStore((state) => state.setContactNumber);

  const setEmail = useLspDetailsStore((state) => state.setEmail);

  const setPostalAddress = useLspDetailsStore((state) => state.setPostalAddress);

  const setEducation = useLspDetailsStore((state) => state.setEducation);

  const setAwards = useLspDetailsStore((state) => state.setAwards);

  const setCertifications = useLspDetailsStore((state) => state.setCertifications);

  const setPage = useAddLspModalStore((state) => state.setPage);

  const page = useAddLspModalStore((state) => state.page);

  const sex = useLspDetailsStore((state) => state.sex);
  const setSex = useLspDetailsStore((state) => state.setSex);

  const {
    searchInput,
    employeeId,
    employeePds,
    selectedEmployee,
    employeeData,
    setEmployeeId,
    setEmployeePds,
    setSearchInput,
    setSelectedEmployee,
    setEmployeeData,
  } = useEmployeeSearchStore();

  const [search, setSearch] = useState("");
  const [fullName, setFullName] = useState<string>("");

  const onSearch = (value: string) => {
    setSearch(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(useDebounce(500, onSearch), []);

  // on submit
  const onSubmit = () => {
    setPage(3);
  };

  /**
   *  get employee names
   */
  const { data } = useQuery({
    queryKey: ["employee-names", search],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/hrms/employees/q?name=${search}`);

      return data as EmployeeSearch[];
    },
    enabled: search !== "",
  });

  /**
   *  TODO get employee details via pds
   */
  useQuery({
    queryKey: ["employee-pds", employeeId],
    queryFn: async () => {
      try {
        // const { data } = await axios.get(`${portalBackendUrl}/${employeeId}`);
        const { data } = await axios.get(`${url}/portal/employees/details/${employeeId}`);
        // setEmployeePds(data);
        setEmployeeData(data);
        console.log(data);
        return data;
      } catch (error) {
        setEmployeePds(undefined);
      }
    },
    // enabled: !!employeeId,
  });

  useEffect(() => {
    if (!isEmpty(selectedEmployee) && !isEmpty(employeeData)) {
      clearErrors("employeeId");
      clearErrors("tin");
      // setLspEmployeeId(employeePds?.personalInfo._id as string);
      setSex(employeeData?.sex);
      setLspEmployeeId(employeeData.employeeId!);
      // setFname(employeeData?.personalInfo?.firstName as string);
      // setMname(employeeData?.personalInfo?.middleName as string);
      // setLname(employeeData?.personalInfo?.lastName as string);
      setContactNumber(employeeData?.contactNumber);
      setEmail(employeeData?.email);
      setPostalAddress(employeeData.postalAddress);
      setTin(employeeData.tin ?? "");
      setValue("tin", employeeData?.tin ?? "");
      setFullName(selectedEmployee.fullName);

      // const college = employeePds?.college.map((education) => ({
      //   degree: education.degree,
      //   institution: education.schoolName,
      // })) as unknown as Array<LspEducation>;

      // const graduate = employeePds?.graduate.map((education) => ({
      //   degree: education.degree,
      //   institution: education.schoolName,
      // })) as unknown as Array<LspEducation>;

      // setEducation(college?.concat(graduate));

      // const awards = employeePds?.recognitions.map(({ recognition }) => ({
      //   name: recognition,
      // }));

      // setAwards(awards as unknown as Array<LspAward>);

      // const certs = employeePds?.eligibility.map((cert) => ({ name: cert.name }));

      // setCertifications(certs as unknown as Array<LspCertification>);
      setEducation(employeeData.education ?? []);
      setAwards(employeeData.awards ?? []);
      setCertifications(employeeData.certifications ?? []);
    } else if (!isEmpty(selectedEmployee?.employeeId) && employeeData === undefined) {
      setError("employeeId", { message: "Employee details not found" });
      setTin("");
      setValue("tin", "");
      setError("tin", { message: "Unable to find a TIN Number" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, employeeData, selectedEmployee]);

  useEffect(() => {
    if (!isEmpty(employeeId)) {
      setValue("employeeId", employeeId!);
    }
  }, [employeeId]);

  useEffect(() => {
    if (!isEmpty(sex)) {
      setValue("sex", sex === Sex.MALE ? "Male" : "Female");
      clearErrors("sex");
    }
  }, [sex]);

  // on initial load
  useEffect(() => {
    register("employeeId");
  }, []);

  return (
    <>
      <form id="createPersonalInfoInternalForm" key="createPersonalInfoInternalForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label htmlFor="search-emp" className="text-xs font-medium text-gray-600">
            Full name
          </label>

          <Combobox
            value={selectedEmployee}
            onChange={(value) => {
              setSelectedEmployee(value);
              setSearchInput(value?.fullName);
              setEmployeeId(value.employeeId);
            }}
          >
            <Combobox.Input as={Fragment} displayValue={() => searchInput}>
              <Input
                id="search-emp"
                size="small"
                onChange={(e) => {
                  debounceFn(e.target.value);
                  setSearchInput(e.target.value);
                }}
                autoComplete="off"
                placeholder="Search for employee"
                className="placeholder:text-xs"
                color={errors?.employeeId ? "error" : "primary"}
                helperText={errors?.employeeId ? errors?.employeeId?.message : undefined}
              />
            </Combobox.Input>

            <Combobox.Options className="absolute max-h-52 z-[80] overflow-y-auto bg-white w-full border rounded-md shadow-lg shadow-gray-100">
              {data?.length === 0 ? (
                <div className="flex items-center justify-center py-10">No results found</div>
              ) : (
                data &&
                data?.map((selectedEmp, index) => {
                  return (
                    <Combobox.Option key={index} value={selectedEmp}>
                      {({ active }) => {
                        return (
                          <div
                            role="button"
                            className={`${
                              active ? "bg-indigo-500 text-white" : ""
                            } border-b border-b-gray-100 px-2 py-1`}
                          >
                            <h3 className={`${active ? "text-indigo-50" : "text-gray-700"} font-medium`}>
                              {selectedEmp.fullName}
                            </h3>
                            <p className={`${active ? "" : "text-gray-400"} text-xs`}>{selectedEmp.positionTitle}</p>
                          </div>
                        );
                      }}
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Combobox>
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
        <span className="text-xs text-red-500">{errors.sex ? errors.sex.message : null}</span>

        <div>
          <label htmlFor="exp" className="text-xs font-medium text-gray-600">
            Years of Experience
          </label>
          <Input
            id="exp"
            // value={Number(experience)}
            // onChange={(e) => setExperience(Number(e.target.value))}
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
          <Input
            id="tin"
            // value={Number(experience)}
            // onChange={(e) => setExperience(Number(e.target.value))}
            {...register("tin", {
              value: tin,
              onChange: (e) => setTin(e.target.value),
            })}
            size="small"
            placeholder="TIN Number from PDS"
            className="placeholder:text-xs"
            color={errors?.tin ? "error" : "primary"}
            helperText={!isEmpty(errors?.tin) ? errors?.tin?.message : undefined}
            disabled
          />
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
