"use client";

import { Combobox } from "@headlessui/react";
import { useTabStore } from "@lms/utilities/stores/employee-tags-store";
import { url } from "@lms/utilities/url/api-url";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { HiUserCircle, HiXCircle } from "react-icons/hi";

type EmployeeProps = {
  employeeId: string;
  fullName: string;
  positionTitle: string;
};

export default function EmployeeWithTagsLeft() {
  //set employee global state
  const setSelectedEmployee = useTabStore((state) => state.setSelectedEmployee);
  const selectedEmployee = useTabStore((state) => state.selectedEmployee);
  const query = useTabStore((state) => state.queryEmployee);
  const setQuery = useTabStore((state) => state.setQueryEmployee);
  const setSearchTagEmployee = useTabStore((state) => state.setSearchTagEmployee);

  //employee tab state

  const [employees, setEmployees] = useState<Array<EmployeeProps>>([]);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (query.length >= 3) {
      const getEmployee = async () => {
        const result = await axios.get(`${url}/hrms/employees/q?name=${query}`);
        setEmployees(result.data);
      };

      getEmployee();
    } else if (query.length < 3) {
      setEmployees([]);
    }
  }, [query]);

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
        <div className="shadow-md rounded p-5 mb-2 bg-indigo-100/80 flex gap-2 justify-between items-center">
          <div className="text-slate-600 font-medium flex gap-4 items-center">
            <div>
              <HiUserCircle className="w-8 h-8 text-slate-500" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold text-slate-700 text-lg">{selectedEmployee.fullName}</div>
              <div className="font-light text-gray-600 text-sm">{selectedEmployee.positionTitle}</div>
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
                setSearchTagEmployee("");
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
                  className="w-5 h-5 text-indigo-500 animate-spin"
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
                    setSearchTagEmployee("");
                    setSelectedEmployee({ employeeId: "", fullName: "", positionTitle: "" });
                  }}
                >
                  <HiXCircle className="w-5 h-5 text-gray-400 hover:text-gray-500 active:text-gray-600" />
                </button>
              </div>
            ) : null}

            <Combobox.Options className="absolute w-full space-y-1 z-10  overflow-auto bg-white rounded-sm max-h-60">
              {employees.length === 0 && query !== "" ? (
                <div className="p-2 text-sm">No records.</div>
              ) : (
                <>
                  {employees &&
                    employees.map((employee) => (
                      <Combobox.Option
                        key={employee.employeeId}
                        value={employee}
                        className={({ active }) => `p-1 ${active ? "bg-slate-200 rounded-sm" : ""}`}
                      >
                        <div className="flex flex-col px-2 py-1">
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
