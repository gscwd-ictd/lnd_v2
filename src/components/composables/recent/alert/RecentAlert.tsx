import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { useMutation } from "@tanstack/react-query";
import { FunctionComponent, useContext } from "react";
import { OnGoingContext } from "../../on-going-data-table/OnGoingDataTable";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";

export const RecentAlertSubmission: FunctionComponent = () => {
  const { alertSubmissionIsOpen, setAlertSubmissionIsOpen, setSlideOverIsOpen, setToastOptions, id } =
    useContext(OnGoingContext);

  const confirmToSubmit = useMutation({
    onSuccess: () => {
      setToastOptions("success", "Success", "You have moved the training to recents.");
      setAlertSubmissionIsOpen(false);
      setSlideOverIsOpen(false);
    },
    mutationFn: async () => {
      const request = axios.put(`${url}/training-details/requirements-submission/${id}`);
    },
  });

  return (
    <AlertDialog open={alertSubmissionIsOpen} onOpenChange={setAlertSubmissionIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>
          <div className="text-lg font-semibold text-gray-600">Close training</div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <label className="text-sm font-medium text-gray-700">Are you sure you want to close the training?</label>
        </AlertDialogDescription>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="soft" onClick={() => setAlertSubmissionIsOpen(false)}>
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
