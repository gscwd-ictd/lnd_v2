import { isEmpty } from "lodash";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum LspSource {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

export enum Sex {
  MALE = "Male",
  FEMALE = "Female",
}

export type LspExpertise = {
  subjectMatter: string;
};

export type LspEducation = {
  degree: string;
  institution: string;
};

export type LspTraining = {
  name: string;
};

export type LspProject = {
  name: string;
};

export type LspCoaching = {
  name: string;
};

export type LspAffiliation = {
  position: string;
  institution: string;
};

export type LspAward = {
  name: string;
};

export type LspCertification = {
  name: string;
};

export type EmployeeEducation = {
  schoolName: string;
  degree: string;
};

export type EmployeeEligibility = {
  name: string;
};

export type EmployeeAward = {
  recognition: string;
};

type EmployeePds = {
  personalInfo: {
    _id: string;
    companyId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    sex: Sex;
  };
  permanentAddress: {
    houseNumber: string;
    street: string;
    subdivision: string;
    barangay: string;
    city: string;
    province: string;
    zipCode: string;
  };
  college: EmployeeEducation[];
  graduate: EmployeeEducation[];
  eligibility: EmployeeEligibility[];
  recognitions: EmployeeAward[];
  governmentIssuedIds: {
    agencyNumber: string;
    gsisNumber: string;
    pagibigNumber: string;
    philhealthNumber: string;
    sssNumber: string;
    tinNumber: string;
  };
};

type EmployeeData = {
  employeeId: string;
  sex: Sex | undefined;
  fullName: string;
  email: string;
  photoUrl: string;
  contactNumber: string;
  postalAddress: string;
  tin: string;
  awards: Array<LspAward>;
  certifications: Array<LspCertification>;
  education: Array<LspEducation>;
};

export type EmployeeSearchStore = {
  employeePds: EmployeePds | undefined;
  setEmployeePds: (employeePds: EmployeePds | undefined) => void;
  employeeData: EmployeeData | undefined;
  setEmployeeData: (employeeData: EmployeeData) => void;
  employeeId: string | undefined;
  setEmployeeId: (employeeId: string | undefined) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  selectedEmployee: EmployeeSearch;
  setSelectedEmployee: (selectedEmployee: EmployeeSearch) => void;
  reset: () => void;
};

export type LspTypeStore = {
  lspType: LspType | undefined;
  setLspType: (lspType: LspType) => void;
};

export type LspSourceStore = {
  lspSource: LspSource | undefined;
  setLspSource: (lspSource: LspSource | undefined) => void;
};

export enum LspType {
  INDIVIDUAL = "individual",
  ORGANIZATION = "organization",
}

export type LspModalStore = {
  page: number;
  setPage: (page: number) => void;
};

export type EmployeeSearch = {
  employeeId: string;
  fullName: string;
  positionTitle: string;
};

export type LspDetailsStore = {
  lspAction: "create" | "update" | undefined;
  id: null | string | undefined;
  employeeId: null | string | undefined;
  photoUrl: string;
  name: string;
  organizationName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  extensionName: string;
  prefixName: string;
  suffixName: string;
  introduction: string;
  contactNumber: string;
  email: string;
  postalAddress: string;
  tin: string;
  experience: number;
  expertise: LspExpertise[];
  education: LspEducation[];
  trainings: LspTraining[];
  projects: LspProject[];
  coaching: LspCoaching[];
  affiliations: LspAffiliation[];
  awards: LspAward[];
  certifications: LspCertification[];
  sex: Sex | undefined;
  setSex: (sex: Sex | undefined) => void;
  getFullName: () => void;
  setTin: (tin: string) => void;
  setPrefixName: (prefixName: string) => void;
  setSuffixName: (suffixName: string) => void;
  setLspAction: (lspAction: "create" | "update" | undefined) => void;
  setId: (id: null | string) => void;
  setEmployeeId: (employeeId: null | string) => void;
  setPhotoUrl: (photoUrl: string) => void;
  setName: (name: string) => void;
  setOrganizationName: (organizationName: string) => void;
  setFirstName: (firstName: string) => void;
  setMiddleName: (middleName: string) => void;
  setLastName: (lastName: string) => void;
  setExtensionName: (nameExtension: string) => void;
  setIntroduction: (introduction: string) => void;
  setContactNumber: (contactNumber: string) => void;
  setEmail: (email: string) => void;
  setPostalAddress: (postalAddress: string) => void;
  setExperience: (experience: number) => void;
  setExpertise: (expertise: LspExpertise[]) => void;
  setEducation: (education: LspEducation[]) => void;
  setTrainings: (trainings: LspTraining[]) => void;
  setProjects: (projects: LspProject[]) => void;
  setCoaching: (coaching: LspCoaching[]) => void;
  setAffiliations: (affiliations: LspAffiliation[]) => void;
  setAwards: (awards: LspAward[]) => void;
  setCertifications: (certifications: LspCertification[]) => void;
  reset: () => void;
};

export const useLspDetailsStore = create<LspDetailsStore>()(
  devtools((set, get) => ({
    lspAction: undefined,
    id: undefined,
    employeeId: undefined,
    tin: "",
    name: "",
    extensionName: "",
    photoUrl: "",
    organizationName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    introduction: "",
    contactNumber: "",
    email: "",
    postalAddress: "",
    experience: 0,
    expertise: [],
    education: [],
    trainings: [],
    projects: [],
    coaching: [],
    affiliations: [],
    awards: [],
    certifications: [],
    prefixName: "",
    suffixName: "",
    sex: undefined,
    setSex: (sex) => set({ sex }),
    setTin: (tin: string) => set({ tin }),
    setPrefixName: (prefixName: string) => set({ prefixName }),
    setSuffixName: (suffixName: string) => set({ suffixName }),
    setLspAction: (lspAction: "create" | "update" | undefined) => set({ lspAction }),
    setName: (name) => set({ name }),
    setExtensionName: (extensionName) => set({ extensionName }),
    setId: (id) => set({ id }),
    setEmployeeId: (employeeId) => set({ employeeId }),
    setPhotoUrl: (photoUrl) => set({ photoUrl }),
    setOrganizationName: (organizationName) => set({ organizationName }),
    setFirstName: (firstName) => set({ firstName }),
    setMiddleName: (middleName) => set({ middleName }),
    setLastName: (lastName) => set({ lastName }),
    setIntroduction: (introduction) => set({ introduction }),
    setContactNumber: (contactNumber) => set({ contactNumber }),
    setEmail: (email) => set({ email }),
    setPostalAddress: (postalAddress) => set({ postalAddress }),
    setExperience: (experience) => set({ experience }),
    setExpertise: (expertise) => set({ expertise }),
    setEducation: (education) => set({ education }),
    setTrainings: (trainings) => set({ trainings }),
    setProjects: (projects) => set({ projects }),
    setCoaching: (coaching) => set({ coaching }),
    setAffiliations: (affiliations) => set({ affiliations }),
    setAwards: (awards) => set({ awards }),
    setCertifications: (certifications) => set({ certifications }),

    getFullName: () => {
      const fName = get().firstName;
      const mName = get().middleName;
      const lName = get().lastName;

      const getPrefixName = () => {
        if (isEmpty(get().prefixName)) {
          return "";
        } else if (!isEmpty(get().prefixName)) {
          return get().prefixName + ". ";
        }
      };

      const getSuffixName = () => {
        if (isEmpty(get().suffixName)) {
          return "";
        } else if (!isEmpty(get().suffixName)) {
          return ", " + get().suffixName;
        }
      };

      const getNameExt = () => {
        if (isEmpty(get().extensionName)) {
          return "";
        } else if (!isEmpty(get().extensionName)) {
          return ", " + get().extensionName;
        }
      };
      const nameExt = getNameExt();
      const prefix = getPrefixName();
      const suffix = getSuffixName();

      return prefix + fName + " " + mName + " " + lName + nameExt + suffix;
    },

    reset: () =>
      set({
        sex: undefined,
        name: "",
        prefixName: "",
        suffixName: "",
        employeeId: null,
        photoUrl: "",
        organizationName: "",
        firstName: "",
        middleName: "",
        lastName: "",
        introduction: "",
        contactNumber: "",
        email: "",
        postalAddress: "",
        tin: "",
        // lspSource: undefined,
        experience: 0,
        expertise: [],
        education: [],
        trainings: [],
        projects: [],
        coaching: [],
        affiliations: [],
        awards: [],
        certifications: [],
      }),
  }))
);

// export const useSelectedLspSource = create<SelectedLspSourceStore>()(
//   devtools((set) => ({
//     selectedLspSource: undefined,
//     setSelectedLspSource: (selectedLspSource) => set({ selectedLspSource }),
//   }))
// );

export const useLspTypeStore = create<LspTypeStore>((set) => ({
  lspType: undefined,
  setLspType: (lspType) => set({ lspType }),
}));

export const useLspSourceStore = create<LspSourceStore>((set) => ({
  lspSource: undefined,
  setLspSource: (lspSource: LspSource | undefined) => set({ lspSource }),
}));

export const useAddLspModalStore = create<LspModalStore>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));

export const useEditLspModalStore = create<LspModalStore>((set) => ({
  page: 2,
  setPage: (page) => set({ page }),
}));

export const useEmployeeSearchStore = create<EmployeeSearchStore>((set) => ({
  employeeId: undefined,
  setEmployeeId: (employeeId) => set({ employeeId }),
  employeeData: undefined,
  setEmployeeData: (employeeData) => set({ employeeData }),
  employeePds: undefined,
  setEmployeePds: (employeePds) => set({ employeePds }),
  searchInput: "",
  setSearchInput: (searchInput) => set({ searchInput }),
  selectedEmployee: { employeeId: "", fullName: "", positionTitle: "" } as EmployeeSearch,
  setSelectedEmployee: (selectedEmployee: EmployeeSearch) => set({ selectedEmployee }),
  reset: () =>
    set({
      employeeId: undefined,
      employeePds: undefined,
      searchInput: "",
      selectedEmployee: undefined,
      employeeData: undefined,
    }),
}));
