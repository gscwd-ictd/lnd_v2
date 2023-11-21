import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalTrigger, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { TrainingType } from "@lms/utilities/types/training-type.type";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";

type DeleteTrainingTypeModalProps = {
  remove: boolean;
  setRemove: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export const DeleteTrainingTypeModal: FunctionComponent<DeleteTrainingTypeModalProps> = ({ id, remove, setRemove }) => {
  // const [isOpenToast, setIsOpenToast] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<TrainingType>();

  // const onSubmit: SubmitHandler<TrainingType> = async () => {
  //   const res = await axios.delete(`${url}/training-types/${id}`);
  //   setRemove(false);
  // };
  const queryClient = useQueryClient();
  const [isOpenToast, setIsOpenToast] = useState(false);

  const deleteTrainingTypeMutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(`${url}/training-types/${id}`);
    },
    onError: (error) => console.log(error),
    onSuccess(data, variables, context) {
      queryClient.refetchQueries({
        queryKey: ["training-type"],
        type: "all",
        exact: true,
        stale: true,
      });

      setRemove(false);
      setIsOpenToast(true);
    },
  });

  return (
    <>
      {/* <Modal
        isOpen={remove}
        setIsOpen={setRemove}
        size="md"
        isStatic={true}
        onClose={() => console.log("close button")}
      >
        <ModalTrigger asChild></ModalTrigger>
        <ModalContent>
          <ModalContent.Title>
            <h3 className="text-lg font-semibold text-gray-600">Training Type</h3>
            <p className="text-sm text-gray-400">Delete training type</p>
          </ModalContent.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <ModalContent.Body>
              <label className="text-sm font-medium text-gray-700">
                Are you sure you want to delete this training type?
              </label>
            </ModalContent.Body>
            <ModalContent.Footer>
              <div className="flex items-center justify-end py-1">
                <Button type="submit" size="small" color="danger">
                  Confirm
                </Button>
              </div>
            </ModalContent.Footer>
          </form>
        </ModalContent>
      </Modal> */}
      <AlertDialog open={remove} onOpenChange={setRemove}>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">Training Type</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <label className="text-sm font-medium text-gray-700">
              Are you sure you want to delete this training type?
            </label>
          </AlertDialogDescription>
          <div className="mt-4 flex justify-end space-x-2">
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
                deleteTrainingTypeMutation.mutate();
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
