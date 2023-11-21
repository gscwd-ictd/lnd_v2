"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { AppwriteClientContextState } from "../utils/types";
import { Client } from "appwrite";

const AppwriteClientContext = createContext({
  client: undefined,
} as AppwriteClientContextState);

type AppwriteContainerProps = {
  children: ReactNode | ReactNode[];
};

export const useAppwriteClient = () => {
  const { client } = useContext(AppwriteClientContext);

  return client;
};

export const AppwriteClientContainer = ({ children }: AppwriteContainerProps) => {
  const [client] = useState(() =>
    new Client().setEndpoint("http://172.20.110.55:8001/v1").setProject("6507a5e601e17c0ddd99")
  );

  return <AppwriteClientContext.Provider value={{ client }}>{children}</AppwriteClientContext.Provider>;
};

AppwriteClientContainer.displayName = "AppwriteClientContainer";
