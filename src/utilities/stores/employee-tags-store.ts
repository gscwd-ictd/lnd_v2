import { create } from "zustand";
import { Tag } from "../types/tags";

type EmployeeProps = {
  employeeId: string;
  fullName: string;
  positionTitle: string;
};

type Employee2Props = {
  employeeFullName: string;
  employeeId: string;
  positionTitle: string;
};

export type Employee = {
  employeeId: string;
  name: string;
  positionTitle: string;
};

type activeTab = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  selectedEmployee?: EmployeeProps;
  setSelectedEmployee: (selectedPerson: EmployeeProps) => void;
  selectedTag?: Tag;
  setSelectedTag: (selectedTag: Tag) => void;
  employees: Employee[]; // Replaced Employee2Props
  setEmployees: (employees: Employee[]) => void; // Replaced Employee2Props
  filteredEmployees: Employee[];
  setFilteredEmployees: (filteredEmployees: Employee[]) => void;
  employeeTags: Tag[];
  setEmployeeTags: (employeeTags: Tag[]) => void;
  filteredEmployeeTags: Tag[];
  setFilteredEmployeeTags: (filteredEmployeeTags: Tag[]) => void;
  searchTagEmployee: string;
  setSearchTagEmployee: (searchTagEmployee: string) => void;
  queryTag: string;
  setQueryTag: (queryTag: string) => void;
  queryEmployee: string;
  setQueryEmployee: (queryEmployee: string) => void;
  searchEmployeeTag: string;
  setSearchEmployeeTag: (searchEmployeeTag: string) => void;

  // const [searchEmployee, setSearchEmployee] = useState<string>("");
};

export const useTabStore = create<activeTab>((set) => ({
  activeTab: "employee",
  setActiveTab: (activeTab) => set({ activeTab }),
  selectedEmployee: undefined,
  setSelectedEmployee: (selectedEmployee: EmployeeProps) => set((state) => ({ ...state, selectedEmployee })),
  selectedTag: undefined,
  setSelectedTag: (selectedTag: Tag) => set((state) => ({ ...state, selectedTag })),

  employees: [],
  setEmployees: (employees) => set({ employees }),

  filteredEmployees: [],
  setFilteredEmployees: (filteredEmployees) => set({ filteredEmployees }),

  employeeTags: [],
  setEmployeeTags: (employeeTags) => set({ employeeTags }),

  filteredEmployeeTags: [],
  setFilteredEmployeeTags: (filteredEmployeeTags) => set({ filteredEmployeeTags }),

  searchTagEmployee: "",
  setSearchTagEmployee: (searchTagEmployee) => set({ searchTagEmployee }),
  queryTag: "",
  setQueryTag: (queryTag) => set({ queryTag }),
  queryEmployee: "",
  setQueryEmployee: (queryEmployee) => set({ queryEmployee }),
  searchEmployeeTag: "",
  setSearchEmployeeTag: (searchEmployeeTag) => set({ searchEmployeeTag }),
}));

// type selectedEmployee = {};
