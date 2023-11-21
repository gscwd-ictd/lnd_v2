import { MouseEventHandler } from "react";
import { Content } from "@radix-ui/react-dialog";

export type ModalSize = "xs" | "sm" | "md" | "2md" | "3md" | "lg" | "xl" | "full";

/**
 * Custom type for combining Dialog.Content props and Modal compound components
 */
export type ModalContentComposition<T> = React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof Content> & React.RefAttributes<typeof Content>
> & {
  Title: T;
  Body: T;
  Footer: T;
};

/**
 * Modal context state to keep track of modal's open state
 */
export type ModalContextState = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  isStatic?: boolean;
  fixedHeight?: boolean;
  center?: boolean;
  size?: ModalSize;
  onClose?: MouseEventHandler<HTMLButtonElement | undefined>;
  withCloseBtn?: boolean;
  animate?: boolean;
};
