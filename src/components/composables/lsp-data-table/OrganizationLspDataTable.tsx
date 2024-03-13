"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { url } from "@lms/utilities/url/api-url";
import { FunctionComponent } from "react";
import { useOrganizationLspDataTable } from "./hooks/use-organization-lsp-data-table";
import { EditLspOrganizationModal } from "../lsp-modal/organization/EditLspOrganizationModal";
import { DeleteLspOrganizationAlertDialog } from "../lsp-modal/organization/DeleteLspOrganizationAlertDialog";

export const OrganizationDataTable: FunctionComponent = () => {
  const { columns, edit, lspId, setEdit, remove, setRemove } = useOrganizationLspDataTable();

  return (
    <>
      {/* <SlideOver open={open} setOpen={setOpen}>
        <SlideOver.Title>Title</SlideOver.Title>
        <SlideOver.Body>{allLsp && JSON.stringify(allLsp)}</SlideOver.Body>
      </SlideOver> */}
      <DataTable
        title="Learning Service Providers"
        subtitle="Select any of the learning service providers below to view details."
        columns={columns}
        // datasource={`${url}/lsp-details/organization?page=1&limit=40`}
        datasource={`${url}/lsp/q?type=organization&page=1&limit=40`}
        queryKey={["lsp-organization"]}
      />
      <DeleteLspOrganizationAlertDialog id={lspId} remove={remove} setRemove={setRemove} />
      <EditLspOrganizationModal edit={edit} id={lspId} setEdit={setEdit} />
    </>
  );
};
