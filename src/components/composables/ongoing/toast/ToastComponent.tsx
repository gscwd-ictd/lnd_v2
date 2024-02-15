import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { FunctionComponent, useContext } from "react";
import { OnGoingContext } from "../../on-going-data-table/OnGoingDataTable";

export const OngoingToastComponent: FunctionComponent = () => {
  const { toastIsOpen, setToastIsOpen, toastType } = useContext(OnGoingContext);
  return (
    <Toast
      duration={2000}
      open={toastIsOpen}
      setOpen={setToastIsOpen}
      color={toastType.color}
      title={toastType.title}
      content={toastType.content}
    />
  );
};
