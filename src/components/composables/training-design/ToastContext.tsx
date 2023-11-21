"use client";

import { ToastProps } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";

type CustomToastState = Pick<ToastProps, "color" | "title" | "content"> & {
  toastIsOpen: boolean;
  setToastIsOpen: Dispatch<SetStateAction<boolean>>;
  setToastOptions: (
    color: "default" | "success" | "danger" | "info" | "warning",
    title: string,
    content: string
  ) => void;
};

type CustomToastProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

const ToastContext = createContext<CustomToastState | undefined>(undefined);

export const CustomToastProvider: FunctionComponent<CustomToastProviderProps> = ({ children }) => {
  const [color, setColor] = useState<"default" | "success" | "danger" | "info" | "warning">("default");

  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);

  const setToastOptions = (
    color: "default" | "success" | "danger" | "info" | "warning",
    title: string,
    content: string
  ) => {
    setColor(color);
    setTitle(title);
    setContent(content);
    setToastIsOpen(true);
  };

  return (
    <ToastContext.Provider value={{ color, title, content, toastIsOpen, setToastIsOpen, setToastOptions }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const toastContext = useContext(ToastContext);

  if (toastContext === undefined) throw new Error("Toast context must be inside context provider");

  return toastContext;
};
