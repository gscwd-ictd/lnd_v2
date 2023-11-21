"use client";

import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const EditOrganizationInfoExternal: FunctionComponent = () => {
  const organizationName = useLspDetailsStore((state) => state.organizationName);
  const setOrganizationName = useLspDetailsStore((state) => state.setOrganizationName);

  const experience = useLspDetailsStore((state) => state.experience);
  const setExperience = useLspDetailsStore((state) => state.setExperience);

  const intro = useLspDetailsStore((state) => state.introduction);
  const setIntro = useLspDetailsStore((state) => state.setIntroduction);

  return (
    <>
      <div>
        <label htmlFor="org-fullName" className="text-xs font-medium text-gray-600">
          Full Name
        </label>
        <Input
          id="org-fullName"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          size="small"
          placeholder="Organization Full Name"
          className="placeholder:text-xs"
        />
      </div>

      <div>
        <label htmlFor="exp" className="text-xs font-medium text-gray-600">
          Years of Experience
        </label>
        <Input
          id="exp"
          value={Number(experience)}
          onChange={(e) => setExperience(Number(e.target.value))}
          size="small"
          placeholder="Enter number of years"
          className="placeholder:text-xs"
        />
      </div>

      <div className="mt-1">
        <label htmlFor="intro" className="block mb-1 text-xs font-medium text-gray-600">
          Introduction
        </label>
        <textarea
          id="intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={2}
          placeholder="Please enter the LSP's preferred introduction here"
          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </>
  );
};
