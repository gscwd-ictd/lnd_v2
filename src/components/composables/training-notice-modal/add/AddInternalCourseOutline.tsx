"use client";

import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { UndrawContractSvg } from "../../lsp-modal/UndrawContractSvg";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import {
  SelectedTrainingDesign,
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
} from "@lms/utilities/stores/training-notice-store";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { LearningServiceProvider } from "@lms/utilities/types/lsp";
import { Combobox } from "@headlessui/react";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { TrainingSource } from "@lms/lib/types/training-source.type";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isEmpty } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";

type CourseContentMutation = {
  type: "add" | "edit" | null;
  isShowing: boolean;
};

const internalSchema = yup.object({
  courseTitle: yup.object<{ id: string; courseTitle: string; createdAt: string; updatedAt: string }>().shape({
    id: yup.string().required(),
    courseTitle: yup.string().required(),
    createdAt: yup.string().required(),
    updatedAt: yup.string().required(),
  }),
  facilitators: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
        type: yup.string().required(),
      })
    )
    .notRequired(),
  courseContent: yup
    .array()
    .of(
      yup.object({
        title: yup.string().required(),
      })
    )
    .required(),
});

export const AddInternalCourseOutline: FunctionComponent = () => {
  const [courseVal, setCourseVal] = useState("");
  const [courseContentsMutation, setCourseContentsMutation] = useState<CourseContentMutation>({
    isShowing: false,
    type: null,
  });
  const [courseIndexToEdit, setCourseIndexToEdit] = useState(-1);
  // const [facilitators, setFacilitators] = useState<Facilitator[]>();
  const facilitators = useTrainingNoticeStore((state) => state.facilitators);
  const setFacilitators = useTrainingNoticeStore((state) => state.setFacilitators);
  const selectedTrainingSource = useTrainingNoticeStore((state) => state.selectedTrainingSource);
  const [selectedLspType, setSelectedLspType] = useState<"individual" | "organization">(
    selectedTrainingSource.name === "External" ? "organization" : "individual"
  );
  const lspSource = useLspSourceStore((state) => state.lspSource);
  const [searchFaci, setSearchFaci] = useState("");
  const [searchTd, setSearchTd] = useState<string>("");
  const [trainingDesigns, setTrainingDesigns] = useState<SelectedTrainingDesign[]>([]);
  const addCourseContentBtnRef = useRef(null) as unknown as MutableRefObject<HTMLButtonElement>;

  const {
    selectedTrainingDesign,
    trainingDesign,
    courseContent,
    setCourseContents,
    selectedFacilitators,
    setHasSelectedFacilitators,
    hasSelectedFacilitators,
    setSelectedFacilitators,
    setTrainingDesign,
    setSelectedTrainingDesign,
    setCourseTitle,
    setLspDetails,
  } = useTrainingNoticeStore((state) => ({
    courseTitle: state.courseTitle,
    trainingDesign: state.trainingDesign,
    selectedTrainingDesign: state.selectedTrainingDesign,
    facilitator: state.facilitator,
    selectedFacilitators: state.selectedFacilitators,
    courseContent: state.courseContent,
    selectedFacilitator: state.selectedFacilitator,
    hasSelectedFacilitators: state.hasSelectedFacilitators,
    setHasSelectedFacilitators: state.setHasSelectedFacilitators,
    setCourseContents: state.setCourseContent,
    setSelectedFacilitator: state.setSelectedFacilitator,
    setSelectedTrainingDesign: state.setSelectedTrainingDesign,
    setTrainingDesign: state.setTrainingDesign,
    setCourseTitle: state.setCourseTitle,
    setSelectedFacilitators: state.setSelectedFacilitators,
    setFacilitator: state.setFacilitator,
    setLspDetails: state.setLspDetails,
  }));

  const setPage = useTrainingNoticeModalStore((state) => state.setPage);
  const modalIsOpen = useTrainingNoticeModalStore((state) => state.modalIsOpen);

  const courseInputRef = useRef(null) as unknown as MutableRefObject<HTMLInputElement>;
  const [individualInternalTabIsLocked, setIndividualInternalTabIsLocked] = useState<boolean>(false);
  const [individualExternalTabIsLocked, setIndividualExternalTabIsLocked] = useState<boolean>(false);
  const [organizationTabIsLocked, setOrganizationTabIsLocked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm({ resolver: yupResolver(internalSchema), mode: "onChange" });

  // Node: This is just a patch solution. This should be addressed ASAP
  // TODO the union of individual and organization lsp's for fetching its details should be handled by the server.
  useEffect(() => {
    const getTrainingDesigns = async () => {
      const result = await axios.get(`${url}/training/designs?limit=500`);
      setTrainingDesigns(result.data.items);
    };

    getTrainingDesigns();

    // fetchFacilitators();
  }, []);

  useQuery({
    queryKey: ["trainingFacilitators"],
    enabled: hasSelectedFacilitators === false,
    queryFn: async () => {
      // const individualInternal = await axios.get(`${url}/lsp-details/individual/internal?page=1&limit=200`);
      const individualInternal = await axios.get(`${url}/lsp/q?type=individual&source=internal&page=1&limit=200`);
      // const individualExternal = await axios.get(`${url}/lsp-details/individual/external?page=1&limit=200`);
      const individualExternal = await axios.get(`${url}/lsp/q?type=individual&source=external&page=1&limit=200`);

      // const organization = await axios.get(`${url}/lsp-details/organization?page=1&limit=200`);
      const organization = await axios.get(`${url}/lsp/q?type=organization&page=1&limit=200`);

      let newFacilitators: {
        id: string;
        name: string;
        email: string;
        type: "individual" | "organization";
        source: "internal" | "external";
      }[] = [];

      individualInternal.data.items.forEach((individualInternalLsp: LearningServiceProvider) => {
        newFacilitators.push({
          id: individualInternalLsp.id!,
          name: individualInternalLsp.name,
          email: individualInternalLsp.email,
          type: "individual",
          source: "internal",
        });
      });

      individualExternal.data.items.forEach((individualExternalLsp: LearningServiceProvider) => {
        newFacilitators.push({
          id: individualExternalLsp.id!,
          name: individualExternalLsp.name,
          email: individualExternalLsp.email,
          type: "individual",
          source: "external",
        });
      });

      organization.data.items.forEach((organizationLsp: LearningServiceProvider) => {
        newFacilitators.push({
          id: organizationLsp.id!,
          name: organizationLsp.name,
          email: organizationLsp.email,
          type: "organization",
          source: "external",
        });
      });
      newFacilitators.sort((a, b) => (a.name > b.name ? 1 : -1));

      setFacilitators(newFacilitators);
      return { individualInternal, individualExternal, organization };
    },
  });

  // filtered training designs
  const filteredTds =
    searchTd === ""
      ? trainingDesigns
      : trainingDesigns.filter((element) => element.courseTitle.toLowerCase().includes(searchTd.toLowerCase()));

  // filtered facilitators
  const filteredFacilitators =
    searchFaci === ""
      ? facilitators
      : facilitators?.filter((faci) => faci.name.toLowerCase().includes(searchFaci.toLowerCase()));

  // on submit
  const onSubmit = () => setPage(4);

  // re-focus on the ref
  useEffect(() => {
    if (courseContentsMutation.isShowing) courseInputRef?.current?.focus();
  }, [courseContentsMutation.isShowing]);

  //  set the training design form value
  useEffect(() => {
    if (!isEmpty(selectedTrainingDesign?.id)) {
      // set here
      setValue("courseTitle", {
        id: selectedTrainingDesign.id!,
        courseTitle: selectedTrainingDesign.courseTitle,
        createdAt: selectedTrainingDesign.createdAt!,
        updatedAt: selectedTrainingDesign.updatedAt!,
      });
      clearErrors("courseTitle");
    }
  }, [selectedTrainingDesign]);

  // set the course content form value
  useEffect(() => {
    if (!isEmpty(courseContent)) {
      setValue("courseContent", courseContent);
    } else if (courseContent.length === 0 || courseContent === undefined) {
      setValue("courseContent", undefined!);
    }
  }, [courseContent]);

  // set the facilitator form value
  useEffect(() => {
    if (!isEmpty(selectedFacilitators)) {
      if (selectedFacilitators.filter((f) => f.type === "individual" && f.source === "internal").length > 0) {
        setOrganizationTabIsLocked(true);
        setIndividualExternalTabIsLocked(true);
      } else if (selectedFacilitators.filter((f) => f.type === "individual" && f.source === "external").length > 0) {
        setOrganizationTabIsLocked(true);
        setIndividualInternalTabIsLocked(true);
      } else if (selectedFacilitators.filter((f) => f.type === "organization").length > 0) {
        setIndividualExternalTabIsLocked(true);
        setIndividualInternalTabIsLocked(true);
      }

      setValue("facilitators", selectedFacilitators);
      clearErrors("facilitators");
      setHasSelectedFacilitators(true);
    } else {
      setOrganizationTabIsLocked(false);
      setIndividualExternalTabIsLocked(false);
      setIndividualInternalTabIsLocked(false);
    }
  }, [selectedFacilitators, selectedTrainingSource]);

  // reset
  useEffect(() => {
    if (!modalIsOpen) {
      reset();
    }
  }, [modalIsOpen]);

  // register the necessary inputs for the forms
  useEffect(() => {
    register("courseTitle");
    register("facilitators");
    register("courseContent");
  }, []);

  return (
    <>
      <form id="internalCourseOutlineForm" key="internalCourseOutlineForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-1">
          <div className="mt-1 mb-4">
            <div className="mb-2">
              <label htmlFor="training-design" className="block text-xs font-medium text-gray-700">
                Course Title <span className="text-red-600 text-md">*</span>
              </label>
              <p className="text-xs text-gray-500">
                A concise and descriptive identifier that reflects the content, focus, or objectives of the training.
              </p>
            </div>
            <div className="relative">
              <Combobox
                value={selectedTrainingDesign}
                onChange={(value) => {
                  /** this selects the previously selected tag and compares it to the event value
                   * and sets the hasfetchedrecommendations boolean variable
                   */

                  setSelectedTrainingDesign(value);
                  setTrainingDesign({
                    id: value.id,
                    courseTitle: value.courseTitle,
                    createdAt: value.createdAt,
                    updatedAt: value.updatedAt,
                  });
                  setCourseTitle(value.courseTitle);
                }}
              >
                <Combobox.Input as={React.Fragment} displayValue={() => selectedTrainingDesign?.courseTitle}>
                  <Input
                    id="search-td"
                    size="small"
                    color={!isEmpty(errors.courseTitle) ? "error" : "primary"}
                    helperText={
                      errors.courseTitle ? "Please select a course title from the list of training designs" : undefined
                    }
                    autoComplete="off"
                    placeholder="Search course title from the list of training designs"
                    className=" placeholder:text-xs"
                    onChange={(e) => {
                      setTrainingDesign({ ...trainingDesign, courseTitle: e.target.value });
                      setSearchTd(e.target.value);
                    }}
                  />
                </Combobox.Input>

                <Combobox.Options className="absolute max-h-52 z-[80] overflow-y-auto bg-white w-full border rounded-md shadow-lg shadow-gray-100">
                  {filteredTds?.length === 0 ? (
                    <div className="flex items-center justify-center py-10">No results found</div>
                  ) : (
                    filteredTds?.map((td, index) => {
                      return (
                        <Combobox.Option key={index} value={td}>
                          {({ active }) => {
                            return (
                              <div
                                role="button"
                                className={`${
                                  active ? "bg-indigo-500 text-white" : ""
                                } border-b border-b-gray-100 px-2 py-1`}
                              >
                                <h3 className={`${active ? "text-indigo-50" : "text-gray-700"} `}>
                                  <span className="font-medium"> {td.courseTitle} </span>
                                </h3>
                                <span className={`text-sm ${active ? "text-indigo-50" : "text-gray-500"}`}>
                                  Updated on {dayjs(td.updatedAt ?? td.createdAt).format("MMM DD, YYYY HH:mm A")}
                                </span>
                              </div>
                            );
                          }}
                        </Combobox.Option>
                      );
                    })
                  )}
                </Combobox.Options>
              </Combobox>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div className="mb-2">
            <label htmlFor="facilitator" className="block text-xs font-medium text-gray-700">
              Facilitator <span className="text-red-600 text-md">*</span>
            </label>
            <p className="text-xs text-gray-500">The ones responsible for leading and guiding the training process.</p>
          </div>
          <div className={`grid grid-cols-2 gap-1 mb-2`}>
            {selectedFacilitators.map((faci) => {
              return (
                <div
                  key={faci.id}
                  className="flex items-center  justify-between gap-2  space-x-2 text-xs text-gray-800 rounded select-none bg-stone-200 "
                >
                  <span className="w-[80%] pl-2.5 break-words py-3">{faci.name}</span>
                  <button
                    onClick={() => {
                      const newSelectedFacilitators = selectedFacilitators.filter((newFaci) => newFaci.id !== faci.id);
                      const newFacilitators = [...facilitators];
                      newFacilitators.push(faci);
                      newFacilitators.sort((a, b) => (a.name > b.name ? 1 : -1));
                      setFacilitators(newFacilitators);
                      setSelectedFacilitators(newSelectedFacilitators);
                    }}
                    type="button"
                    className="h-full w-[20%] flex items-center"
                  >
                    {/* <span className="flex items-center justify-center w-full">x</span> */}

                    <span className="flex items-center justify-center w-full h-full font-semibold rounded hover:bg-red-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="black"
                        className="w-3 h-3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="relative">
            <Combobox
              value={selectedFacilitators}
              multiple
              onChange={(value) => {
                const newValues = facilitators.filter((x) => !value.includes(x));

                if (value[0].type === "organization" && value.length === 1) {
                  setSelectedFacilitators(value);
                  setFacilitators(newValues);
                } else if (value[0].type === "organization" && value.length > 1) {
                  setError("facilitators", { message: "Only 1 facilitator for organization is allowed" });
                } else if (value[0].type === "individual") {
                  setSelectedFacilitators(value);
                  setFacilitators(newValues);
                }
              }}
            >
              <Combobox.Input
                // displayValue={(fac: Array<Facilitator>) => fac.map((fac) => fac.name).join(", ")}
                as={React.Fragment}
              >
                <Input
                  id="search-emp"
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => setSearchFaci(e.target.value)}
                  size="small"
                  color={!isEmpty(errors.facilitators) ? "error" : "primary"}
                  helperText={errors.facilitators ? errors?.facilitators?.message : undefined}
                  placeholder="Search for facilitator"
                  className="placeholder:text-xs"
                />
              </Combobox.Input>

              <Combobox.Options className="absolute max-h-52 z-[80] overflow-y-auto bg-white w-full border rounded-md shadow-lg shadow-gray-100">
                <div className="flex w-full mb-4 bg-gray-100">
                  {/* INTERNAL INDIVIDUAL */}

                  {lspSource === "internal" && (
                    <button
                      type="button"
                      disabled={individualInternalTabIsLocked}
                      className={`px-2 py-1 hover:bg-indigo-100 disabled:cursor-not-allowed ${
                        selectedLspType === "individual" && lspSource === "internal"
                          ? "bg-white text-gray-800 font-medium rounded-t border-b-4 border-indigo-400"
                          : "text-gray-500 bg-gray-200 border-none"
                      }`}
                      onClick={() => {
                        setSelectedLspType("individual");
                      }}
                    >
                      <span className="text-xs">Individual Internal</span>
                    </button>
                  )}

                  {/* EXTERNAL INDIVIDUAL */}
                  {lspSource === "external" && (
                    <>
                      <button
                        type="button"
                        disabled={individualExternalTabIsLocked}
                        className={`px-2 py-1 hover:bg-indigo-100 disabled:cursor-not-allowed ${
                          selectedLspType === "individual" && lspSource === "external"
                            ? "bg-white text-gray-800 font-medium rounded-t border-b-4 border-indigo-400"
                            : "text-gray-500 bg-gray-200 border-none"
                        }`}
                        onClick={() => {
                          setSelectedLspType("individual");
                        }}
                      >
                        <span className="text-xs">Individual External</span>
                      </button>
                      {/* EXTERNAL ORGANIZATION */}
                      <button
                        type="button"
                        disabled={organizationTabIsLocked}
                        className={`px-2 py-1 hover:bg-indigo-100 disabled:cursor-not-allowed ${
                          selectedLspType === "organization"
                            ? "bg-white text-gray-800 font-medium rounded-t border-b-4 border-indigo-400"
                            : "text-gray-500 bg-gray-200 border-none"
                        }`}
                        onClick={() => {
                          setSelectedLspType("organization");
                        }}
                      >
                        <span className="text-xs">Organization</span>
                      </button>
                    </>
                  )}
                </div>

                {filteredFacilitators?.length === 0 ? (
                  <div className="flex items-center justify-center py-10">No results found</div>
                ) : (
                  filteredFacilitators
                    ?.filter((faci) => faci.type === selectedLspType && faci.source === lspSource)
                    .map((faci, index) => {
                      return (
                        <Combobox.Option key={index} value={faci}>
                          {({ active, selected }) => {
                            return (
                              <div
                                role="button"
                                className={`${
                                  selected ? "bg-gray-300  text-white " : active ? "bg-gray-100" : ""
                                } border-b  border-b-gray-100 px-2 py-1`}
                              >
                                <h3 className={`${selected ? "text-gray-700" : "text-gray-700"} font-medium`}>
                                  {selected ? "✓ " : null}
                                  {faci.name}
                                </h3>
                                <p className={`${selected ? "" : "text-gray-400"} text-xs`}>{faci.email}</p>
                              </div>
                            );
                          }}
                        </Combobox.Option>
                      );
                    })
                )}
              </Combobox.Options>
            </Combobox>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-3 mb-2">
          <div>
            <p className="text-xs font-medium text-gray-600">
              Course Content <span className="text-red-600 text-md">*</span>
            </p>
            <p className="text-xs text-gray-500">The specific subject matter & topics covered in the training.</p>
          </div>
          <Tooltip
            content="Add course content"
            sideOffset={2}
            className="z-50 px-2 py-1 text-xs font-medium text-white rounded bg-zinc-800"
          >
            <button
              className="flex items-center justify-center w-5 h-5 transition-colors rounded hover:bg-gray-100"
              ref={addCourseContentBtnRef}
              type="button"
              onClick={() => {
                setCourseContentsMutation({ isShowing: true, type: "add" });
                setCourseVal("");
                courseInputRef?.current?.focus();
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

        {courseContent?.length === 0 ? (
          <div
            className={`flex items-center justify-center w-full border-2 border-dashed ${
              errors.courseContent ? "border-red-500 bg-red-100/50" : "border-gray-200 bg-gray-50/50"
            } rounded-lg `}
          >
            <div className="py-4">
              <div className="flex justify-center">
                <UndrawContractSvg />
              </div>
              <h3 className={`${errors.courseContent ? "text-red-500" : "text-gray-500"}`}>
                {errors.courseContent ? "Add at least one Course Content" : "Nothing to display"}
              </h3>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {courseContent?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 text-sm border-l-4 border-r rounded-r border-l-rose-400 border-y"
              >
                <div className="col-span-10 py-2 pl-4">
                  <h3 className="font-medium">{item.title}</h3>
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
                        courseInputRef?.current?.focus();
                        setCourseIndexToEdit(index);
                        setCourseVal(item.title);
                        setCourseContentsMutation({ isShowing: true, type: "edit" });
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
                        const newCourseContents = [...courseContent];
                        newCourseContents.splice(index, 1);
                        setCourseContents(newCourseContents);
                        setCourseVal("");
                        courseInputRef?.current?.focus();
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
          </div>
        )}

        {courseContentsMutation.isShowing && (
          <div>
            <Input
              ref={courseInputRef}
              id="course-content"
              value={courseVal}
              onChange={(e) => setCourseVal(e.target.value)}
              placeholder={`Press 'Enter' to add ${
                courseContent?.length > 0 ? "more" : ""
              }. Press 'Esc' to close this box.`}
              size="small"
              className="w-full mt-2 placeholder:text-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!isEmpty(courseVal)) {
                    if (courseContentsMutation.type === "edit") {
                      // get a copy of the current expertise state
                      const newCourseContents = [...courseContent];

                      // update the value of the expertise based on what is typed by the user
                      newCourseContents[courseIndexToEdit].title = courseVal;

                      // set the new state for expertise
                      setCourseContents(newCourseContents);

                      // set the new value to form register
                      // setValue("courseContent", newCourseContents);

                      // reset the value of editExpertise value for index to update
                      setCourseIndexToEdit(-1);

                      /**
                       * If type is add
                       */
                    } else if (courseContentsMutation.type === "add") {
                      // add the new expertise in the array
                      setCourseContents([...courseContent, { title: courseVal }]);

                      // set the new value to form register
                      // setValue("courseContent", [...courseContent, { title: courseVal }]);

                      // focus
                      addCourseContentBtnRef?.current?.focus();

                      // clear errors
                      clearErrors("courseContent");
                    }

                    // reset the value of expertiseVal state
                    setCourseVal("");

                    // reset the value of addExpertise state
                    setCourseContentsMutation({ isShowing: false, type: null });
                  } else e.preventDefault();
                } else if (e.key === "Escape") {
                  setCourseContentsMutation({ isShowing: false, type: null });
                  setCourseVal("");
                }
              }}
            />

            <div className="flex items-center gap-1 mt-2">
              <button
                disabled={courseVal === ""}
                type="button"
                onClick={() => {
                  /**
                   * Check if type id edit
                   */
                  if (courseContentsMutation.type === "edit") {
                    // get a copy of the current expertise state
                    const newCourseContents = [...courseContent];

                    // update the value of the expertise based on what is typed by the user
                    newCourseContents[courseIndexToEdit].title = courseVal;

                    // set the new state for expertise
                    setCourseContents(newCourseContents);

                    // set the new value to form register
                    // setValue("courseContent", newCourseContents);

                    // reset the value of editExpertise value for index to update
                    setCourseIndexToEdit(-1);

                    /**
                     * If type is add
                     */
                  } else if (courseContentsMutation.type === "add") {
                    // add the new expertise in the array
                    setCourseContents([...courseContent, { title: courseVal }]);

                    // set the new value to form register
                    // setValue("courseContent", [...courseContent, { title: courseVal }]);

                    // clear errors
                    clearErrors("courseContent");
                  }

                  addCourseContentBtnRef?.current?.focus();

                  // reset the value of expertiseVal state
                  setCourseVal("");

                  // reset the value of addExpertise state
                  setCourseContentsMutation({ isShowing: false, type: null });
                }}
                className="inline-flex items-center justify-center gap-2 px-2 py-1 text-xs font-semibold text-white transition-all bg-indigo-500 border border-transparent rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setCourseContentsMutation({ isShowing: false, type: null });
                  setCourseVal("");
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
