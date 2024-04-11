"use client";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { useLspTrainingsDataTable } from "../hooks/use-lsp-trainings-data-table";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { TrainingLspRatingContext } from "../../lsp-data-table/IndividualLspDataTable";

type ViewTrainingsByLspModalProps = {
  id: string;
  trainingIsOpen: boolean;
  setTrainingIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ViewTrainingsByLspModal: FunctionComponent<ViewTrainingsByLspModalProps> = ({
  setTrainingIsOpen,
  trainingIsOpen,
}) => {
  const { columns } = useLspTrainingsDataTable();
  const name = useLspDetailsStore((state) => state.name);
  const setId = useTrainingNoticeStore((state) => state.setId);
  const { setRatingIsOpen, setRating } = useContext(TrainingLspRatingContext);

  return (
    <>
      <Modal isOpen={trainingIsOpen} setIsOpen={setTrainingIsOpen} size="xl">
        <ModalContent>
          <ModalContent.Title>
            <header>
              <h3 className="font-sans text-xl font-medium px-2">Trainings by {name}</h3>
            </header>
          </ModalContent.Title>

          <DataTable
            columns={columns}
            // datasource={`${url}/lsp/q?type=individual&page=1&limit=40`}
            datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/test-lsp-trainings`}
            queryKey={["lsp-trainings"]}
            // title=""
            onRowClick={(row) => {
              setId(row.original.id);
              setRatingIsOpen(true);
              setRating(row.original.rating ?? 0);
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
