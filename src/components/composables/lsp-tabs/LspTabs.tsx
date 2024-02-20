"use client";

import { TabContentWrap, Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/osprey/ui/tabs/view/Tabs";
import { FunctionComponent } from "react";
import { IndividualLspDataTable } from "../lsp-data-table/IndividualLspDataTable";
import { OrganizationDataTable } from "../lsp-data-table/OrganizationLspDataTable";

export const LspTabs: FunctionComponent = () => {
  return (
    <>
      <Tabs defaultValue="individual" className="rounded">
        <TabsList>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
        </TabsList>
        <TabContentWrap>
          <TabsContent value="individual">
            <IndividualLspDataTable />
          </TabsContent>
          <TabsContent value="organization">
            <OrganizationDataTable />
          </TabsContent>
        </TabContentWrap>
      </Tabs>
    </>
  );
};
