import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";

type DeleteLspIndividualAlertDialogProps = {
  remove: boolean;
  setRemove: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export const DeleteLspIndividualAlertDialog: FunctionComponent<DeleteLspIndividualAlertDialogProps> = ({
  id,
  remove,
  setRemove,
}) => {
  const queryClient = useQueryClient();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const setToastOptions = (color: typeof toastType.color, title: string, content: string | undefined) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const deleteLspMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`${url}/lsp-details/${id}`);

      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) =>
      setToastOptions("danger", "Error", error.response?.data.message),
    onSuccess(data, variables, context) {
      queryClient.refetchQueries({
        queryKey: ["lsp-individual"],
        type: "all",
        exact: true,
        stale: true,
      });

      setRemove(false);
      setToastOptions("success", "Success", `You have deleted an lsp with id ${id}`);
      return data;
    },
  });

  const mutateFunction = () => {
    deleteLspMutation.mutate();
  };

  return (
    <>
      <AlertDialog open={remove} onOpenChange={setRemove}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">LSP</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">Are you sure you want to delete LSP?</label>
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
            <Button size="small" variant="solid" color="danger" onClick={mutateFunction}>
              Confirm
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <Toast
        duration={2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};
