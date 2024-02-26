import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { FunctionComponent, useContext } from "react";
import { RecentContext } from "../../recent-data-table/RecentDataTable";
import { RecentSlideOverBody } from "./RecentSlideOverBody";

export const RecentSlideOver: FunctionComponent = () => {
  const { slideOverIsOpen, setSlideOverIsOpen, setId, setHasFetchedBatches } = useContext(RecentContext);

  return (
    <SlideOver
      open={slideOverIsOpen}
      setOpen={setSlideOverIsOpen}
      size="lg"
      onClose={() => {
        setId("");
        setHasFetchedBatches(false);
      }}
    >
      <SlideOver.Body>
        <RecentSlideOverBody />
      </SlideOver.Body>
    </SlideOver>
  );
};
