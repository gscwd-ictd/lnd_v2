import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const OrganizationDetails: FunctionComponent = () => {
  const setOrgFullName = useLspDetailsStore((state) => state.setOrganizationName);
  const orgFullName = useLspDetailsStore((state) => state.organizationName);

  const experience = useLspDetailsStore((state) => state.experience);
  const setExperience = useLspDetailsStore((state) => state.setExperience);

  const introduction = useLspDetailsStore((state) => state.introduction);
  const setIntroduction = useLspDetailsStore((state) => state.setIntroduction);

  return (
    <>
      <div>
        <label htmlFor="org_name" className="text-xs font-medium text-gray-600">
          Full name
        </label>
        <Input
          id="org_name"
          size="small"
          defaultValue={orgFullName}
          onChange={(e) => setOrgFullName(e.target.value)}
          placeholder="Enter full name of organization"
          className="placeholder:text-xs"
        />
      </div>

      <div>
        <label htmlFor="org_exp" className="text-xs font-medium text-gray-600">
          Experience
        </label>
        <Input
          id="org_exp"
          size="small"
          value={Number(experience)}
          onChange={(e) => setExperience(Number(e.target.value))}
          placeholder="Enter number of years of experience"
          className="placeholder:text-xs"
        />
      </div>

      <div className="mt-1">
        <label htmlFor="intro" className="block mb-1 text-xs font-medium text-gray-600">
          Introduction
        </label>
        <textarea
          id="intro"
          rows={2}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Please enter the LSP's preferred introduction here"
          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </>
  );
};
