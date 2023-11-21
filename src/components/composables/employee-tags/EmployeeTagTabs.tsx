"use client";

import { Combobox } from "@headlessui/react";
import { TabContentWrap, Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/osprey/ui/tabs/view/Tabs";
import { useDebounce } from "@lms/hooks/use-debounce";
import { useTabStore } from "@lms/utilities/stores/employee-tags-store";
import { Tag } from "@lms/utilities/types/tags";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type EmployeeProps = {
  employeeId: string;
  fullName: string;
  positionTitle: string;
};

export default function EmployeeTagTabs() {
  const tabs = useTabStore((state) => state.setActiveTab);

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

  // useEffect(() => {
  //   console.log(selectedEmployee);
  // }, [selectedEmployee]);

  useEffect(() => {
    if (query.length >= 3) {
      const getEmployee = async () => {
        const result = await axios.get(`${url}/hrms/employees/q?name=${query}`);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(useDebounce(500, setQueryTag), []);

  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger
          value="tab1"
          onClick={() => {
            tabs("employee");
          }}
        >
          Employee
        </TabsTrigger>
        <TabsTrigger
          value="tab2"
          onClick={() => {
            tabs("tags");
          }}
        >
          Tags
        </TabsTrigger>
      </TabsList>
      <TabContentWrap>
        <TabsContent value="tab1">
          <Combobox
            defaultValue={selectedEmployee}
            onChange={
              (value) => {
                setSelectedEmployee(value);
              }
              // setSelectedEmployee
            }
          >
            <div className="relative">
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className="block w-full text-sm transition-colors border border-gray-200 rounded outline-none placeholder:text-gray-300 focus:ring-2 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
                // displayValue={() => {
                //   return selectedEmployee.fullName;
                // }}
                // displayValue={() => (selectedEmployee !== undefined ? selectedEmployee.fullName : "")}
                displayValue={() => (selectedEmployee !== undefined ? selectedEmployee.fullName : "")}
                placeholder="Select employee"
              />
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
        </TabsContent>
        <TabsContent value="tab2">
          <Combobox
            defaultValue={selectedTag}
            onChange={(value) => {
              setSelectedTag(value);
            }}
          >
            <div className="relative">
              <Combobox.Input
                onChange={(event) => {
                  //setQueryTag(event.target.value);
                  debounceFn(event.target.value);
                }}
                className="block w-full text-sm transition-colors border border-gray-200 rounded outline-none placeholder:text-gray-300 focus:ring-2 focus:border-indigo-400 focus:ring-indigo-100 hover:border-indigo-400"
                displayValue={() => (selectedTag !== undefined ? selectedTag.name : "")}
                placeholder="Select tag"
              />
              <Combobox.Options className="absolute w-full p-1 space-y-1 overflow-auto bg-white rounded-sm max-h-60">
                {tags.length === 0 && queryTag !== "" ? (
                  <div className="p-2 text-sm">No records.</div>
                ) : (
                  <>
                    {tags.map((tag) => (
                      <Combobox.Option
                        key={tag.id}
                        value={tag}
                        className={({ active }) => `select-none p-1 ${active ? "bg-slate-200 rounded-sm" : ""}`}
                      >
                        <div className="text-sm">{tag.name}</div>
                      </Combobox.Option>
                    ))}
                  </>
                )}
              </Combobox.Options>
            </div>
          </Combobox>
        </TabsContent>
      </TabContentWrap>
    </Tabs>
  );
}
