import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useContext } from "react";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { UsersContext } from "@lms/app/settings/users-data-table/UsersDataTable";
import { useUsersModalStore, useUsersStore } from "@lms/utilities/stores/users-store";
import { User } from "@lms/lib/types/users";
import { isEmpty } from "lodash";

export const UsersAddUserAlert: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const confirmAddIsOpen = useUsersModalStore((state) => state.confirmAddIsOpen);
  const setConfirmAddIsOpen = useUsersModalStore((state) => state.setConfirmAddIsOpen);
  const setAddModalIsOpen = useUsersModalStore((state) => state.setAddModalIsOpen);
  const selectedUser = useUsersStore((state) => state.selectedUser);
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);

  const { id, setToastOptions } = useContext(UsersContext);

  const confirmToSubmit = useMutation({
    onSuccess: async () => {
      // fetch the fresh list of users in lnd
      const getUpdatedLndUsers = await axios.get(`${url}/hrms/lnd`);

      // apply the list of users of lnd in the data table
      queryClient.setQueryData(["users"], getUpdatedLndUsers.data.items);

      setSelectedUser({} as User);

      // show toast
      setToastOptions("success", "Success", "You have successfully added the user to LND.");

      // close the alert
      setConfirmAddIsOpen(false);

      // close the modal
      setAddModalIsOpen(false);
    },
    mutationFn: async () => {
      const request = axios.post(`${url}/hrms/lnd`, { employeeId: id });
      return request;
    },
    onError: async () => {
      // show toast
      setToastOptions("danger", "Error", "Please try again in a few seconds");
    },
  });

  return (
    <AlertDialog open={confirmAddIsOpen} onOpenChange={setConfirmAddIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>
          <div className="text-lg font-semibold text-gray-600">Confirm Action</div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <label className="text-sm font-medium text-gray-700">Are you sure you want to add this user to LND?</label>
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 space-x-2">
          <Button className="w-[6rem]" variant="soft" onClick={() => setConfirmAddIsOpen(false)}>
            No
          </Button>
          <Button
            className="w-[6rem] disabled:cursor-not-allowed"
            onClick={async () => {
              confirmToSubmit.mutateAsync();
            }}
            disabled={isEmpty(selectedUser) ? true : false}
          >
            Yes
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
