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
import { HiTag, HiXCircle } from "react-icons/hi";

type EmployeeProps = {
  employeeId: string;
  fullName: string;
  positionTitle: string;
};

export default function TagsWithEmployeesLeftBak() {
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

  return (
    <>
      <div className="w-full">
        {selectedTag?.id ? (
          <div className="shadow-md rounded  mb-2 p-5 bg-indigo-50 flex gap-2 justify-between items-center">
            <div className="text-slate-600 font-medium flex gap-2 items-center">
              <HiTag />
              {selectedTag ? selectedTag.name : "None"}
            </div>
            <button
              className="text-rose-500 "
              onClick={() => {
                setSelectedTag({ id: "", name: "" });
              }}
            >
              <HiXCircle className="w-6 h-6" />
            </button>
          </div>
        ) : null}

        <DataTable
          datasource={`${url}/tags?page=1&limit=1000`}
          queryKey={[`tags`]}
          columns={columns}
          fullWidthSearch
          onRowClick={(row) => {
            // console.log(row.original);
            setSelectedTag(row.original);
          }}
        />
      </div>
    </>
  );
}
