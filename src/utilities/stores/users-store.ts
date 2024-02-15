import { User } from "@lms/lib/types/users";
import { create } from "zustand";

type UsersStore = {
  id: string;
  setId: (id: string) => void;
  users: Array<User>;
  setUsers: (users: Array<User>) => void;
  selectedUser: User;
  setSelectedUser: (selectedUser: User) => void;
};

type UsersModalStore = {
  addModalIsOpen: boolean;
  setAddModalIsOpen: (addModalIsOpen: boolean) => void;
  confirmAddIsOpen: boolean;
  setConfirmAddIsOpen: (confirmAddModalIsOpen: boolean) => void;
  confirmRemoveIsOpen: boolean;
  setConfirmRemoveIsOpen: (confirmRemoveIsOpen: boolean) => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
  id: "",
  setId: (id) => set({ id }),
  users: [],
  setUsers: (users) => set({ users }),
  selectedUser: {} as User,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

export const useUsersModalStore = create<UsersModalStore>((set) => ({
  addModalIsOpen: false,
  setAddModalIsOpen: (addModalIsOpen) => set({ addModalIsOpen }),
  confirmAddIsOpen: false,
  setConfirmAddIsOpen: (confirmAddIsOpen) => set({ confirmAddIsOpen }),
  confirmRemoveIsOpen: false,
  setConfirmRemoveIsOpen: (confirmRemoveIsOpen) => set({ confirmRemoveIsOpen }),
}));
