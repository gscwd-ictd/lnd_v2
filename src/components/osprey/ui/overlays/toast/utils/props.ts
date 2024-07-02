import { ReactNode } from "react";
// import { create } from "zustand";

// export type ToastRootProps = {
//   open: boolean;
//   setOpen: (state: boolean) => void;
// };

export type ToastStore = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

// export const useToastStore = create<ToastStore>((set) => ({
//   open: false,
//   setOpen: (open) => set({ open }),
// }));

export type ToastProps = {
  duration?: number;
  startIcon?: ReactNode | ReactNode[];
  color?: "success" | "warning" | "info" | "default" | "danger";
  title: string;
  content?: string;
  children?: ReactNode | ReactNode[];
  open?: boolean;
  setOpen?: (state: boolean) => void;
};

export type ToastType = {
  color: "success" | "warning" | "info" | "default" | "danger";
  title: string;
  content: string | undefined;
};

export type MyToastProps = {
  toast: ToastProps;
};
