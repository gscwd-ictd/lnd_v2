"use client";
import { useContext, useState } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";

export const SubmitToPdcSecModal = () => {
  const queryClient = useQueryClient();
  const { id } = useContext(TrainingNoticeContext);
  const { submitToPdcSecModalIsOpen, setSubmitToPdcSecModalIsOpen } = useContext(TrainingNoticeContext);

  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  // toast options
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const submitToPdcMutation = useMutation({
    onSuccess: async () => {
      const getTrainingNotice = await axios.get(`${url}/training`, { withCredentials: true });

      queryClient.setQueryData(["training-notice"], getTrainingNotice.data.items);
      setToastOptions("success", "Success", "You have sent the training to the PDC Secretary.");
      setSubmitToPdcSecModalIsOpen(false);
    },
    mutationFn: async () => {
      const response = await axios.patch(`${url}/training/${id}/approvals`, {}, { withCredentials: true });
      return response;
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong. Please try in a few seconds.");
    },
  });

  return (
    <>
      <Modal
        isOpen={submitToPdcSecModalIsOpen}
        setIsOpen={setSubmitToPdcSecModalIsOpen}
        size="xs"
        animate={false}
        center
        withCloseBtn={false}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Action Needed</h3>
              </div>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {/* <TrainingRecommendations /> */}
              Submit to PDC Secretariat?
            </main>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  size="small"
                  className="w-[5rem]"
                  variant="white"
                  onClick={() => {
                    setSubmitToPdcSecModalIsOpen(false);
                  }}
                >
                  <span className="uppercase">No</span>
                </Button>
                <Button
                  size="small"
                  className="w-[5rem]"
                  type="button"
                  // onClick={() => setSendConfirmationModalIsOpen(true)}
                  onClick={async () => await submitToPdcMutation.mutateAsync()}
                >
                  <span className="uppercase">Yes</span>
                </Button>
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
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
