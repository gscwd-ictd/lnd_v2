import { createContext } from "react";
import { ModalContextState } from "./types";

/**
 * Initialize ModalContext
 */
export const ModalContext = createContext({} as ModalContextState);
