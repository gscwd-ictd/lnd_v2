import { useAppwriteClient } from "@lms/components/osprey/appwrite/view/AppwriteContainer";

export const useLnd = () => {
  const client = useAppwriteClient(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_LND!);
  return client;
};
