import { useAppwriteClient } from "@lms/components/osprey/appwrite/view/AppwriteContainer";

export const useBenchmarking = () => {
  const client = useAppwriteClient(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_BENCHMARKING!);

  return client;
};
