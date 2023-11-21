import { DialogProps } from "@radix-ui/react-dialog";
import { ModalSize } from "./types";
import { MouseEventHandler, ReactNode } from "react";

/**
 * Type used for modal's compound components - Title, Body, and Footer
 */
export type ModalCompositionProps = {
  children?: ReactNode | ReactNode[];
};

export type ModalProps = Omit<DialogProps, "open" | "onOpenChange"> & {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  fixedHeight?: boolean;
  center?: boolean;
  size?: ModalSize;
  isStatic?: boolean;
  withCloseBtn?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  animate?: boolean;
};
