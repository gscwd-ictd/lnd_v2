import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { useViewNomineesContext } from "./ViewNomineeStatusModal";
import { ViewNominationStatusDataTable } from "@lms/components/osprey/ui/local-table/data-table/view/ViewNominationStatusDataTable";
import { useViewNominationStatusDataTable } from "./data-table/use-view-nomination-status-data-table";
import { useContext } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { url } from "@lms/utilities/url/api-url";

export const ViewNominationStatusModal = () => {
  const { id } = useContext(TrainingNoticeContext);

  const { viewDistributionModalIsOpen, setViewDistributionModalIsOpen, nominationDetails, setNominationDetails } =
    useViewNomineesContext();

  const { columns } = useViewNominationStatusDataTable();

  return (
    <Modal isOpen={viewDistributionModalIsOpen} setIsOpen={setViewDistributionModalIsOpen} size="xl" withCloseBtn>
      <ModalContent>
        <ModalContent.Title>
          <header>
            <h3 className="text-xl font-semibold px-2">Slot Distribution Status</h3>
          </header>
        </ModalContent.Title>
        <ModalContent.Body>
          <main>
            <div className="rounded border mt-4 mx-2">
              <ViewNominationStatusDataTable
                columns={columns}
                datasource={`${url}/training/${id}/distributions`}
                queryKey={["view-nomination-status", id!]}
              />
            </div>
          </main>
        </ModalContent.Body>
        <ModalContent.Footer>
          <div className="flex w-full justify-end">
            <Button
              variant="white"
              size="small"
              onClick={() => {
                setViewDistributionModalIsOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </ModalContent.Footer>
      </ModalContent>
    </Modal>
  );
};
