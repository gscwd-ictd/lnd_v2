"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FunctionComponent, useState } from "react";

type RemoveUserModalProps = {
  id: string;
};

export const RemoveUserModal: FunctionComponent<RemoveUserModalProps> = ({ id }) => {
  // assign the use query client to queryclient
  const queryClient = useQueryClient();

  // state for opening/closing the dialog
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState<boolean>(false);

  // mutate function for removing the user
  const removeUserMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`${url}/training/${id}`);
      return response.data;
    },
    onSuccess: async (data) => {
      // fetch the list of users
      const response = await axios.get(`${url}/users`);

      // set the list of users
      queryClient.setQueryData(["users"], response.data.items);
    },
  });

  return (
    <>
      <AlertDialog open={removeModalIsOpen} onOpenChange={setRemoveModalIsOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">Remove User</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to remove this user from Learning and Development?
            </label>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            <Button size="small" variant="white" onClick={() => setRemoveModalIsOpen(false)}>
              Cancel
            </Button>
            <Button size="small" variant="solid" color="danger" onClick={() => removeUserMutation.mutate()}>
              Confirm
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
