"use client";

import {
  LspType,
  useEditLspModalStore,
  useLspDetailsStore,
  useLspTypeStore,
} from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { UndrawContractSvg } from "./UndrawContractSvg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";

type AffiliationMutation = {
  isShowing: boolean;
  type: null | "add" | "edit";
};

const schema = yup.object({
  affiliations: yup
    .array()
    .of(
      yup.object({
        position: yup.string().required(),
        institution: yup.string().required(),
      })
    )
    .notRequired(),
});

export const EditAffiliations: FunctionComponent = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const affiliations = useLspDetailsStore((state) => state.affiliations);
  const setAffiliations = useLspDetailsStore((state) => state.setAffiliations);

  const [affiliationMutation, setaffiliationMutation] = useState<AffiliationMutation>({
    isShowing: false,
    type: null,
  });
  const [positionVal, setPositionVal] = useState("");
  const [institutionVal, setInstitutionVal] = useState("");

  const [affiliationIndexToEdit, setAffiliationIndexToEdit] = useState(-1);

  const positionInputRef = useRef(null) as unknown as MutableRefObject<HTMLInputElement>;
  const institutionInputRef = useRef(null) as unknown as MutableRefObject<HTMLInputElement>;
  const page = useEditLspModalStore((state) => state.page);
  const setPage = useEditLspModalStore((state) => state.setPage);

  // on submit
  const onSubmit = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (affiliationMutation.isShowing) positionInputRef?.current?.focus();
  }, [affiliationMutation.isShowing]);

  useEffect(() => {
    if (!isEmpty(affiliations)) {
      setValue("affiliations", affiliations);
    }
  }, [affiliations]);

  useEffect(() => {
    register("affiliations");
  }, []);

  return (
    <>
      <form id="editAffiliationsForm" key="editAffiliationsForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs font-medium text-gray-600">Affilations</p>
          <Tooltip
            content="Add affiliation"
            sideOffset={2}
            className="z-50 px-2 py-1 text-xs font-medium text-white rounded bg-zinc-800"
          >
            <button
              type="button"
              onClick={() => {
                positionInputRef?.current?.focus();
                setaffiliationMutation({ isShowing: true, type: "add" });
                setPositionVal("");
                setInstitutionVal("");
              }}
              className="flex items-center justify-center w-5 h-5 transition-colors rounded hover:bg-gray-100"
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
        {affiliations.length > 0 ? (
          <ul className="space-y-2">
            {affiliations.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 text-sm border-l-4 border-r rounded-r border-l-teal-400 border-y"
              >
                <div className="col-span-10 py-2 pl-4">
                  <h3 className="font-medium">{item.position}</h3>
                  <p className="text-xs text-gray-500">{item.institution}</p>
                </div>
                <div className="flex items-start justify-center col-span-2 gap-1 py-2 text-center">
                  <Tooltip
                    content="Edit"
                    sideOffset={2}
                    className="z-50 px-2 py-1 text-xs font-medium text-white rounded bg-zinc-800"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setAffiliationIndexToEdit(index);
                        setaffiliationMutation({ isShowing: true, type: "edit" });
                        setPositionVal(item.position);
                        setInstitutionVal(item.institution);
                        positionInputRef?.current?.focus();
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
                        const newAffiliations = [...affiliations];
                        newAffiliations.splice(index, 1);
                        setAffiliations(newAffiliations);
                        if (!isEmpty(newAffiliations)) {
                          setValue("affiliations", newAffiliations);
                        } else setValue("affiliations", undefined!);
                        setaffiliationMutation({ isShowing: false, type: null });
                        setPositionVal("");
                        setInstitutionVal("");
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
        ) : (
          <div
            className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg ${
              errors?.affiliations ? "bg-red-100 border-red-600" : "bg-gray-50/50"
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
                  setaffiliationMutation({ isShowing: true, type: "add" });
                  positionInputRef?.current?.focus();
                }}
              >
                {errors?.affiliations ? (
                  <span className="text-red-700">Add at least one affiliation</span>
                ) : (
                  <span className="text-gray-700">Add affiliation details</span>
                )}
              </h3>
            </div>
          </div>
        )}
        {affiliationMutation.isShowing && (
          // this part should be form
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div>
                <label htmlFor="position" className="text-xs font-medium text-gray-600">
                  Position
                </label>
                <input
                  id="position"
                  value={positionVal}
                  ref={positionInputRef}
                  onChange={(e) => setPositionVal(e.target.value)}
                  type="text"
                  placeholder="Please specify the position"
                  className="block w-full px-3 py-2 text-xs border-gray-200 rounded placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (!isEmpty(positionVal)) {
                        institutionInputRef.current?.focus();
                      }
                    }
                  }}
                />
              </div>

              <div>
                <label htmlFor="aff-institution" className="text-xs font-medium text-gray-600">
                  Institution
                </label>
                <input
                  id="aff-institution"
                  value={institutionVal}
                  ref={institutionInputRef}
                  onChange={(e) => setInstitutionVal(e.target.value)}
                  type="text"
                  placeholder="Please specify the institution"
                  className="block w-full px-3 py-2 text-xs border-gray-200 rounded placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (isEmpty(positionVal) && !isEmpty(institutionVal)) {
                        positionInputRef.current?.focus();
                      } else if (!isEmpty(positionVal) && !isEmpty(institutionVal)) {
                        if (affiliationMutation.type === "edit") {
                          // create a copy of education array
                          const newAffiliations = [...affiliations];

                          // set the updated value of the education details on the selected index
                          newAffiliations[affiliationIndexToEdit] = {
                            position: positionVal,
                            institution: institutionVal,
                          };

                          // update the education array
                          setAffiliations(newAffiliations);

                          // reset the index value
                          setAffiliationIndexToEdit(-1);

                          /**
                           * Check if mutation type is add
                           */
                        } else if (affiliationMutation.type === "add") {
                          // add the new education in the array
                          setAffiliations([...affiliations, { position: positionVal, institution: institutionVal }]);
                        }

                        // reset the mutation values
                        setaffiliationMutation({ isShowing: false, type: null });

                        // reset value of degreeVal state
                        setPositionVal("");

                        // reset value of institutionVal state
                        setInstitutionVal("");
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 mt-2">
              <button
                type="button"
                onClick={() => {
                  /**
                   * Check if mutation type is edit
                   */
                  if (affiliationMutation.type === "edit") {
                    // create a copy of education array
                    const newAffiliations = [...affiliations];

                    // set the updated value of the education details on the selected index
                    newAffiliations[affiliationIndexToEdit] = { position: positionVal, institution: institutionVal };

                    // update the education array
                    setAffiliations(newAffiliations);

                    // reset the index value
                    setAffiliationIndexToEdit(-1);

                    /**
                     * Check if mutation type is add
                     */
                  } else if (affiliationMutation.type === "add") {
                    // add the new education in the array
                    setAffiliations([...affiliations, { position: positionVal, institution: institutionVal }]);
                  }

                  // reset the mutation values
                  setaffiliationMutation({ isShowing: false, type: null });

                  // reset value of degreeVal state
                  setPositionVal("");

                  // reset value of institutionVal state
                  setInstitutionVal("");
                }}
                className="inline-flex items-center justify-center gap-2 px-2 py-1 text-xs font-semibold text-white transition-all bg-indigo-500 border border-transparent rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setaffiliationMutation({ isShowing: false, type: null });
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
