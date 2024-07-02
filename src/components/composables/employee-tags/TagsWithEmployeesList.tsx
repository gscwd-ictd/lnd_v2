"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Employee, useTabStore } from "@lms/utilities/stores/employee-tags-store";
import { FormEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { UndrawAddSvg } from "./UndrawAddSvg";
import axios, { AxiosResponse } from "axios";
import { EmployeeProps, Tag } from "@lms/utilities/types/tags";
import { url } from "@lms/utilities/url/api-url";
import { UndrawSelectSvg } from "./UndrawSelectSvg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { DeleteEmployeeTag } from "../employee-tags-modal/DeleteEmployeeTag";
import { DeleteEmployee } from "../employee-tags-modal/DeleteEmployee";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { HiUserCircle, HiXCircle } from "react-icons/hi";
import Image from "next/image";

type EmployeeTags = {
  employees: string[];
  tags: string[];
};

type SelectProps = {
  value: string;
  label: string;
};

export default function TagsWithEmployeesList() {
  const [queryTags, setQueryTags] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // query client
  const queryClient = useQueryClient();

  // search query
  // const [searchEmployee, setSearchEmployee] = useState<string>("");
  const searchEmployee = useTabStore((state) => state.searchTagEmployee);
  const setSearchEmployee = useTabStore((state) => state.setSearchTagEmployee);

  // initialize ref for search input
  const searchEmployeeRef = useRef(null) as unknown as MutableRefObject<HTMLInputElement>;

  //search employee combobox
  const [selectEmployee, setSelectEmployee] = useState<Array<EmployeeProps>>([]);
  const [employee, setEmployee] = useState<Array<SelectProps>>([]);

  //set employee tags
  const employeeTags = useTabStore((state) => state.employeeTags);
  const setEmployeeTags = useTabStore((state) => state.setEmployeeTags);

  //set employees
  const employees = useTabStore((state) => state.employees);
  const filteredEmployees = useTabStore((state) => state.filteredEmployees);
  const setEmployees = useTabStore((state) => state.setEmployees);
  const setFilteredEmployees = useTabStore((state) => state.setFilteredEmployees);

  //selected employee, global state
  const selectedEmployee = useTabStore((state) => state.selectedEmployee);

  const selectedTag = useTabStore((state) => state.selectedTag);

  const activeTab = useTabStore((state) => state.activeTab);

  // this function opens the toast with the following attributes
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  // useEffect(() => {
  //   const getTags = async () => {
  //     const result = await axios.get(`${url}/tags/search/q?name=${queryTags}`);

  //     const tempResult = result.data.filter((e: any) => {
  //       return !employeeTags?.some((tag) => {
  //         return e.id === tag.id;
  //       });
  //     });

  //     setSelectTags(tempResult);
  //   };

  //   getTags();
  // }, [queryTags, employeeTags]);

  useQuery({
    queryKey: ["getAllEmployees", employees],
    enabled: !!employees,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/hrms/employees/q?name=`);

      const result = data.filter((e: any) => {
        return !employees?.some((employee) => {
          return e.employeeId === employee.employeeId;
        });
      });

      setSelectEmployee(result);
      return result;
    },
  });

  useQuery({
    queryKey: ["getTagsByEmployeeId", selectedEmployee],
    enabled: !!selectedEmployee,
    queryFn: async () => {
      // const { data } = await axios.get(`${url}/hrms/employee-tags/employee/${selectedEmployee?.employeeId}`);
      const { data } = await axios.get(`${url}/hrms/employees/${selectedEmployee?.employeeId}/tags`);

      setEmployeeTags(data);
      return data;
    },
  });

  useQuery({
    queryKey: ["getEmployeeByTagId", selectedTag?.id],
    enabled: !!selectedTag,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/hrms/employees/tags/${selectedTag?.id}`);
      var employeesFromTag: Array<Employee> = [];

      data.forEach((employeeAndSupervisors: any) => {
        employeeAndSupervisors.employees.forEach((emp: Employee) => {
          employeesFromTag.sort((a, b) => (a.name > b.name ? 1 : -1)).push(emp);
        });
      });

      setEmployees(employeesFromTag);
      setFilteredEmployees(employeesFromTag);

      return data;
    },
  });

  // submit mutation
  const submitEmployeeTags = useMutation({
    onMutate: () => {},
    mutationFn: async (data: EmployeeTags) => {
      const result = await axios.post(`${url}/hrms/employees/tags/`, data);
      return result;
    },
    onError: () => {
      setToastOptions("danger", "Something went wrong!", "Failed to add, please contract your administrator.");
    },
    onSuccess: async () => {
      setToastOptions("success", "Success", "You have successfully an employee to the tag");

      // const { data } = await axios.get(`${url}/hrms/employee-tags/tag/${selectedTag?.id}`);
      const updatedEmployeesFromTag = await axios.get(`${url}/hrms/employees/tags/${selectedTag?.id}`);
      var employeesFromTag: Array<Employee> = [];

      updatedEmployeesFromTag.data.forEach((test: any) => {
        test.employees.forEach((emp: Employee) => {
          employeesFromTag.sort((a, b) => (a.name > b.name ? 1 : -1)).push(emp);
        });
      });

      queryClient.setQueryData(["getEmployeeByTagId", selectedTag?.id], updatedEmployeesFromTag.data);

      setEmployees(employeesFromTag);
      setFilteredEmployees(employeesFromTag);
      // clear the input
      setEmployee([]);
    },
  });

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
    debounce(() => setSearchEmployee),
    []
  );

  const onSearch = (event: FormEvent<HTMLInputElement>) => {
    // get the current value of the search input
    const value = event.currentTarget.value;

    // filtered result
    const filteredResult: Array<Employee> = employees
      .filter((employee: Employee) => employee.name.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => (a.name > b.name ? 1 : -1));

    debounceFn(value);
    setSearchEmployee(value);

    // update the state of the filtered tags
    // setEmployees(filteredResult);
    setFilteredEmployees(filteredResult);
  };

  // clear search
  const onClearSearch = () => {
    // set focus on the search input
    searchEmployeeRef.current.focus();

    // set the search value back to default
    setSearchEmployee("");

    // set the filtered tags back to default
    setFilteredEmployees(employees);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <>
          {selectedTag?.id ? (
            <>
              <div className="flex w-full gap-2">
                <div className="flex-1 ">
                  <Select
                    value={employee}
                    onChange={(value) => {
                      setEmployee(
                        value.map((employee) => {
                          return { value: employee.value, label: employee.label };
                        })
                      );
                    }}
                    closeMenuOnSelect={false}
                    options={selectEmployee.map((employee) => {
                      return { value: employee.employeeId, label: employee.fullName };
                    })}
                    isMulti
                  ></Select>
                </div>
                <Button
                  variant="soft"
                  size="small"
                  onClick={() => {
                    var employeeData: Array<string> = [];

                    employee.forEach((data) => {
                      employeeData.push(data.value);
                    });

                    //submit employee tags
                    if (employee.length > 0)
                      submitEmployeeTags.mutateAsync({ employees: employeeData, tags: [selectedTag.id] });

                    // submitEmployeeTag({
                    //   employees: employeeData,
                    //   tags: [selectedTag.id],
                    // });
                  }}
                >
                  Add Employee
                </Button>
              </div>
              <hr />

              {employees?.length === 0 ? (
                <>
                  <div className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg bg-gray-50/50">
                    <h3 role="button" className="text-gray-500">
                      No assigned employees
                    </h3>
                  </div>
                </>
              ) : (
                <>
                  <div className=" bg-white w-full flex justify-between">
                    <div className="flex text-sm px-4 items-center text-slate-500">
                      Total Employees: {employees?.length}
                    </div>
                    <div className="relative pt-1 items-center w-1/2">
                      <input
                        ref={searchEmployeeRef}
                        onChange={(event) => onSearch(event)}
                        value={searchEmployee}
                        className="flex w-full px-4 py-3 mb-2 pl-11 text-sm transition-colors bg-gray-100 border-transparent rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Search tag employee..."
                      />

                      <div className="absolute inset-y-0 mt-1 left-0 flex items-center pl-4 pb-2 pointer-events-none">
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
                            <path
                              d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                      </div>

                      {searchEmployee ? (
                        <div className="absolute inset-y-0 mb-1 right-0 z-20 flex items-center pr-4 ">
                          <button
                            onClick={() => {
                              // setSelectedTag({ id: "", name: "" });
                              onClearSearch();
                            }}
                          >
                            <HiXCircle className="w-5 h-5 text-gray-400 hover:text-gray-500 active:text-gray-600 " />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <ul role="list" className="divide-y h-[calc(100vh-240px)] overflow-auto bg-gray-50/50 shadow-inner">
                    {filteredEmployees &&
                      filteredEmployees?.map((item: Employee, index) => (
                        <li key={index} className="flex justify-between py-3 text-sm group/item hover:bg-slate-100">
                          <div className="col-span-10 pl-4 flex gap-2 items-center">
                            <div>
                              <HiUserCircle className="w-6 h-6 text-indigo-400" />
                              {/* <Image src={item.}/> */}
                            </div>
                            <div className="flex flex-col">
                              <h3 className="font-sm">{item.name}</h3>
                              <div className="text-xs text-gray-500">{item.positionTitle}</div>
                            </div>
                          </div>
                          <div className="flex items-center col-span-2 pr-4">
                            <DeleteEmployee tagId={selectedTag.id} employeeId={item.employeeId} />
                          </div>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg bg-gray-50/50">
                <div className="flex flex-col">
                  <UndrawSelectSvg />
                  <h3 role="button" className="text-gray-500">
                    Please select a tag
                  </h3>
                </div>
              </div>
            </>
          )}
        </>
      </div>

      {/* Toast options here */}
      <Toast
        duration={2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
}
