"use client";

import { Combobox } from "@headlessui/react";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useDebounce } from "@lms/hooks/use-debounce";
import {
  LspAward,
  LspCertification,
  LspEducation,
  LspSource,
  useEmployeeSearchStore,
  useLspDetailsStore,
  useLspSourceStore,
} from "@lms/utilities/stores/lsp-details-store";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";
import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useIndividualLspDataTable } from "../../lsp-data-table/hooks/use-individual-lsp-data-table";

type EmployeeSearch = {
  employeeId: string;
  fullName: string;
  positionTitle: string;
};

export const PersonalInformationInternal: FunctionComponent = () => {
  const lspSource = useLspSourceStore((state) => state.lspSource);

  const setLspEmployeeId = useLspDetailsStore((state) => state.setEmployeeId);

  const id = useLspDetailsStore((state) => state.id);

  //const fname = useLspDetailsStore((state) => state.firstName);
  const setFname = useLspDetailsStore((state) => state.setFirstName);

  //const mname = useLspDetailsStore((state) => state.middleName);
  const setMname = useLspDetailsStore((state) => state.setMiddleName);

  // from lsp
  const { lspId } = useIndividualLspDataTable();

  // const lname = useLspDetailsStore((state) => state.lastName);
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

  const { employeeId, setEmployeeId, employeePds, setEmployeePds, searchInput, setSearchInput } =
    useEmployeeSearchStore();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<EmployeeSearch>({} as EmployeeSearch);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(useDebounce(500, onSearch), []);

  /**
   *  get employee names
   */
  const { data } = useQuery({
    queryKey: ["employee-names", search],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/employees/q?name=${search}`);
      console.log("FROM PERSONAL INFO:", data);
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
      const { data } = await axios.get(`http://172.20.110.45:4001/api/pds/v2/${employeeId}`);
      setEmployeePds(data);
      return data;
    },
    enabled: !!employeeId,
  });

  useEffect(() => {
    if (!isEmpty(selected)) {
      setLspEmployeeId(employeePds?.personalInfo._id as string);
      setFname(employeePds?.personalInfo.firstName as string);
      setMname(employeePds?.personalInfo.middleName as string);
      setLname(employeePds?.personalInfo.lastName as string);
      setContactNumber(employeePds?.personalInfo.mobileNumber as string);
      setEmail(employeePds?.personalInfo.email as string);
      setPostalAddress(
        `${employeePds?.permanentAddress.subdivision}, ${employeePds?.permanentAddress.barangay}, ${employeePds?.permanentAddress.city}`
      );

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, employeePds, selected]);

  return (
    <>
      {lspSource === LspSource.INTERNAL && (
        <div className="relative">
          <label htmlFor="search-emp" className="text-xs font-medium text-gray-600">
            Full name
          </label>

          <Combobox
            value={selected}
            // disabled={!isEmpty(id) ? true : false}
            disabled={lspSource === LspSource.INTERNAL ? true : false}
            onChange={(value) => {
              setSelected(value);
              setSearchInput(value?.fullName);
              setEmployeeId(value.employeeId);
            }}
          >
            <Combobox.Input
              id="search-emp"
              value={searchInput}
              as={Input}
              size="small"
              onChange={(e) => {
                debounceFn(e.target.value);
                setSearchInput(e.target.value);
              }}
              placeholder="Search for employee"
              className="placeholder:text-xs"
            />

            <Combobox.Options className="absolute max-h-52 z-[80] overflow-y-auto bg-white w-full border rounded-md shadow-lg shadow-gray-100">
              {data?.length === 0 ? (
                <div className="flex items-center justify-center py-10">No results found</div>
              ) : (
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
      )}

      <div>
        <label htmlFor="exp" className="text-xs font-medium text-gray-600">
          Years of Experience
        </label>
        <Input
          id="exp"
          value={Number(experience)}
          onChange={(e) => setExperience(Number(e.target.value))}
          size="small"
          placeholder="Enter number of years"
          className="placeholder:text-xs"
        />
      </div>

      <div className="mt-1">
        <label htmlFor="intro" className="block mb-1 text-xs font-medium text-gray-600">
          Introduction
        </label>
        <textarea
          id="intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={2}
          placeholder="Please enter the LSP's preferred introduction here"
          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </>
  );
};
