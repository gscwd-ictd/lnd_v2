import { useQuery } from "@tanstack/react-query";

export const ViewNomineeRedistModal = () => {
  const {} = useQuery({
    queryFn: async () => {
      // get the list of people for redist here
    },
  });

  return <></>;
};
