import { UsersContext } from "@lms/app/settings/users-data-table/UsersDataTable";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { FunctionComponent, useContext } from "react";

export const UsersToastComponent: FunctionComponent = () => {
  const { toastIsOpen, setToastIsOpen, toastType } = useContext(UsersContext);
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
