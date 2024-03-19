import { useAppwriteClient } from "@lms/components/osprey/appwrite/view/AppwriteContainer";

export const useLspExternal = () => {
  const client = useAppwriteClient(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_LSP_EXTERNAL!);
  return client;
};
