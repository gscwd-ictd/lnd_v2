import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { FunctionComponent, useContext, useState } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { url } from "@lms/utilities/url/api-url";

export const SetToUpcomingModal: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const { id, toUpcomingModalIsOpen, setToUpcomingModalIsOpen } = useContext(TrainingNoticeContext);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const setToastOptions = (color: typeof toastType.color, title: string, content: string | undefined) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const setToUpcomingTrainingNoticeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(`${url}/training-details/done/${id}`, {}, { withCredentials: true });

      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) =>
      setToastOptions("danger", "Error", error.response?.data.message),
    onSuccess: async (data) => {
      const getAllTrainingNotices = await axios.get(`${url}/training-details?page=1&limit=1000`);

      queryClient.setQueryData(["training-notice"], getAllTrainingNotices.data.items);

      setToUpcomingModalIsOpen(false);
      setToastOptions("success", "Success", `You have moved the training status to upcoming.`);
      return data;
    },
  });

  const mutateFunction = () => {
    setToUpcomingTrainingNoticeMutation.mutate();
  };

  return (
    <>
      <AlertDialog open={toUpcomingModalIsOpen} onOpenChange={setToUpcomingModalIsOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">Confirm Action</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to move the training status to upcoming?
            </label>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="w-[5rem]"
              size="small"
              variant="white"
              onClick={() => {
                setToUpcomingModalIsOpen(false);
              }}
            >
              No
            </Button>
            <Button className="w-[5rem]" size="small" variant="solid" color="primary" onClick={mutateFunction}>
              Yes
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
