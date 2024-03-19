import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { useContext } from "react";
import { LspToastContext } from "./LspTabs";

export const LspToast = () => {
  const { toastType, toastIsOpen, setToastIsOpen } = useContext(LspToastContext);
  return (
    <Toast
      duration={toastType.color === "danger" ? 2000 : 1500}
      open={toastIsOpen}
      setOpen={setToastIsOpen}
      color={toastType.color}
      title={toastType.title}
      content={toastType.content}
    />
  );
};
