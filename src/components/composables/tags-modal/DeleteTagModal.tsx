import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

type DeleteTagModalProps = {
  remove: boolean;
  setRemove: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export const DeleteTagModal: FunctionComponent<DeleteTagModalProps> = ({ id, remove, setRemove }) => {
  // const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isOpenToast, setIsOpenToast] = useState(false);

  const deleteTagsMutation = useMutation({
    onSuccess: (data, variable) => {
      setRemove(false);
      queryClient.refetchQueries({ queryKey: ["tags"], type: "all", exact: true, stale: true });
    },
    onError: () => console.log("error"),
    mutationFn: async () => {
      const response = await axios.delete(`${url}}/tags/${id}`);
      return response.data;
    },
  });

  return (
    <>
      {/* <Modal isOpen={open} setIsOpen={setOpen} size="md" isStatic>
        <button
          className="border px-2 py-1 rounded shadow-sm text-gray-700"
          onClick={() => {
            setOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <ModalContent>
          <ModalContent.Title>
            <h3 className="text-lg font-semibold text-gray-600">Tags</h3>
            <p className="text-sm text-gray-400">Delete tag</p>
          </ModalContent.Title>
          <ModalContent.Body>
            <label className="text-sm font-medium text-gray-700">Are you sure you want to delete this tag?</label>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex items-center justify-end py-1">
              <Button
                size="small"
                color="danger"
                onClick={() => {
                  mutation.mutate();
                }}
              >
                Confirm
              </Button>
            </div>
          </ModalContent.Footer>
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
                deleteTagsMutation.mutate();
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
