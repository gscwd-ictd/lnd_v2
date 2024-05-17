"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { url } from "@lms/utilities/url/api-url";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { useOrganizationLspDataTable } from "./hooks/use-organization-lsp-data-table";
import { EditLspOrganizationModal } from "../lsp-modal/organization/EditLspOrganizationModal";
import { DeleteLspOrganizationAlertDialog } from "../lsp-modal/organization/DeleteLspOrganizationAlertDialog";
import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import defaultPhoto from "../../../../public/images/placeholders/user-placeholder-gray.png";
import { Disclosure } from "@headlessui/react";
import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { OrganizationSlideOver } from "./slideover/OrganizationSlideOver";
import { EditUploadPhotoAlert } from "../lsp-modal/organization/EditUploadPhotoAlert";
import { ViewOrgTrainingRatingModal } from "../trainings-by-lsp/modal/ViewOrgTrainingRatingModal";
import { ViewOrgTrainingsByLspModal } from "../trainings-by-lsp/modal/ViewOrgTrainingsByLspModal";

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

export const TrainingOrgLspContext = createContext({} as TrainingState);
export const TrainingOrgLspRatingContext = createContext({} as ViewRatingsState);

export const OrganizationDataTable: FunctionComponent = () => {
  const { columns, edit, lspId, setEdit, remove, setRemove, trainingIsOpen, setTrainingIsOpen } =
    useOrganizationLspDataTable();
  const [id, setId] = useState<string | null>(null);
  const [lspName, setLspName] = useState<string>("");
  const [ratingIsOpen, setRatingIsOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [slideOverIsOpen, setSlideOverIsOpen] = useState<boolean>(false);
  const [uploadAlertIsOpen, setUploadAlertIsOpen] = useState<boolean>(false);

  // all lsp query
  const { data: allLsp, error: errorAllLsp } = useQuery({
    queryKey: ["lsp-organization-details", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/lsp/${id}`);
      return data;
    },
    enabled: !!id,
  });

  return (
    <>
      <TrainingOrgLspContext.Provider
        value={{
          id,
          trainingIsOpen,
          uploadAlertIsOpen,
          lspName,
          slideOverIsOpen,
          setId,
          setSlideOverIsOpen,
          setLspName,
          setTrainingIsOpen,
          setUploadAlertIsOpen,
        }}
      >
        <TrainingOrgLspRatingContext.Provider value={{ rating, ratingIsOpen, setRating, setRatingIsOpen }}>
          <OrganizationSlideOver />
          <DataTable
            title="Learning Service Providers"
            subtitle="Select any of the learning service providers below to view details."
            columns={columns}
            // datasource={`${url}/lsp-details/organization?page=1&limit=40`}
            datasource={`${url}/lsp/q?type=organization&page=1&limit=40`}
            queryKey={["lsp-organization"]}
            onRowClick={(row) => {
              setSlideOverIsOpen(true);
              setId(row.original.id!);
            }}
          />
          <EditUploadPhotoAlert />
          <DeleteLspOrganizationAlertDialog id={lspId} remove={remove} setRemove={setRemove} />
          <EditLspOrganizationModal edit={edit} id={lspId} setEdit={setEdit} />
          <ViewOrgTrainingsByLspModal
            id={lspId}
            trainingIsOpen={trainingIsOpen}
            setTrainingIsOpen={setTrainingIsOpen}
          />
          <ViewOrgTrainingRatingModal />
        </TrainingOrgLspRatingContext.Provider>
      </TrainingOrgLspContext.Provider>
    </>
  );
};

export const useOrgSlideOver = () => {
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
  } = useContext(TrainingOrgLspContext);

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
