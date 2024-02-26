import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FunctionComponent, useContext } from "react";
import { OnGoingContext } from "../../on-going-data-table/OnGoingDataTable";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";

export const ToOngoingAlertSubmission: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const { toOngoingAlertIsOpen, setToOngoingAlertIsOpen, id } = useContext(TrainingNoticeContext);

  const confirmToSubmit = useMutation({
    onSuccess: async () => {
      // setToastOptions("success", "Success", "You have moved the training to recents.");
      setToOngoingAlertIsOpen(false);
      // setSlideOverIsOpen(false);
      const getUpdatedNoticeOfTraining = await axios.get(`${url}/training-details`);
      queryClient.setQueryData(["training-notice"], getUpdatedNoticeOfTraining.data.items);
    },
    mutationFn: async () => {
      const request = axios.put(`${url}/training-details/on-going/${id}`);
      return request;
    },
  });

  return (
    <AlertDialog open={toOngoingAlertIsOpen} onOpenChange={setToOngoingAlertIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>
          <div className="text-lg font-semibold text-gray-600">Move to on-going</div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <label className="text-sm font-medium text-gray-700">
            Are you sure you want to move the training to on-going and change the status to &ldquo;On going&ldquo;?
          </label>
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="white" onClick={() => setToOngoingAlertIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              confirmToSubmit.mutateAsync();
            }}
          >
            Submit
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
