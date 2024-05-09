import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { FunctionComponent } from "react";
import { useBenchmarkingSlideOver } from "../data-table/BenchmarkingDataTable";
import { useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import { BenchmarkingSlideOverBody } from "./BenchmarkingSlideOverBody";
import { useBenchmarkingDataTable } from "../data-table/hooks/use-benchmarking-data-table";

export const BenchmarkingSlideOver: FunctionComponent = () => {
  const { slideOverIsOpen, setSlideOverIsOpen, setHasFetchedParticipants } = useBenchmarkingSlideOver();
  const { setBenchmarkingId } = useBenchmarkingDataTable();
  const setId = useBenchmarkingStore((state) => state.setId);
  const setTitle = useBenchmarkingStore((state) => state.setTitle);
  const setPartner = useBenchmarkingStore((state) => state.setPartner);
  const setLocation = useBenchmarkingStore((state) => state.setLocation);
  const setDateFrom = useBenchmarkingStore((state) => state.setDateFrom);
  const setDateTo = useBenchmarkingStore((state) => state.setDateTo);

  return (
    <SlideOver
      open={slideOverIsOpen}
      setOpen={setSlideOverIsOpen}
      size="lg"
      onClose={() => {
        setSlideOverIsOpen(false);
        setId("");
        setTitle("");
        setPartner("");
        setLocation("");
        setDateFrom("");
        setDateTo("");
        setBenchmarkingId(null);
        setHasFetchedParticipants(false);
      }}
    >
      <SlideOver.Body>
        <main>
          <BenchmarkingSlideOverBody />
        </main>
      </SlideOver.Body>
    </SlideOver>
  );
};
