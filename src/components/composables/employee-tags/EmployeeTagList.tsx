"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Employee, useTabStore } from "@lms/utilities/stores/employee-tags-store";
import { useEffect, useState } from "react";
import { UndrawAddSvg } from "./UndrawAddSvg";
import axios, { AxiosResponse } from "axios";
import { EmployeeProps, Tag } from "@lms/utilities/types/tags";
import { url } from "@lms/utilities/url/api-url";
import { UndrawSelectSvg } from "./UndrawSelectSvg";
import { useMutation, useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { DeleteEmployeeTag } from "../employee-tags-modal/DeleteEmployeeTag";
import { DeleteEmployee } from "../employee-tags-modal/DeleteEmployee";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

type EmployeeTags = {
  employees: string[];
  tags: string[];
};

type SelectProps = {
  value: string;
  label: string;
};

export default function EmployeeTagList() {
  const open = useTabStore((state) => state.activeTab);
  const [queryTags, setQueryTags] = useState("");
  const [queryEmployee, setQueryEmployee] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  //search tags combobox
  const [selectTags, setSelectTags] = useState<Array<Tag>>([]);
  const [tag, setTag] = useState<Array<SelectProps>>([]);

  //search employee combobox
  const [selectEmployee, setSelectEmployee] = useState<Array<EmployeeProps>>([]);
  const [employee, setEmployee] = useState<Array<SelectProps>>([]);

  //set employee tags
  const employeeTags = useTabStore((state) => state.employeeTags);
  const setEmployeeTags = useTabStore((state) => state.setEmployeeTags);

  //set employees
  const employees = useTabStore((state) => state.employees);
  const setEmployees = useTabStore((state) => state.setEmployees);

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
      const result = await axios.get(`${url}/tags/search/q?name=${queryTags}`);

      const tempResult = result.data.filter((e: any) => {
        return !employeeTags?.some((tag) => {
          return e.id === tag.id;
        });
      });

      setSelectTags(tempResult);
    };

    getTags();
  }, [queryTags, employeeTags]);

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
      const { data } = await axios.get(`${url}/hrms/employee-tags/employee/${selectedEmployee?.employeeId}`);
      setEmployeeTags(data);
      return data;
    },
  });

  useQuery({
    queryKey: ["getEmployeeByTagId", selectedTag],
    enabled: !!selectedTag,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/hrms/employee-tags/tag/${selectedTag?.id}`);
      var employeesFromTag: Array<Employee> = [];

      data.forEach((employeeAndSupervisors: any) => {
        employeeAndSupervisors.employees.forEach((emp: Employee) => {
          employeesFromTag.push(emp);
        });
      });

      setEmployees(employeesFromTag);

      return data;
    },
  });

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
      const result = await axios.post(`${url}/hrms/employee-tags/`, data);
      return result;
    },
    onError: () => {
      setToastOptions("danger", "Something went wrong!", "Failed to add, please contract your administrator.");
    },
    onSuccess: async () => {
      // if active tab is employee
      if (activeTab === "employee") {
        setToastOptions("success", "Success", "You have successfully added a training tag!");
        const { data } = await axios.get(`${url}/hrms/employee-tags/employee/${selectedEmployee?.employeeId}`); // get tags by employee id
        setEmployeeTags(data);
        setTag([]);
      }

      // if active tab is not employee
      else {
        setToastOptions("success", "Success", "You have successfully an employee to the tag");

        const { data } = await axios.get(`${url}/hrms/employee-tags/tag/${selectedTag?.id}`);
        var employeesFromTag: Array<Employee> = [];

        data.forEach((test: any) => {
          test.employees.forEach((emp: Employee) => {
            employeesFromTag.push(emp);
          });
        });
        setEmployees(employeesFromTag);
        // clear the input
        setEmployee([]);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        {open === "employee" ? (
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
                    variant="white"
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
                    <ul role="list" className="divide-y h-[calc(100vh-240px)] overflow-auto bg-gray-50/50 shadow-inner">
                      {employeeTags?.map((item, index) => (
                        //text-sm border rounded-r flex border-l-4 justify-between
                        <li
                          key={index}
                          className="flex justify-between pt-3 pb-3 text-sm group/item hover:bg-slate-100"
                        >
                          <div className="col-span-10 pl-4 ">
                            <h3 className="text-sm">{item.name}</h3>
                          </div>
                          <div className="flex items-center col-span-2 pr-4">
                            {/* <DeleteEmployeeTag id={item.id} /> */}
                            <DeleteEmployeeTag tagId={item.id} employeeId={selectedEmployee.employeeId} />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-end text-sm">Total Tags: {employeeTags?.length}</div>
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
        ) : (
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
                    variant="white"
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
                    <ul role="list" className="divide-y h-[calc(100vh-240px)] overflow-auto bg-gray-50/50 shadow-inner">
                      {employees?.map((item: Employee, index) => (
                        <li key={index} className="flex justify-between py-3 text-sm group/item hover:bg-slate-100">
                          <div className="col-span-10 pl-4">
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
                    <div className="flex justify-end text-sm">Total Employee: {employees?.length}</div>
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
        )}
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
