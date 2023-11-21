import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";

export const DeleteTrainingNoticeModal: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const { id, removeModalIsOpen, setRemoveModalIsOpen } = useContext(TrainingNoticeContext);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const setToastOptions = (color: typeof toastType.color, title: string, content: string | undefined) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const deleteTrainingNoticeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`${url}/training-details/${id}`);

      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) =>
      setToastOptions("danger", "Error", error.response?.data.message),
    onSuccess(data, variables, context) {
      queryClient.refetchQueries({
        queryKey: ["training-notice"],
        type: "all",
        exact: true,
        stale: true,
      });

      setRemoveModalIsOpen(false);
      setToastOptions("success", "Success", `You have deleted a training notice with the id ${id}`);
      return data;
    },
  });

  const mutateFunction = () => {
    deleteTrainingNoticeMutation.mutate();
  };

  return (
    <>
      <AlertDialog open={removeModalIsOpen} onOpenChange={setRemoveModalIsOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">LSP</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to delete this Training Notice?
            </label>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              size="small"
              variant="white"
              onClick={() => {
                setRemoveModalIsOpen(false);
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
