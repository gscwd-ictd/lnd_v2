import { createContext } from "react";
import { ButtonGroupProps } from "./props";

export type ButtonGroupContextState = Pick<ButtonGroupProps, "size" | "orientation">;

export const ButtonGroupContext = createContext({} as ButtonGroupContextState);
