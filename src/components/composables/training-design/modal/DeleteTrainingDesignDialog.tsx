import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";

type DeleteLspIndividualAlertDialogProps = {
  remove: boolean;
  setRemove: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export const DeleteTrainingDesignDialog: FunctionComponent<DeleteLspIndividualAlertDialogProps> = ({
  id,
  remove,
  setRemove,
}) => {
  const queryClient = useQueryClient();
  const [isOpenToast, setIsOpenToast] = useState(false);

  const deleteLspMutation = useMutation({
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["training_designs"],
        type: "all",
        exact: true,
        stale: true,
      });

      setRemove(false);
      setIsOpenToast(true);
    },
    onError: (error) => console.log(error),
    mutationFn: async () => {
      const response = await axios.delete(`${url}/training-designs/${id}`);

      return response.data;
    },
  });

  return (
    <>
      <AlertDialog open={remove} onOpenChange={setRemove}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">Training Design</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to delete this Training Design?
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
                deleteLspMutation.mutate();
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
