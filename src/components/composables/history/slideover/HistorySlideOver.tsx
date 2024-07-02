import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { FunctionComponent, useContext } from "react";
import { BatchWithEmployees, RecentContext } from "../../recent-data-table/RecentDataTable";
import { HistorySlideOverBody } from "./HistorySlideOverBody";
import { HistoryContext } from "../../history-data-table/HistoryDataTable";

export const HistorySlideOver: FunctionComponent = () => {
  const { slideOverIsOpen, setSlideOverIsOpen, setId, setHasFetchedBatches, setSelectedBatch } =
    useContext(HistoryContext);

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
        <HistorySlideOverBody />
      </SlideOver.Body>
    </SlideOver>
  );
};
