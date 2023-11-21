import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useAddLspModalStore, useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { set, trim } from "lodash";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  organizationName: yup.string().trim().label("Organization name").required(),
  experience: yup.number().min(0).required(),
  introduction: yup.string().trim().trim().label("Introduction").required(),
});

export const CreateOrganizationDetails: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const setOrganizationName = useLspDetailsStore((state) => state.setOrganizationName);
  const organizationName = useLspDetailsStore((state) => state.organizationName);

  const experience = useLspDetailsStore((state) => state.experience);
  const setExperience = useLspDetailsStore((state) => state.setExperience);

  const introduction = useLspDetailsStore((state) => state.introduction);
  const setIntroduction = useLspDetailsStore((state) => state.setIntroduction);

  const setPage = useAddLspModalStore((state) => state.setPage);

  const onSubmit = () => {
    setPage(2);
  };

  return (
    <>
      <form id="createOrganizationDetailsForm" key="createOrganizationDetailsForm" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="org_name" className="text-xs font-medium text-gray-600">
            Organization name
          </label>
          <Input
            id="org_name"
            size="small"
            {...register("organizationName", {
              value: organizationName,
              onChange: (e) => setOrganizationName(trim(e.target.value)),
            })}
            placeholder="Enter full name of organization"
            className="placeholder:text-xs"
            color={errors?.organizationName ? "error" : "primary"}
            helperText={errors?.organizationName ? errors?.organizationName?.message : undefined}
          />
        </div>

        <div>
          <label htmlFor="org_exp" className="text-xs font-medium text-gray-600">
            Experience
          </label>
          <Input
            id="org_exp"
            size="small"
            {...register("experience", {
              value: Number(experience),
              onChange: (e) => setExperience(Number(e.target.value)),
            })}
            placeholder="Enter number of years of experience"
            className="placeholder:text-xs"
            color={errors?.experience ? "error" : "primary"}
            helperText={errors?.experience ? errors?.experience?.message : undefined}
          />
        </div>

        <div className="mt-1">
          <label htmlFor="org_intro" className="block mb-1 text-xs font-medium text-gray-600">
            Introduction
          </label>
          <textarea
            id="org_intro"
            {...register("introduction", {
              value: introduction,
              onChange: (e) => setIntroduction(trim(e.target.value)),
            })}
            rows={2}
            placeholder="Please enter the LSP's preferred introduction here"
            className={`block w-full px-4 py-3 text-sm ${
              errors?.introduction
                ? "border border-red-600 focus:ring-red-100 "
                : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs`}
          />
          {errors?.introduction ? (
            <span className="pl-1 text-xs text-red-500">{errors?.introduction?.message}</span>
          ) : null}
        </div>
      </form>
    </>
  );
};
