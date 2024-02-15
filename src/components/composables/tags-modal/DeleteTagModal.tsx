import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

type DeleteTagModalProps = {
  remove: boolean;
  setRemove: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export const DeleteTagModal: FunctionComponent<DeleteTagModalProps> = ({ id, remove, setRemove }) => {
  // const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isOpenToast, setIsOpenToast] = useState(false);

  const deleteTagsMutation = useMutation({
    onSuccess: (data, variable) => {
      setRemove(false);
      queryClient.refetchQueries({ queryKey: ["tags"], type: "all", exact: true, stale: true });
    },
    onError: () => console.log("error"),
    mutationFn: async () => {
      const response = await axios.delete(`${url}}/tags/${id}`);
      return response.data;
    },
  });

  return (
    <>
      <AlertDialog open={remove} onOpenChange={setRemove}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">Training Type</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to delete this training type?
            </label>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              size="small"
              variant="white"
              onClick={() => {
                setRemove(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="solid"
              color="danger"
              onClick={() => {
                deleteTagsMutation.mutate();
              }}
            >
              Confirm
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <Toast
        duration={2000}
        open={isOpenToast}
        setOpen={setIsOpenToast}
        color="success"
        title="Success"
        content="Successfully deleted."
      />
    </>
  );
};
