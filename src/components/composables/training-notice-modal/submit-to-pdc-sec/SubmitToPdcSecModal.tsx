import { useContext } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Button } from "@lms/components/osprey/ui/button/view/Button";

export const SubmitToPdcSecModal = () => {
  const { submitToPdcSecModalIsOpen, setSubmitToPdcSecModalIsOpen } = useContext(TrainingNoticeContext);

  // handle sending, change status to for PDC Review
  const handleSend = () => {
    setSubmitToPdcSecModalIsOpen(false);
  };

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
                  type="button"
                  // onClick={() => setSendConfirmationModalIsOpen(true)}
                  onClick={handleSend}
                >
                  <span className="uppercase">Yes</span>
                </Button>
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
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
