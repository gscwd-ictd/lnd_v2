"use client";

import { TabContentWrap, Tabs, TabsContent, TabsList, TabsTrigger } from "@lms/components/osprey/ui/tabs/view/Tabs";
import { Dispatch, FunctionComponent, SetStateAction, createContext, use, useContext, useState } from "react";
import { IndividualLspDataTable } from "../lsp-data-table/IndividualLspDataTable";
import { OrganizationDataTable } from "../lsp-data-table/OrganizationLspDataTable";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { LspToast } from "./LspToast";

type LspState = {
  // setToastOptions: (color: ToastType["color"], title: string, content: string | undefined) => void;
  toastIsOpen: boolean;
  setToastIsOpen: Dispatch<SetStateAction<boolean>>;
  toastType: ToastType;
  setToastType: Dispatch<SetStateAction<ToastType>>;
};

export const LspToastContext = createContext({} as LspState);

export const LspTabs: FunctionComponent = () => {
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  return (
    <>
      <Tabs defaultValue="individual" className="rounded">
        <TabsList>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
        </TabsList>
        <TabContentWrap>
          <LspToastContext.Provider
            value={{
              toastType,
              toastIsOpen,
              setToastIsOpen,
              setToastType,
            }}
          >
            <TabsContent value="individual">
              <IndividualLspDataTable />
            </TabsContent>
            <TabsContent value="organization">
              <OrganizationDataTable />
            </TabsContent>

            {/* Toast Here */}
            <LspToast />
          </LspToastContext.Provider>
        </TabContentWrap>
      </Tabs>
    </>
  );
};

export const useLspTabsToastOptions = () => {
  const { toastIsOpen, toastType, setToastType, setToastIsOpen } = useContext(LspToastContext);

  // set the toast options here
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  return { toastIsOpen, setToastIsOpen, toastType, setToastOptions, setToastType };
};
