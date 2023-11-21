import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { FunctionComponent, useContext, useEffect } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";

export const ConfirmCompleteTrainingModal: FunctionComponent = () => {
  const { confirmCompleteModalIsOpen, setConfirmCompleteModalIsOpen, setSendConfirmationModalIsOpen } =
    useContext(TrainingNoticeContext);

  return (
    <>
      <Modal
        isOpen={confirmCompleteModalIsOpen}
        setIsOpen={setConfirmCompleteModalIsOpen}
        size="sm"
        animate={false}
        center
        isStatic
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
              Is the training details complete?
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  size="small"
                  className="w-[5rem]"
                  type="button"
                  onClick={() => setSendConfirmationModalIsOpen(true)}
                >
                  <span className="uppercase">Yes</span>
                </Button>
                <Button
                  size="small"
                  className="w-[5rem]"
                  variant="white"
                  onClick={() => {
                    setConfirmCompleteModalIsOpen(false);
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
