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
import { HiTag, HiXCircle } from "react-icons/hi";

type EmployeeTags = {
  employees: string[];
  tags: string[];
};

type SelectProps = {
  value: string;
  label: string;
};

export default function EmployeeWithTagsList() {
  const queryClient = useQueryClient();

  // search
  const searchTag = useTabStore((state) => state.searchTagEmployee);
  const setSearchTag = useTabStore((state) => state.setSearchTagEmployee);

  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  // search list
  const [isSearching, setIsSearching] = useState<boolean>(false);

  //search tags combobox
  const [selectTags, setSelectTags] = useState<Array<Tag>>([]);
  const [tag, setTag] = useState<Array<SelectProps>>([]);

  // initialize ref for search input
  const searchTagRef = useRef(null) as unknown as MutableRefObject<HTMLInputElement>;

  //set employee tags
  const employeeTags = useTabStore((state) => state.employeeTags);
  const setEmployeeTags = useTabStore((state) => state.setEmployeeTags);
  const filteredEmployeeTags = useTabStore((state) => state.filteredEmployeeTags);
  const setFilteredEmployeeTags = useTabStore((state) => state.setFilteredEmployeeTags);

  //selected employee, global state
  const selectedEmployee = useTabStore((state) => state.selectedEmployee);

  const selectedTag = useTabStore((state) => state.selectedTag);

  const activeTab = useTabStore((state) => state.activeTab);

  // this function opens the toast with the following attributes
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  useEffect(() => {
    const getTags = async () => {
      const result = await axios.get(`${url}/tags/search/q?name=${searchTag}`);

      const tempResult = result.data.filter((e: any) => {
        return !employeeTags?.some((tag) => {
          return e.id === tag.id;
        });
      });

      setSelectTags(tempResult);
    };

    getTags();
  }, [searchTag, employeeTags]);

  // useQuery({
  //   queryKey: ["getAllEmployees", employees],
  //   enabled: !!employees,
  //   queryFn: async () => {
  //     const { data } = await axios.get(`${url}/hrms/employees/q?name=`);

  //     const result = data.filter((e: any) => {
  //       return !employees?.some((employee) => {
  //         return e.employeeId === employee.employeeId;
  //       });
  //     });

  //     setSelectEmployee(result);
  //     return result;
  //   },
  // });

  useQuery({
    queryKey: ["getTagsByEmployeeId", selectedEmployee?.employeeId],
    enabled: !!selectedEmployee,
    queryFn: async () => {
      // const { data } = await axios.get(`${url}/hrms/employee-tags/employee/${selectedEmployee?.employeeId}`);
      const { data } = await axios.get(`${url}/hrms/employees/${selectedEmployee?.employeeId}/tags`);

      setEmployeeTags(data.sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1)));
      setFilteredEmployeeTags(data.sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1)));
      return data;
    },
  });

  // useQuery({
  //   queryKey: ["getEmployeeByTagId", selectedTag],
  //   enabled: !!selectedTag,
  //   queryFn: async () => {
  //     const { data } = await axios.get(`${url}/hrms/employees/tags/${selectedTag?.id}`);
  //     var employeesFromTag: Array<Employee> = [];

  //     data.forEach((employeeAndSupervisors: any) => {
  //       employeeAndSupervisors.employees.forEach((emp: Employee) => {
  //         employeesFromTag.push(emp);
  //       });
  //     });

  //     setEmployees(employeesFromTag);

  //     return data;
  //   },
  // });

  // const submitEmployeeTag = async (data: EmployeeTags) => {
  //   try {
  //     const result = await axios.post(`${url}/hrms/employee-tags/`, data);

  //     if (result) {
  //       if (activeTab === "employee") {
  //         if (result.status === 201) {
  //           setToastOptions("success", "Success", "You have successfully added a training tag!");
  //           const { data } = await axios.get(`${url}/hrms/employee-tags/employee/${selectedEmployee?.employeeId}`); // get tags by employee id
  //           setEmployeeTags(data);
  //         } else
  //           setToastOptions("danger", "Something went wrong!", "Failed to add, please contract your administrator.");
  //       } else {
  //         if (result.status === 201) {
  //           setToastOptions("success", "Success", "You have successfully an employee to the tag");

  //           const { data } = await axios.get(`${url}/hrms/employee-tags/tag/${selectedTag?.id}`);
  //           var employeesFromTag: Array<Employee> = [];

  //           data.forEach((test: any) => {
  //             test.employees.forEach((emp: Employee) => {
  //               employeesFromTag.push(emp);
  //             });
  //           });

  //           setEmployees(employeesFromTag);
  //         } else
  //           setToastOptions("danger", "Something went wrong!", "Failed to add, please contract your administrator.");
  //       }
  //     }
  //   } catch {
  //     setToastOptions("danger", "Something went wrong!", "Failed to add, please contract your administrator.");
  //   }
  // };

  // on error
  const submitEmployeeTags = useMutation({
    onMutate: () => {},
    mutationFn: async (data: EmployeeTags) => {
      const result = await axios.post(`${url}/hrms/employees/tags`, data);
      return result;
    },
    onError: () => {
      setToastOptions("danger", "Something went wrong!", "Failed to add, please contract your administrator.");
    },
    onSuccess: async () => {
      setToastOptions("success", "Success", "You have successfully added a training tag!");
      // const { data } = await axios.get(`${url}/hrms/employee-tags/employee/${selectedEmployee?.employeeId}`); // get tags by employee id
      const updatedTags = await axios.get(`${url}/hrms/employees/${selectedEmployee?.employeeId}/tags`);

      queryClient.setQueryData(["getTagsByEmployeeId", selectedEmployee?.employeeId], updatedTags.data);

      setEmployeeTags(updatedTags.data.sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1)));
      setFilteredEmployeeTags(updatedTags.data.sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1)));
      setTag([]);
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
    debounce(() => setSearchTag),
    []
  );

  const onSearch = (event: FormEvent<HTMLInputElement>) => {
    // get the current value of the search input
    const value = event.currentTarget.value;

    // filtered result
    const filteredResult: Array<Tag> = employeeTags.filter((tag: Tag) =>
      tag.name.toLowerCase().includes(value.toLowerCase())
    );

    debounceFn(value);
    // setSearchEmployee(value);
    setSearchTag(value);

    // update the state of the filtered tags
    // setEmployees(filteredResult);
    setFilteredEmployeeTags(filteredResult);
  };

  // clear search
  const onClearSearch = () => {
    // set focus on the search input
    searchTagRef.current.focus();

    // set the search value back to default
    setSearchTag("");

    // set the filtered tags back to default
    setFilteredEmployeeTags(employeeTags);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <>
          {selectedEmployee?.employeeId ? (
            <>
              <div className="flex w-full gap-2">
                <div className="flex-1 ">
                  <Select
                    value={tag}
                    onChange={(value) => {
                      setTag(
                        value.map((tags) => {
                          return { value: tags.value, label: tags.label };
                        })
                      );
                    }}
                    closeMenuOnSelect={false}
                    options={selectTags.map((tags) => {
                      return { value: tags.id, label: tags.name };
                    })}
                    isMulti
                  />
                </div>
                <Button
                  variant="soft"
                  size="small"
                  onClick={() => {
                    var tagData: Array<string> = [];

                    tag?.forEach((data) => {
                      tagData.push(data.value);
                    });

                    //submit employee tags
                    if (tag.length > 0)
                      submitEmployeeTags.mutateAsync({ employees: [selectedEmployee.employeeId], tags: tagData });
                    // submitEmployeeTags({
                    //   employees: [selectedEmployee.employeeId],
                    //   tags: tagData,
                    // });
                  }}
                >
                  Add Tag
                </Button>
                {submitEmployeeTags.isLoading ? <Spinner size="small" borderSize={4} color={"blue"} /> : null}
              </div>

              <hr />
              {employeeTags?.length === 0 ? (
                <>
                  <div className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg bg-gray-50/50">
                    <h3 role="button" className="text-gray-500">
                      No assigned tags
                    </h3>
                  </div>
                </>
              ) : (
                <>
                  <div className=" bg-white w-full flex justify-between">
                    <div className="flex text-sm px-4 items-center text-slate-500">
                      Total tags: {employeeTags?.length}
                    </div>
                    <div className="relative pt-1 items-center w-1/2">
                      <input
                        ref={searchTagRef}
                        onChange={(event) => onSearch(event)}
                        value={searchTag}
                        className="flex w-full px-4 py-3 mb-2 pl-11 text-sm transition-colors bg-gray-100 border-transparent rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Search employee tag..."
                      />

                      <div className="absolute inset-y-0 mt-1 left-0 z-20 flex items-center pl-4 pb-2 pointer-events-none">
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

                      {searchTag ? (
                        <div className="absolute inset-y-0 mb-1 right-0 z-20 flex items-center pr-4 ">
                          <button
                            onClick={() => {
                              onClearSearch();
                            }}
                          >
                            <HiXCircle className="w-5 h-5 text-gray-400 hover:text-gray-500 active:text-gray-600" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <ul role="list" className="divide-y h-[calc(100vh-240px)] overflow-auto bg-gray-50/50 shadow-inner">
                    {filteredEmployeeTags &&
                      filteredEmployeeTags
                        ?.sort((a: Tag, b: Tag) => (a.name > b.name ? 1 : -1))
                        .map((item, index) => (
                          //text-sm border rounded-r flex border-l-4 justify-between
                          <li
                            key={index}
                            className="flex justify-between pt-3 pb-3 text-sm group/item hover:bg-slate-100"
                          >
                            <div className="col-span-10 pl-4 flex gap-2 items-center">
                              <div>
                                <HiTag className="w-5 h-5 text-indigo-500" />
                              </div>
                              <div className="text-sm">{item.name}</div>
                            </div>
                            <div className="flex items-center col-span-2 pr-4">
                              {/* <DeleteEmployeeTag id={item.id} /> */}
                              <DeleteEmployeeTag tagId={item.id} employeeId={selectedEmployee.employeeId} />
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
                  <UndrawAddSvg />
                  <h3 role="button" className="text-gray-500">
                    Please select an employee
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
