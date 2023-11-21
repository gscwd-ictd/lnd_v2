"use client";

import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import {
  LspType,
  useAddLspModalStore,
  useLspDetailsStore,
  useLspTypeStore,
} from "@lms/utilities/stores/lsp-details-store";
import { UndrawContractSvg } from "../../UndrawContractSvg";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";

type AwardsMutation = {
  isShowing: boolean;
  type: null | "add" | "edit";
};

const schema = yup.object({
  awards: yup
    .array()
    .of(
      yup.object({
        name: yup.string().notRequired(),
      })
    )
    .notRequired(),
});

export const CreateAwardsAndRecognitionsExternal: FunctionComponent = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const awards = useLspDetailsStore((state) => state.awards);
  const setAwards = useLspDetailsStore((state) => state.setAwards);

  const [awardsVal, setAwardsVal] = useState("");
  const [awardsIndexToEdit, setAwardsIndexToEdit] = useState(-1);
  const [awardsMutation, setAwardsMutation] = useState<AwardsMutation>({ isShowing: false, type: null });
  const setPage = useAddLspModalStore((state) => state.setPage);
  const lspType = useLspTypeStore((state) => state.lspType);

  // on submit
  const onSubmit = () => {
    if (lspType === LspType.INDIVIDUAL) setPage(11);
    else setPage(8);
  };

  const awardsInputRef = useRef(null) as unknown as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (awardsMutation.isShowing) awardsInputRef?.current?.focus();
  }, [awardsMutation.isShowing]);

  useEffect(() => {
    if (!isEmpty(awards)) {
      setValue("awards", awards);
    }
  }, [awards]);

  useEffect(() => {
    register("awards");
  }, []);

  return (
    <>
      <form id="createAwardsAndRecogForm" key="createAwardsAndRecogForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs font-medium text-gray-600">Awards & recognitions</p>
          <Tooltip
            content="Add award & recognition"
            sideOffset={2}
            className="z-50 px-2 py-1 text-xs font-medium text-white rounded bg-zinc-800"
          >
            <button
              type="button"
              className="flex items-center justify-center w-5 h-5 transition-colors rounded hover:bg-gray-100"
              onClick={() => {
                setAwardsMutation({ isShowing: true, type: "add" });
                setAwardsVal("");
                awardsInputRef?.current?.focus();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-700"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </button>
          </Tooltip>
        </div>

        {awards.length === 0 ? (
          <div
            className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg ${
              errors?.awards ? "bg-red-100 border-red-600" : "bg-gray-50/50"
            } `}
          >
            <div className="py-4">
              <div className="flex justify-center">
                <UndrawContractSvg />
              </div>
              <h3
                role="button"
                className="text-gray-500"
                onClick={() => {
                  setAwardsMutation({ isShowing: true, type: "add" });
                  awardsInputRef?.current?.focus();
                }}
              >
                Add awards & recognitions
              </h3>
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {awards.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 text-sm border-l-4 border-r rounded-r border-l-blue-400 border-y"
              >
                <h3 className="col-span-10 py-2 pl-4">{item.name}</h3>
                <div className="flex items-start justify-center col-span-2 gap-1 py-2 text-center">
                  <Tooltip
                    content="Edit"
                    sideOffset={2}
                    className="z-50 px-2 py-1 text-xs font-medium text-white rounded bg-zinc-800"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setAwardsMutation({ isShowing: true, type: "edit" });
                        setAwardsVal(item.name);
                        setAwardsIndexToEdit(index);
                        awardsInputRef?.current?.focus();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </Tooltip>

                  <Tooltip
                    content="Remove"
                    sideOffset={2}
                    className="z-50 px-2 py-1 text-xs font-medium text-white rounded bg-zinc-800"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const newAwards = [...awards];
                        newAwards.splice(index, 1);
                        setAwards(newAwards);
                        setAwardsMutation({ isShowing: false, type: null });
                        setAwardsVal("");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </ul>
        )}

        {awardsMutation.isShowing && (
          <div>
            <input
              value={awardsVal}
              onChange={(e) => setAwardsVal(e.target.value)}
              ref={awardsInputRef}
              type="text"
              placeholder="Please specify the name of award or recognition"
              className="block w-full px-3 py-2 text-xs border-gray-200 rounded placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!isEmpty(awardsVal)) {
                    if (awardsMutation.type === "edit") {
                      // get a copy of the current expertise state
                      const newAwards = [...awards];

                      // update the value of the expertise based on what is typed by the user
                      newAwards[awardsIndexToEdit].name = awardsVal;

                      // set the new state for expertise
                      setAwards(newAwards);

                      // reset the value of editExpertise value for index to update
                      setAwardsIndexToEdit(-1);

                      /**
                       * If type is add
                       */
                    } else if (awardsMutation.type === "add") {
                      // add the new expertise in the array
                      setAwards([...awards, { name: awardsVal }]);
                    }

                    // reset the value of expertiseVal state
                    setAwardsVal("");

                    // reset the value of addExpertise state
                    setAwardsMutation({ isShowing: false, type: null });
                  } else e.preventDefault();
                }
              }}
            />

            <div className="flex items-center gap-1 mt-2">
              <button
                type="button"
                disabled={awardsVal === ""}
                onClick={() => {
                  /**
                   * Check if type id edit
                   */
                  if (awardsMutation.type === "edit") {
                    // get a copy of the current expertise state
                    const newAwards = [...awards];

                    // update the value of the expertise based on what is typed by the user
                    newAwards[awardsIndexToEdit].name = awardsVal;

                    // set the new state for expertise
                    setAwards(newAwards);

                    // reset the value of editExpertise value for index to update
                    setAwardsIndexToEdit(-1);

                    /**
                     * If type is add
                     */
                  } else if (awardsMutation.type === "add") {
                    // add the new expertise in the array
                    setAwards([...awards, { name: awardsVal }]);
                  }

                  // reset the value of expertiseVal state
                  setAwardsVal("");

                  // reset the value of addExpertise state
                  setAwardsMutation({ isShowing: false, type: null });
                }}
                className="inline-flex items-center justify-center gap-2 px-2 py-1 text-xs font-semibold text-white transition-all bg-indigo-500 border border-transparent rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setAwardsMutation({ isShowing: false, type: null });
                  setAwardsVal("");
                }}
                className="inline-flex items-center justify-center gap-2 px-2 py-1 text-xs font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm outline-none hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};
