import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { useBenchmarkingStore, useDeleteBenchmarkingModalStore } from "@lms/utilities/stores/benchmarking-store";
import { trainingDesignUrl, url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useBenchmarkingToastOptions } from "../data-table/BenchmarkingDataTable";

export const DeleteBenchmarkingModal = () => {
  const id = useBenchmarkingStore((state) => state.id);
  const setId = useBenchmarkingStore((state) => state.setId);
  const title = useBenchmarkingStore((state) => state.title);
  const modalIsOpen = useDeleteBenchmarkingModalStore((state) => state.modalIsOpen);
  const setModalIsOpen = useDeleteBenchmarkingModalStore((state) => state.setModalIsOpen);
  const { setToastOptions } = useBenchmarkingToastOptions();
  const reset = useBenchmarkingStore((state) => state.reset);
  const queryClient = useQueryClient();

  const deleteBenchmarkingMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`${url}/benchmark/${id}`, { withCredentials: true });

      // call delete bucket by id
      await axios.delete(`${trainingDesignUrl}/api/bucket/benchmarking/${id}`);

      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) =>
      setToastOptions("danger", "Error", error.response?.data.message!),
    onSuccess: async () => {
      const getUpdatedBenchmarkings = await axios.get(`${url}/benchmark?page=1&limit=1000`);
      queryClient.setQueryData(["benchmarking-activities"], getUpdatedBenchmarkings.data.items);
      setId("");
      reset();
      setModalIsOpen(false);
      setToastOptions("success", "Success", `You have deleted a benchmarking activity with the title ${title}`);
    },
  });

  const mutateFunction = () => {
    deleteBenchmarkingMutation.mutate();
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
