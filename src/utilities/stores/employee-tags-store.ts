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
  // const [employees, setEmployees] = useState<EmployeeProps[]>();
  employees: Employee[]; //! Replaced Employee2Props
  setEmployees: (employees: Employee[]) => void; //! Replaced Employee2Props
  // const [employeeTags, setEmployeeTags] = useState<Tags[]>([]);
  employeeTags: Tag[];
  setEmployeeTags: (employeeTags: Tag[]) => void;
};

export const useTabStore = create<activeTab>((set) => ({
  activeTab: "employee",
  setActiveTab: (activeTab) => set({ activeTab }),
  // selectedEmployee: {} as EmployeeProps,
  selectedEmployee: undefined,
  setSelectedEmployee: (selectedEmployee: EmployeeProps) => set((state) => ({ ...state, selectedEmployee })),
  selectedTag: undefined,
  setSelectedTag: (selectedTag: Tag) => set((state) => ({ ...state, selectedTag })),
  employees: [],
  setEmployees: (employees) => set({ employees }),
  employeeTags: [],
  setEmployeeTags: (employeeTags) => set({ employeeTags }),
}));

// type selectedEmployee = {};
