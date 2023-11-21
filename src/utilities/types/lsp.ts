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

// id: null | string | undefined; //! Recently added
// employeeId: null | string | undefined;
// photoUrl: string;
// orgFullName: string;
// firstName: string;
// middleName: string;
// lastName: string;
// introduction: string;
// contactNumber: string;
// email: string;
// postalAddress: string;
// lspSource: string;
// experience: number | null;
// expertise: LspExpertise[];
// education: LspEducation[];
// trainings: LspTraining[];
// projects: LspProject[];
// coaching: LspCoaching[];
// affiliations: LspAffiliation[];
// awards: LspAward[];
// certifications: LspCertification[];
