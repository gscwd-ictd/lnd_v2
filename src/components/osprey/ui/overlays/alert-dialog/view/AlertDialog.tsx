import React, { ComponentPropsWithoutRef, ElementRef, FunctionComponent, ReactNode, forwardRef } from "react";
import {
  Root,
  Portal,
  Content,
  Title,
  Cancel,
  Action,
  Description,
  Overlay,
  Trigger,
} from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion } from "framer-motion";

export const AlertDialog = Root;

export const AlertDialogTrigger = Trigger;

export const AlertDialogContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ children }, forwardedRef) => {
    return (
      <Portal>
        <Overlay forceMount className="fixed inset-0 z-[51] bg-black/50" />
        <Content
          className="fixed z-[51] w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          ref={forwardedRef}
        >
          {children}
        </Content>
      </Portal>
    );
  }
);

export const AlertDialogTitle = Title;

export const AlertDialogDescription = Description;

export const AlertDialogCancel = Cancel;

export const AlertDialogAction = Action;

AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogTrigger.displayName = "AlertDialogTrigger";
