"use client";

import { LspSource, useEditLspModalStore, useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import { EducationDetailsInternal } from "../internal/EducationDetailsInternal";
import { LspDetailsSummary } from "./LspDetailsSummary";
import { EditAwardsAndRecognitionsExternal } from "../external/edit/EditAwardsAndRecognitionsExternal";
import { ContactInformationInternal } from "../internal/ContactInformationInternal";
import { CertificationsInternal } from "../internal/CertificationsInternal";
import { AwardsAndRecognitionInternal } from "./AwardsAndRecognitionInternal";
import { EditPersonalInformationInternal } from "../internal/edit/EditPersonalInformationInternal";
import { EditPersonalInformationExternal } from "../external/edit/EditPersonalInformationExternal";
import { EditContactInformationExternal } from "../external/edit/EditContactInformationExternal";
import { EditSubjectMatterExpertise } from "../internal/edit/EditSubjectMatterExpertise";
import { EditEducationDetailsExternal } from "../external/edit/EditEducationDetailsExternal";
import { EditTrainingDetails } from "./EditTrainingDetails";
import { EditProjectsImplemented } from "./EditProjectsImplemented";
import { EditCoachingExperience } from "../EditCoachingExperience";
import { EditAffiliations } from "../EditAffiliations";
import { EditCertificationsExternal } from "../external/EditCertificationsExternal";

export const LspIndividualModalBody = () => {
  const page = useEditLspModalStore((state) => state.page);
  const lspSource = useLspSourceStore((state) => state.lspSource);

  return (
    <>
      {lspSource !== undefined && (
        <main className="px-2 space-y-2 h-[34rem]">
          {lspSource === LspSource.INTERNAL && page === 1 && <EditPersonalInformationInternal />}
          {lspSource === LspSource.INTERNAL && page === 2 && <ContactInformationInternal />}
          {lspSource === LspSource.INTERNAL && page === 3 && <EditSubjectMatterExpertise />}
          {lspSource === LspSource.INTERNAL && page === 4 && <EducationDetailsInternal />}
          {lspSource === LspSource.INTERNAL && page === 5 && <EditTrainingDetails />}
          {lspSource === LspSource.INTERNAL && page === 6 && <EditProjectsImplemented />}
          {lspSource === LspSource.INTERNAL && page === 7 && <EditCoachingExperience />}
          {lspSource === LspSource.INTERNAL && page === 8 && <EditAffiliations />}
          {lspSource === LspSource.INTERNAL && page === 9 && <AwardsAndRecognitionInternal />}
          {lspSource === LspSource.INTERNAL && page === 10 && <CertificationsInternal />}
          {lspSource === LspSource.INTERNAL && page === 11 && <LspDetailsSummary />}

          {lspSource === LspSource.EXTERNAL && page === 1 && <EditPersonalInformationExternal />}
          {lspSource === LspSource.EXTERNAL && page === 2 && <EditContactInformationExternal />}
          {lspSource === LspSource.EXTERNAL && page === 3 && <EditSubjectMatterExpertise />}
          {lspSource === LspSource.EXTERNAL && page === 4 && <EditEducationDetailsExternal />}
          {lspSource === LspSource.EXTERNAL && page === 5 && <EditTrainingDetails />}
          {lspSource === LspSource.EXTERNAL && page === 6 && <EditProjectsImplemented />}
          {lspSource === LspSource.EXTERNAL && page === 7 && <EditCoachingExperience />}
          {lspSource === LspSource.EXTERNAL && page === 8 && <EditAffiliations />}
          {lspSource === LspSource.EXTERNAL && page === 9 && <EditAwardsAndRecognitionsExternal />}
          {lspSource === LspSource.EXTERNAL && page === 10 && <EditCertificationsExternal />}
          {lspSource === LspSource.EXTERNAL && page === 11 && <LspDetailsSummary />}
        </main>
      )}
    </>
  );
};
