import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { trainingDesignUrl, url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useOthersToastOptions } from "../data-table/OthersDataTable";
import { useDeleteOthersModalStore, useOthersStore } from "@lms/utilities/stores/others-store";

export const DeleteOthersModal = () => {
  const id = useOthersStore((state) => state.id);
  const setId = useOthersStore((state) => state.setId);
  const title = useOthersStore((state) => state.title);
  const modalIsOpen = useDeleteOthersModalStore((state) => state.modalIsOpen);
  const setModalIsOpen = useDeleteOthersModalStore((state) => state.setModalIsOpen);
  const { setToastOptions } = useOthersToastOptions();
  const reset = useOthersStore((state) => state.reset);
  const queryClient = useQueryClient();

  const deleteOtherTrainingsMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`${url}/other/trainings/${id}`, { withCredentials: true });

      // call delete bucket by id
      await axios.delete(`${trainingDesignUrl}/api/bucket/others/${id}`);

      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) =>
      setToastOptions("danger", "Error", error.response?.data.message!),
    onSuccess: async () => {
      const getUpdatedBenchmarkings = await axios.get(`${url}/other/trainings?page=1&limit=1000`);
      queryClient.setQueryData(["other-activities"], getUpdatedBenchmarkings.data.items);
      setId("");
      reset();
      setModalIsOpen(false);
      setToastOptions("success", "Success", `You have deleted a other training activity with the title ${title}`);
    },
  });

  const mutateFunction = () => {
    deleteOtherTrainingsMutation.mutate();
  };

  return (
    <>
      <AlertDialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">Confirm Action</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to delete this {title} Activity?
            </label>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="min-w-[5rem]"
              variant="solid"
              color="danger"
              size="small"
              onClick={() => {
                setModalIsOpen(false);
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
    </>
  );
};
