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
import { useUsersModalStore } from "@lms/utilities/stores/users-store";

export const UsersRemoveUserAlert: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const { id, setToastOptions } = useContext(UsersContext);

  const confirmRemoveIsOpen = useUsersModalStore((state) => state.confirmRemoveIsOpen);
  const setConfirmRemoveIsOpen = useUsersModalStore((state) => state.setConfirmRemoveIsOpen);

  const confirmToSubmit = useMutation({
    onSuccess: async () => {
      // fetch the fresh list of users in lnd
      const getUpdatedLndUsers = await axios.get(`${url}/hrms/lnd`);

      // apply the list of users of lnd in the data table
      queryClient.setQueryData(["users"], getUpdatedLndUsers.data.items);

      // show toast
      setToastOptions("success", "Success", "You have successfully removed the user from LND.");

      // close the alert
      setConfirmRemoveIsOpen(false);
    },
    mutationFn: async () => {
      const request = axios.delete(`${url}/hrms/lnd/${id}`);
      console.log(id);
      return request;
    },
    onError: async () => {
      // show toast
      setToastOptions("danger", "Error", "Please try again in a few seconds");
    },
  });

  return (
    <AlertDialog open={confirmRemoveIsOpen} onOpenChange={setConfirmRemoveIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>
          <div className="text-lg font-semibold text-gray-600">Confirm Action</div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <label className="text-sm font-medium text-gray-700">
            Are you sure you want to remove this user from LND?
          </label>
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 space-x-2">
          <Button className="w-[6rem]" variant="soft" color="danger" onClick={() => setConfirmRemoveIsOpen(false)}>
            No
          </Button>
          <Button
            className="w-[6rem]"
            color="danger"
            onClick={async () => {
              confirmToSubmit.mutateAsync();
            }}
          >
            Yes
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
