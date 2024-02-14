import { User } from "@lms/lib/types/users";
import { create } from "zustand";

type UsersStore = {
  users: Array<User>;
  setUsers: (users: Array<User>) => void;
  selectedUser: User;
  setSelectedUser: (selectedUser: User) => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  selectedUser: {} as User,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
