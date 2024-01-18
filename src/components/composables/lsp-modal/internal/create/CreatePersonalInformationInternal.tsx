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
import { url } from "@lms/utilities/url/api-url";
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
    setEmployeeId,
    setEmployeePds,
    setSearchInput,
    setSelectedEmployee,
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
        const { data } = await axios.get(`http://172.20.110.45:4001/api/pds/v2/${employeeId}`);

        setEmployeePds(data);
        return data;
      } catch (error) {
        setEmployeePds(undefined);
      }
    },
    // enabled: !!employeeId,
  });

  useEffect(() => {
    if (!isEmpty(selectedEmployee) && !isEmpty(employeePds)) {
      clearErrors("employeeId");
      clearErrors("tin");
      // setLspEmployeeId(employeePds?.personalInfo._id as string);
      setSex(employeePds?.personalInfo.sex);
      setLspEmployeeId(employeeId!);
      setFname(employeePds?.personalInfo.firstName as string);
      setMname(employeePds?.personalInfo.middleName as string);
      setLname(employeePds?.personalInfo.lastName as string);
      setContactNumber(employeePds?.personalInfo.mobileNumber as string);
      setEmail(employeePds?.personalInfo.email as string);
      setPostalAddress(
        `${employeePds?.permanentAddress.subdivision}, ${employeePds?.permanentAddress.barangay}, ${employeePds?.permanentAddress.city}`
      );
      setTin(employeePds?.governmentIssuedIds.tinNumber ?? "");
      setValue("tin", employeePds?.governmentIssuedIds.tinNumber ?? "");

      setFullName(selectedEmployee.fullName);

      const college = employeePds?.college.map((education) => ({
        degree: education.degree,
        institution: education.schoolName,
      })) as unknown as Array<LspEducation>;

      const graduate = employeePds?.graduate.map((education) => ({
        degree: education.degree,
        institution: education.schoolName,
      })) as unknown as Array<LspEducation>;

      setEducation(college?.concat(graduate));

      const awards = employeePds?.recognitions.map(({ recognition }) => ({
        name: recognition,
      }));

      setAwards(awards as unknown as Array<LspAward>);

      const certs = employeePds?.eligibility.map((cert) => ({ name: cert.name }));

      setCertifications(certs as unknown as Array<LspCertification>);
    } else if (!isEmpty(selectedEmployee?.employeeId) && employeePds === undefined) {
      setError("employeeId", { message: "Employee details not found" });
      setTin("");
      setValue("tin", "");
      setError("tin", { message: "Unable to find a TIN Number" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, employeePds, selectedEmployee]);

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

        {/* <div>
          <RadioGroup name="sex">
            <div className="mt-5 mb-3">
              <RadioGroup.Label as="div">
                <p className="text-xs font-medium text-gray-600">Sex</p>
              </RadioGroup.Label>
            </div>

            <div className={`p-1 border rounded ${errors.sex ? "border-red-400" : "border-inherit"}`}>
              <RadioGroup.Option value={Sex} as={Fragment}>
                {({ checked }) => {
                  checked = sex === Sex.MALE;
                  return (
                    <div
                      className={`${
                        checked ? "bg-indigo-500 text-white font-medium" : "bg-white text-gray-600"
                      } cursor-pointer px-4 py-1 mb-1 border rounded flex items-center justify-between hover:scale-95 transition-transform`}
                      onClick={() => {
                        setSex(Sex.MALE);
                        setValue("sex", "male");
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
                      } cursor-pointer px-4 py-1 border rounded flex items-center justify-between hover:scale-95 transition-transform`}
                      onClick={() => {
                        setSex(Sex.FEMALE);
                        setValue("sex", "female");
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
            </div>
          </RadioGroup>
        </div> */}

        <div>
          <label htmlFor="sex" className="text-xs font-medium text-gray-600">
            Sex
          </label>
          <div className="w-[8rem] mb-2">
            {sex === "Male" ? (
              <span className="w-full px-2 py-1 text-xs text-white bg-blue-500 rounded">Male</span>
            ) : (
              <span className="w-full px-2 py-1 text-xs text-white rounded bg-rose-500">Female</span>
            )}
          </div>
        </div>
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
