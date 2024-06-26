"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { AppwriteClientContextState } from "../utils/types";
import { Client } from "appwrite";
import { appwriteUrl } from "@lms/utilities/url/api-url";

const AppwriteClientContext = createContext({
  client: undefined,
} as AppwriteClientContextState);

type AppwriteContainerProps = {
  children: ReactNode | ReactNode[];
};

export const useAppwriteClient = (projectId: string) => {
  const { client } = useContext(AppwriteClientContext);
  client?.setProject(projectId);
  return client;
};

export const AppwriteClientContainer = ({ children }: AppwriteContainerProps) => {
  // const [client] = useState(() =>
  //   new Client().setEndpoint(appwriteUrl!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_LND!)
  // );
  const [client] = useState(new Client().setEndpoint(appwriteUrl!));

  return <AppwriteClientContext.Provider value={{ client }}>{children}</AppwriteClientContext.Provider>;
};

AppwriteClientContainer.displayName = "AppwriteClientContainer";
