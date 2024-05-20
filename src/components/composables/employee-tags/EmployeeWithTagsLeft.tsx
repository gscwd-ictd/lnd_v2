"use client";

import { Combobox } from "@headlessui/react";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { TabContentWrap, Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/osprey/ui/tabs/view/Tabs";
import { useDebounce } from "@lms/hooks/use-debounce";
import { useTabStore } from "@lms/utilities/stores/employee-tags-store";
import { Tag } from "@lms/utilities/types/tags";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTagsDataTable } from "./tags/use-tags-data-table";
import { HiTag, HiUserCircle, HiXCircle } from "react-icons/hi";

type EmployeeProps = {
  employeeId: string;
  fullName: string;
  positionTitle: string;
};

export default function EmployeeWithTagsLeft() {
  const tabs = useTabStore((state) => state.setActiveTab);
  const { columns } = useTagsDataTable();

  //set employee global state
  const setSelectedEmployee = useTabStore((state) => state.setSelectedEmployee);
  const selectedEmployee = useTabStore((state) => state.selectedEmployee);

  //employee tab state
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState<Array<EmployeeProps>>([]);

  //tags tab state
  const [queryTag, setQueryTag] = useState("");
  const [tags, setTags] = useState<Array<Tag>>([]);

  const setSelectedTag = useTabStore((state) => state.setSelectedTag);
  const selectedTag = useTabStore((state) => state.selectedTag);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (query.length >= 3) {
      const getEmployee = async () => {
        const result = await axios.get(`${url}/hrms/employees/q?name=${query}`);
        // const result = await axios.get(`${url}/hrms/employee-tags/tag/${selectedTag?.id}`);
        setEmployees(result.data);
      };

      getEmployee();
    }
  }, [query]);

  useEffect(() => {
    if (queryTag.length >= 3) {
      const getTags = async () => {
        const result = await axios.get(`${url}/tags/search/q?name=${queryTag}`);
        setTags(result.data);
      };

      getTags();
    }
  }, [queryTag]);

  // useQuery({
  //   queryKey: ["getEmployeeByTagId", selectedTag],
  //   enabled: !!selectedTag,
  //   queryFn: async () => {
  //     const { data } = await axios.get(`${url}/employee-tags/tag/${selectedTag?.id}`);
  //     setEmployees(data);
  //     return data;
  //   },
  // });

  const debounce = (fn: Function) => {
    let timer: NodeJS.Timeout | null;

    return (...args: any[]) => {
      setIsSearching(true);
      //  const context = this;
      if (timer) clearTimeout(timer!);

      timer = setTimeout(() => {
        setIsSearching(false);
        timer = null;
        fn.apply(fn, args);
      }, 500);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce(() => setQuery),
    []
  );

  return (
    <div className="flex flex-col w-full">
      {selectedEmployee?.employeeId ? (
        <div className="shadow-md rounded p-5 mb-2 bg-indigo-50 flex gap-2 justify-between items-center">
          <div className="text-slate-600 font-medium flex gap-2 items-center">
            <HiUserCircle className="w-6 h-6 text-slate-400" />
            <div className="flex flex-col">
              <div className="font-semibold">{selectedEmployee.fullName}</div>
              <div className="font-normal">{selectedEmployee.positionTitle}</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="p-2 border bg-white w-full">
        <Combobox
          defaultValue={selectedEmployee}
          onChange={(value) => {
            setSelectedEmployee(value);
          }}
        >
          <div className="relative px-4 pt-1 items-center">
            <Combobox.Input
              onChange={(event) => {
                debounceFn(event.target.value);
                setQuery(event.target.value);
              }}
              className="flex w-full px-4 py-3 mb-2 pl-11 text-sm transition-colors bg-gray-100 border-transparent rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500"
              displayValue={() => (selectedEmployee !== undefined ? selectedEmployee.fullName : "")}
              placeholder="Search for an employee..."
            />

            <div className="absolute inset-y-0 mt-1 left-0 z-20 flex items-center pl-8 pointer-events-none">
              {!isSearching ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500 animate-spin"
                >
                  <path
                    opacity="0.2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="currentColor"
                  />
                  <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" />
                </svg>
              )}
            </div>

            {selectedEmployee?.employeeId ? (
              <div className="absolute inset-y-0 mt-1 right-0 z-20 flex items-center pr-8 ">
                <button
                  onClick={() => {
                    setSelectedEmployee({ employeeId: "", fullName: "", positionTitle: "" });
                  }}
                >
                  <HiXCircle className="w-5 h-5 text-gray-400 hover:text-gray-500 active:text-gray-600" />
                </button>
              </div>
            ) : null}

            <Combobox.Options className="absolute w-full p-1 space-y-1 overflow-auto bg-white rounded-sm max-h-60">
              {employees.length === 0 && query !== "" ? (
                <div className="p-2 text-sm">No records.</div>
              ) : (
                <>
                  {employees.map((employee) => (
                    <Combobox.Option
                      key={employee.employeeId}
                      value={employee}
                      className={({ active }) => `p-1 ${active ? "bg-slate-200 rounded-sm" : ""}`}
                    >
                      <div className="flex flex-col">
                        <div className="text-sm">{employee.fullName}</div>
                        <div className="text-xs text-gray-500">{employee.positionTitle}</div>
                      </div>
                    </Combobox.Option>
                  ))}
                </>
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </div>
  );
}
