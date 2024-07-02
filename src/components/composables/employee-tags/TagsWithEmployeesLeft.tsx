"use client";

import { useTabStore } from "@lms/utilities/stores/employee-tags-store";
import { Tag } from "@lms/utilities/types/tags";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, Fragment, MutableRefObject, useCallback, useRef, useState } from "react";
import { HiExclamationCircle, HiTag, HiXCircle } from "react-icons/hi";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export default function TagsWithEmployeesLeft() {
  //tags tab state

  const [tags, setTags] = useState<Array<Tag>>([]);
  const [filteredTags, setFilteredTags] = useState<Array<Tag>>([]);

  const queryTag = useTabStore((state) => state.queryTag);
  const setQueryTag = useTabStore((state) => state.setQueryTag);

  const setSelectedTag = useTabStore((state) => state.setSelectedTag);
  const setSearchEmployee = useTabStore((state) => state.setSearchTagEmployee);
  const selectedTag = useTabStore((state) => state.selectedTag);
  const employees = useTabStore((state) => state.employees);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { isLoading, isError } = useQuery({
    queryKey: ["get-all-tags"],
    enabled: !queryTag,
    queryFn: async () => {
      // const { data } = await axios.get(`${url}/employee-tags/tag/${selectedTag?.id}`);
      const { data } = await axios.get(`${url}/tags?page=1&limit=1000`);
      setTags(data.items);
      setFilteredTags(data.items);

      return data.items;
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
    debounce(() => setQueryTag),
    []
  );

  // initialize ref for search input
  const queryTagRef = useRef(null) as unknown as MutableRefObject<HTMLInputElement>;

  const onSearch = (event: FormEvent<HTMLInputElement>) => {
    // get the current value of the search input
    const value = event.currentTarget.value;

    // filtered result
    const filteredResult: Array<Tag> = tags.filter((tag: Tag) => tag.name.toLowerCase().includes(value.toLowerCase()));

    debounceFn(value);
    setQueryTag(value);

    // update the state of the filtered tags
    setFilteredTags(filteredResult);
  };

  // clear search
  const onClearSearch = () => {
    // set focus on the search input
    queryTagRef.current.focus();

    // set the search value back to default
    setQueryTag("");

    // set the filtered tags back to default
    setFilteredTags(tags);
  };

  return (
    <>
      <div className="w-full">
        {selectedTag?.id ? (
          <div className="shadow-md rounded p-5 mb-2 bg-indigo-100/80 flex gap-2 justify-between items-center">
            <div className="text-slate-600 font-medium flex gap-4 items-center">
              <div>
                <HiTag className="w-8 h-8 text-slate-500" />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-slate-700 text-lg">{selectedTag.name}</div>
                <div className="font-light text-gray-600 text-sm">
                  {employees.length === 0 ? "No" : employees.length} assigned{" "}
                  {employees.length > 1 ? "employees" : "employee"}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="border p-2 bg-white w-full">
          <div className="relative px-4 pt-1 items-center">
            <input
              ref={queryTagRef}
              onChange={(event) => onSearch(event)}
              value={queryTag}
              className="flex w-full px-4 py-3 mb-2 pl-11 text-sm transition-colors bg-gray-100 border-transparent rounded-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Search tag..."
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

            {selectedTag?.id ? (
              <div className="absolute inset-y-0 mt-1 right-0 z-20 flex items-center pr-8 ">
                <button
                  onClick={() => {
                    setSelectedTag({ id: "", name: "" });
                    onClearSearch();
                  }}
                >
                  <HiXCircle className="w-5 h-5 text-gray-400 hover:text-gray-500 active:text-gray-600" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-full justify-center flex">
            <div className="flex flex-col justify-center items-center">
              <Spinner size="medium" />
              <div className="font-sans">Loading tags...</div>
            </div>
          </div>
        ) : isError && !isLoading ? (
          <div className="w-full h-full justify-center flex">
            <div className="flex flex-col justify-center items-center">
              <div className="font-sans flex items-center gap-2">
                <HiExclamationCircle className="text-rose-700 w-6 h-6" /> Error Loading tags.
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border">
            {filteredTags.length > 0 ? (
              <div className="bg-gray-100 text-xs border-b text-gray-700 font-medium px-6 py-3">Tag Name</div>
            ) : null}
            <div className="overflow-y-auto overflow-x-hidden h-full">
              {filteredTags.map((tag) => {
                return (
                  <button
                    key={tag.id}
                    className="odd:bg-white odd:hover:bg-gray-50 even:bg-gray-100 even:hover:bg-gray-200/75 px-6 py-3 text-gray-700 text-xs flex flex-col w-full"
                    onClick={() => {
                      setSelectedTag(tag);
                      debounceFn(tag.name);
                      setQueryTag(tag.name);
                      setSearchEmployee("");
                    }}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
