import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { FunctionComponent, useContext } from "react";
import { BatchWithEmployees, RecentContext } from "../../recent-data-table/RecentDataTable";
import { RecentSlideOverBody } from "./RecentSlideOverBody";

export const RecentSlideOver: FunctionComponent = () => {
  const { slideOverIsOpen, setSlideOverIsOpen, setId, setHasFetchedBatches, setSelectedBatch } =
    useContext(RecentContext);

  return (
    <SlideOver
      open={slideOverIsOpen}
      setOpen={setSlideOverIsOpen}
      size="lg"
      onClose={() => {
        setId("");
        setHasFetchedBatches(false);
        setSelectedBatch({} as BatchWithEmployees);
      }}
    >
      <SlideOver.Body>
        <RecentSlideOverBody />
      </SlideOver.Body>
    </SlideOver>
  );
};
