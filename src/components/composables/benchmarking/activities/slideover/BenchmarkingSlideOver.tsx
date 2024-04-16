import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { FunctionComponent } from "react";
import { useBenchmarkingSlideOver } from "../data-table/BenchmarkingDataTable";
import { useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { BenchmarkingSlideOverBody } from "./BenchmarkingSlideOverBody";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { useBenchmarkingDataTable } from "../data-table/hooks/use-benchmarking-data-table";

export const BenchmarkingSlideOver: FunctionComponent = () => {
  const { slideOverIsOpen, setSlideOverIsOpen, setHasFetchedParticipants } = useBenchmarkingSlideOver();
  const { setBenchmarkingId } = useBenchmarkingDataTable();
  const id = useBenchmarkingStore((state) => state.id);
  const setId = useBenchmarkingStore((state) => state.setId);
  const setTitle = useBenchmarkingStore((state) => state.setTitle);
  const setPartner = useBenchmarkingStore((state) => state.setPartner);
  const setLocation = useBenchmarkingStore((state) => state.setLocation);
  const setDateStarted = useBenchmarkingStore((state) => state.setDateStarted);
  const setDateEnd = useBenchmarkingStore((state) => state.setDateEnd);
  const setParticipants = useBenchmarkingStore((state) => state.setParticipants);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["view-benchmarking-details", id],
    enabled: !!id && slideOverIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/benchmark/${id}`);
      return data;
    },
    onSuccess: (data) => {
      setTitle(data.title);
      setPartner(data.partner);
      setLocation(data.location);
      setDateStarted(data.dateStarted);
      setDateEnd(data.dateEnd);
      setParticipants(data.participants);
    },
  });

  return (
    <SlideOver
      open={slideOverIsOpen}
      setOpen={setSlideOverIsOpen}
      onClose={() => {
        setSlideOverIsOpen(false);
        setId("");
        setBenchmarkingId(null);
        setHasFetchedParticipants(false);
      }}
    >
      <SlideOver.Body>
        <main>
          {(!data || isLoading || isFetching) && !isError ? (
            <div className="flex flex-col">
              <div className="flex items-center justify-center w-full h-full">
                <Spinner size="large" />
              </div>
              <div className="flex items-center justify-center w-full h-full font-sans tracking-widest animate-pulse">
                Please wait...
              </div>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-full text-red-600 text-lg pt-5">
              Error in fetching benchmarking activity
            </div>
          ) : data ? (
            <BenchmarkingSlideOverBody />
          ) : null}
        </main>
      </SlideOver.Body>
    </SlideOver>
  );
};
