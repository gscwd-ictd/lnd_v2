"use client";

import {
  Fragment,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import _debounce from "lodash/debounce";
import { Column } from "@tanstack/react-table";
import { DataTableColumnHeaderContext } from "../../data-table-column-header/view/DataTableColumnHeader";
import { Combobox } from "@headlessui/react";
import { number } from "yup";

type DataTableColumnSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  wait?: number;
  column: Column<any, unknown>;
};

export const DataTableColumnSearch = forwardRef<HTMLInputElement, DataTableColumnSearchProps>(
  ({ wait = 500, column, className, ...restProps }, forwardedRef) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [selected, setSelected] = useState("");
    const { setOpen } = useContext(DataTableColumnHeaderContext);

    const sortedUniqueValues = useMemo(() => Array.from(column.getFacetedUniqueValues().keys()).sort(), [column]);

    const onSearch = (value: string) => {
      if (value === "") column.setFilterValue(value);
      setSearchVal(value);
    };

    const debounce = (fn: Function) => {
      let timer: NodeJS.Timeout | null;
      return (...args: any[]) => {
        setIsSearching(true);
        const context = this;
        if (timer) clearTimeout(timer!);

        timer = setTimeout(() => {
          setIsSearching(false);
          timer = null;
          fn.apply(context, args);
        }, wait);
      };
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(debounce(onSearch), []);

    useEffect(() => {
      const initialValue = column.getFilterValue() ?? "";
      setSearchInput(initialValue as string);
    }, [column]);

    useEffect(() => {
      const filtered =
        searchVal === ""
          ? sortedUniqueValues
          : sortedUniqueValues.filter((item: string) =>
              item.toString().toLowerCase().includes(searchVal.toLowerCase())
            );

      setFilteredData(filtered);
    }, [searchVal, sortedUniqueValues]);

    useEffect(() => {
      if (selected !== "") {
        setOpen(false);
      }
    }, [selected, setOpen]);

    return (
      <Combobox
        as="div"
        className="relative"
        value={selected}
        onChange={(value) => {
          setSelected(value);
          setSearchInput(value);
          column.setFilterValue(value);
        }}
      >
        {({ open }) => (
          <>
            <div className="flex items-center">
              <Combobox.Input
                {...restProps}
                ref={forwardedRef}
                className="w-full h-10 px-8 text-sm outline-none focus:ring-0 placeholder:text-gray-400 border-b-gray-200 border-x-transparent border-t-transparent focus:border-x-transparent focus:border-t-transparent focus:border-gray-200"
                value={searchInput}
                onChange={(e) => {
                  debounceFn(e.target.value);
                  setSearchInput(e.target.value);
                }}
              />
              {!isSearching ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute w-5 h-5 text-gray-500 left-2"
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
                  className="absolute w-5 h-5 text-gray-500 left-2 animate-spin"
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
              <button
                className="absolute flex items-center justify-center w-4 h-4 text-white bg-gray-400 rounded-full right-2"
                onClick={() => {
                  column.setFilterValue("");
                  setSearchInput("");
                  setSearchVal("");
                  setOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            {open ? (
              <>
                <Combobox.Options as="ul" className="overflow-x-hidden overflow-y-auto max-h-40 border-y">
                  {filteredData.map((item, index) => (
                    <Combobox.Option key={index} value={item} as={Fragment}>
                      {({ selected, active }) => (
                        <li
                          role="button"
                          className={`${active ? "bg-zinc-100" : ""} flex px-2 py-1 w-56 hover:bg-zinc-100`}
                        >
                          <span
                            className={`${
                              selected ? "text-gray-800" : "text-gray-600"
                            } truncate text-sm pr-2 cursor-pointer w-full`}
                          >
                            {item}
                          </span>
                        </li>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
                <footer className="flex justify-center p-2 text-xs font-medium text-gray-500 border-t">
                  {filteredData.length === 1 ? <>{filteredData.length} item</> : <>{filteredData.length} items</>}
                </footer>
              </>
            ) : (
              <div className="flex items-center justify-center p-2">
                <Combobox.Button as="button" className="text-xs font-medium text-gray-300">
                  Search this column
                </Combobox.Button>
              </div>
            )}
          </>
        )}
      </Combobox>
    );
  }
);

DataTableColumnSearch.displayName = "DataTableColumnSearch";
