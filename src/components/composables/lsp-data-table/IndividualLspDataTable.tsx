"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { url } from "@lms/utilities/url/api-url";
import { LearningServiceProvider } from "@lms/utilities/types/lsp";
import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIndividualLspDataTable } from "./hooks/use-individual-lsp-data-table";
import { EditLspIndividualModal } from "../lsp-modal/individual/EditLspIndividualModal";
import { DeleteLspIndividualAlertDialog } from "../lsp-modal/individual/DeleteLspIndividualAlertDialog";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import defaultPhoto from "../../../../public/images/placeholders/user-placeholder-gray.png";
import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { ViewIndTrainingsByLspModal } from "../trainings-by-lsp/modal/ViewIndTrainingsByLspModal";
import { EditUploadPhotoAlert } from "../lsp-modal/individual/EditUploadPhotoAlert";
import { IndividualLspSlideOver } from "./slideover/IndividualLspSlideOver";
import { LspSource, useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import { ViewIndTrainingRatingModal } from "../trainings-by-lsp/modal/ViewIndTrainingRatingModal";

type TrainingState = {
  trainingIsOpen: boolean;
  setTrainingIsOpen: Dispatch<SetStateAction<boolean>>;
  lspName: string;
  setLspName: Dispatch<SetStateAction<string>>;
  slideOverIsOpen: boolean;
  setSlideOverIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string | null;
  setId: Dispatch<SetStateAction<string | null>>;
  uploadAlertIsOpen: boolean;
  setUploadAlertIsOpen: Dispatch<SetStateAction<boolean>>;
};

type ViewRatingsState = {
  ratingIsOpen: boolean;
  setRatingIsOpen: Dispatch<SetStateAction<boolean>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
};

export const TrainingLspContext = createContext({} as TrainingState);
export const TrainingIndLspRatingContext = createContext({} as ViewRatingsState);

export const IndividualLspDataTable: FunctionComponent = () => {
  const { columns, edit, remove, lspId, trainingIsOpen, setTrainingIsOpen, setEdit, setRemove } =
    useIndividualLspDataTable();
  // const [open, setOpen] = useState<boolean>(false);
  const [slideOverIsOpen, setSlideOverIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [lspName, setLspName] = useState<string>("");
  const [ratingIsOpen, setRatingIsOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [uploadAlertIsOpen, setUploadAlertIsOpen] = useState<boolean>(false);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);

  return (
    <>
      <TrainingLspContext.Provider
        value={{
          trainingIsOpen,
          setTrainingIsOpen,
          lspName,
          setLspName,
          slideOverIsOpen,
          setSlideOverIsOpen,
          id,
          setId,
          uploadAlertIsOpen,
          setUploadAlertIsOpen,
        }}
      >
        <TrainingIndLspRatingContext.Provider value={{ ratingIsOpen, setRatingIsOpen, rating, setRating }}>
          <DataTable<LearningServiceProvider>
            // datasource={`${url}/lsp-details/individual?page=1&limit=40`}
            datasource={`${url}/lsp/q?type=individual&page=1&limit=40`}
            queryKey={["lsp-individual"]}
            columns={columns}
            title="Learning Service Providers"
            subtitle="Select any of the learning service providers below to view details."
            onRowClick={(row) => {
              setSlideOverIsOpen(true);
              setLspSource(row.original.source === "internal" ? LspSource.INTERNAL : LspSource.EXTERNAL);
              setId(row.original.id!);
            }}
          />
          <IndividualLspSlideOver />
          <EditUploadPhotoAlert />
          <DeleteLspIndividualAlertDialog id={lspId} remove={remove} setRemove={setRemove} />
          <EditLspIndividualModal edit={edit} id={lspId} setEdit={setEdit} />
          <ViewIndTrainingsByLspModal
            id={lspId}
            trainingIsOpen={trainingIsOpen}
            setTrainingIsOpen={setTrainingIsOpen}
          />
          <ViewIndTrainingRatingModal />
        </TrainingIndLspRatingContext.Provider>
      </TrainingLspContext.Provider>
    </>
  );
};

export const useIndSlideOver = () => {
  const {
    uploadAlertIsOpen,
    setUploadAlertIsOpen,
    lspName,
    setLspName,
    setSlideOverIsOpen,
    setTrainingIsOpen,
    slideOverIsOpen,
    trainingIsOpen,
    id,
    setId,
  } = useContext(TrainingLspContext);

  return {
    uploadAlertIsOpen,
    setUploadAlertIsOpen,
    id,
    setId,
    lspName,
    setLspName,
    setSlideOverIsOpen,
    setTrainingIsOpen,
    slideOverIsOpen,
    trainingIsOpen,
  };
};
