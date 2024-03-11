import { useAppwriteClient } from "@lms/components/osprey/appwrite/view/AppwriteContainer";

export const useOrientation = () => {
  const client = useAppwriteClient(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ORIENTATION!);
  return client;
};
