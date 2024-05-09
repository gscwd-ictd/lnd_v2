import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { FunctionComponent } from "react";
import { useOthersSlideOver } from "../data-table/OthersDataTable";
import { useOthersDataTable } from "../data-table/hooks/use-others-data-table";
import { OthersSlideOverBody } from "./OthersSlideOverBody";
import { useOthersCategoryStore, useOthersStore } from "@lms/utilities/stores/others-store";

export const OthersSlideOver: FunctionComponent = () => {
  const { slideOverIsOpen, setSlideOverIsOpen } = useOthersSlideOver();
  const { setOthersId } = useOthersDataTable();

  const id = useOthersStore((state) => state.id);
  const setId = useOthersStore((state) => state.setId);
  const setTitle = useOthersStore((state) => state.setTitle);
  const setCategory = useOthersCategoryStore((state) => state.setCategory);
  const setLocation = useOthersStore((state) => state.setLocation);
  const setDateFrom = useOthersStore((state) => state.setDateFrom);
  const setDateTo = useOthersStore((state) => state.setDateTo);

  return (
    <SlideOver
      open={slideOverIsOpen}
      setOpen={setSlideOverIsOpen}
      size="lg"
      onClose={() => {
        setSlideOverIsOpen(false);
        setId("");
        setOthersId(null);
        setTitle("");
        setCategory(undefined);
        setLocation("");
        setDateFrom("");
        setDateTo("");
        console.log("CLEAR");
      }}
    >
      <SlideOver.Body>
        <main>
          <OthersSlideOverBody />
        </main>
      </SlideOver.Body>
    </SlideOver>
  );
};
