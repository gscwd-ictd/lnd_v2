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

export const OngoingAlertSubmission: FunctionComponent = () => {
  const queryClient = useQueryClient();
  const { alertSubmissionIsOpen, setAlertSubmissionIsOpen, setSlideOverIsOpen, setToastOptions, id } =
    useContext(OnGoingContext);

  const confirmToSubmit = useMutation({
    onSuccess: async () => {
      const getUpdatedOngoingTrainings = await axios.get(`${url}/training/ongoing`);
      queryClient.setQueryData(["on-going-training"], getUpdatedOngoingTrainings.data.items);
      setToastOptions("success", "Success", "You have moved the training to recents.");
      setAlertSubmissionIsOpen(false);
      setSlideOverIsOpen(false);
    },
    mutationFn: async () => {
      const request = axios.patch(
        `${url}/training`,
        { trainingId: id, status: "requirements submission" },
        { withCredentials: true }
      );
      return request;
    },
  });

  return (
    <AlertDialog open={alertSubmissionIsOpen} onOpenChange={setAlertSubmissionIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>
          <div className="text-lg font-semibold text-gray-600">Move to recents</div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <label className="text-sm font-medium text-gray-700">
            Are you sure you want to move the training to recents and change the status to &ldquo;For requirements
            submission&ldquo;?
          </label>
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="white" onClick={() => setAlertSubmissionIsOpen(false)}>
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
