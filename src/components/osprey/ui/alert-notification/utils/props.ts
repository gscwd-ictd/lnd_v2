import { ReactNode } from "react";

type AlertType = "info" | "warning" | "error" | "success" | "";

type Props = {
  className?: string;
};

export type AlertNotificationProps = Props & {
  alertType: AlertType;
  logo?: ReactNode | ReactNode[];
  notifMessage: string;
  dismissible?: boolean;
};
