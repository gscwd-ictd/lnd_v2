"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useState } from "react";
import { url } from "@lms/utilities/url/api-url";
import { User } from "@lms/lib/types/users";
import { useUsersDataTable } from "./hook/use-users-data-table";
import { useUsersStore } from "@lms/utilities/stores/users-store";
import { UsersAddUserAlert } from "@lms/components/composables/users/alert/UsersAddUserAlert";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { UsersToastComponent } from "@lms/components/composables/users/toast/ToastComponent";
import { UsersRemoveUserAlert } from "@lms/components/composables/users/alert/UsersRemoveUserAlert";

type UsersState = {
  id: string;
  setToastOptions: (color: ToastType["color"], title: string, content: string | undefined) => void;
  toastIsOpen: boolean;
  setToastIsOpen: Dispatch<SetStateAction<boolean>>;
  toastType: ToastType;
  setToastType: Dispatch<SetStateAction<ToastType>>;
};

export const UsersContext = createContext({} as UsersState);

export const UsersDataTable: FunctionComponent = () => {
  const { columns } = useUsersDataTable();
  const id = useUsersStore((state) => state.id);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  const setToastOptions = (color: typeof toastType.color, title: string, content: string | undefined) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  return (
    <>
      <UsersContext.Provider
        value={{
          id,
          toastIsOpen,
          toastType,
          setToastIsOpen,
          setToastOptions,
          setToastType,
        }}
      >
        <DataTable<User>
          title="Users"
          subtitle="List of users"
          columns={columns}
          datasource={`${url}/hrms/lnd/users`}
          queryKey={["users"]}
        />
        <UsersRemoveUserAlert />
        <UsersAddUserAlert />
        <UsersToastComponent />
      </UsersContext.Provider>
    </>
  );
};
