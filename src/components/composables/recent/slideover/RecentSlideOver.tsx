import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { FunctionComponent, useContext } from "react";
import { OnGoingContext } from "../../on-going-data-table/OnGoingDataTable";

export const RecentSlideOver: FunctionComponent = () => {
  const { slideOverIsOpen, setSlideOverIsOpen } = useContext(OnGoingContext);

  return (
    <SlideOver open={slideOverIsOpen} setOpen={setSlideOverIsOpen} size="lg">
      <SlideOver.Body>{/* <OnGoingSlideOverBody /> */}a</SlideOver.Body>
    </SlideOver>
  );
};
