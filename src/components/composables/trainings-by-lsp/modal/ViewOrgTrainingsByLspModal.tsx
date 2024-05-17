"use client";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { useLspTrainingsDataTable } from "../hooks/use-lsp-trainings-data-table";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { TrainingOrgLspRatingContext } from "../../lsp-data-table/OrganizationLspDataTable";
import { url } from "@lms/utilities/url/api-url";
import { isEmpty } from "lodash";
import { useOrganizationLspDataTable } from "../../lsp-data-table/hooks/use-organization-lsp-data-table";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

type ViewTrainingsByLspModalProps = {
  id: string;
  trainingIsOpen: boolean;
  setTrainingIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ViewOrgTrainingsByLspModal: FunctionComponent<ViewTrainingsByLspModalProps> = ({
  setTrainingIsOpen,
  trainingIsOpen,
}) => {
  const { columns } = useLspTrainingsDataTable();
  const name = useLspDetailsStore((state) => state.name);
  const { setRatingIsOpen, setRating } = useContext(TrainingOrgLspRatingContext);
  const id = useLspDetailsStore((state) => state.id);
  const setId = useLspDetailsStore((state) => state.setId);
  const setTrainingId = useTrainingNoticeStore((state) => state.setId);

  return (
    <>
      <Modal
        isOpen={trainingIsOpen}
        setIsOpen={setTrainingIsOpen}
        size="xl"
        animate={false}
        isStatic
        onClose={() => {
          // setId(null);
          setId("");
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header>
              <h3 className="font-sans text-xl font-medium px-2">Trainings by {name}</h3>
            </header>
          </ModalContent.Title>

          {id ? (
            <DataTable
              columns={columns}
              datasource={`${url}/lsp/${id}/rating`}
              // datasource={`${url}/lsp/q?type=individual&page=1&limit=40`}
              // datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/test-lsp-trainings`}
              queryKey={["lsp-trainings", id!]}
              // title=""

              onRowClick={(row) => {
                // setId(row.original.id);
                setTrainingId(row.original.id);
                setRatingIsOpen(true);
                setRating(row.original.rating ?? 0);
              }}
            />
          ) : (
            <Spinner />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
