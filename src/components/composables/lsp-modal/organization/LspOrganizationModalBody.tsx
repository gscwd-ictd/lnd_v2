"use client";

import { useEditLspModalStore } from "@lms/utilities/stores/lsp-details-store";
import { EditAwardsAndRecognitionsExternal } from "../external/edit/EditAwardsAndRecognitionsExternal";
import { LspDetailsSummary } from "../individual/LspDetailsSummary";
import { EditOrganizationDetails } from "./edit/EditOrganizationDetails";
import { EditContactInformationExternal } from "../external/edit/EditContactInformationExternal";
import { EditSubjectMatterExpertise } from "../internal/edit/EditSubjectMatterExpertise";
import { EditCoachingExperience } from "../EditCoachingExperience";
import { EditTrainingDetails } from "../individual/EditTrainingDetails";
import { EditAffiliations } from "../EditAffiliations";
import { EditCertificationsExternal } from "../external/EditCertificationsExternal";

export const LspOrganizationModalBody = () => {
  const page = useEditLspModalStore((state) => state.page);

  return (
    <>
      <main className="px-2 space-y-2">
        {/* PAGE 1 */}
        {page === 1 && <EditOrganizationDetails />}
        {/* PAGE 2 */}
        {page === 2 && <EditContactInformationExternal />}
        {/* PAGE 3 */}
        {page === 3 && <EditSubjectMatterExpertise />}
        {/* PAGE 4 */}
        {page === 4 && <EditTrainingDetails />}
        {/* PAGE 5 */}
        {page === 5 && <EditCoachingExperience />}
        {/* PAGE 6 */}
        {page === 6 && <EditAffiliations />}
        {/* PAGE 7 */}
        {page === 7 && <EditAwardsAndRecognitionsExternal />}
        {/* PAGE 8 */}
        {page === 8 && <EditCertificationsExternal />}
        {/* PAGE 9 */}
        {page === 9 && <LspDetailsSummary />}
      </main>
    </>
  );
};
