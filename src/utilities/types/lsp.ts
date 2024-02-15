import { LspExpertise } from "../stores/lsp-details-store";

export type LearningServiceProvider = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string | null | undefined;
  employeeId: string | null | undefined;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  postalAddress: string;
  source: string;
  prefixName: string;
  suffixName: string;
};

export type LspIndividualDetails = LearningServiceProvider & {
  expertise: Array<LspExpertise>;
  photoUrl: string;
  experience: number;
};
