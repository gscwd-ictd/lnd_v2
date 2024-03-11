import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { FunctionComponent, useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { trainingDesignUrl, url } from "@lms/utilities/url/api-url";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";

export const DeleteTrainingNoticeModal: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const { id, removeModalIsOpen, setRemoveModalIsOpen } = useContext(TrainingNoticeContext);
  const trainingSource = useTrainingNoticeStore((state) => state.trainingSource);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const setToastOptions = (color: typeof toastType.color, title: string, content: string | undefined) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const deleteTrainingNoticeMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.delete(`${url}/training-details/${id}`, { withCredentials: true });
        if (trainingSource === "External") {
          // call delete bucket by id
          await axios.delete(`${trainingDesignUrl}/api/bucket/lnd/${id}`);
        }

        return response.data;
      } catch (error) {
        return error;
      }
    },
    onError: (error: AxiosError<{ message: string }>) =>
      setToastOptions("danger", "Error", error.response?.data.message),
    onSuccess(data) {
      queryClient.refetchQueries({
        queryKey: ["training-notice"],
        type: "all",
        exact: true,
        stale: true,
      });

      reset();

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
            <div className="text-lg font-semibold text-gray-600">Confirm Action</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to delete this Training Notice?
            </label>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="w-[5rem]"
              variant="solid"
              color="danger"
              size="small"
              onClick={() => {
                setRemoveModalIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button className="w-[5rem]" size="small" variant="white" onClick={mutateFunction}>
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
