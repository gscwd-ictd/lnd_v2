"use client";

import { FunctionComponent } from "react";
import { ButtonGroupProps } from "../utils/props";
import { ButtonGroupContext } from "../utils/contexts";
import { styles } from "../utils/styles";
import { ButtonItem } from "./ButtonItem";

export const ButtonGroup: FunctionComponent<ButtonGroupProps> = ({
  size = "default",
  orientation = "horizontal",
  children,
  className,
}) => {
  return (
    <div className={styles.buttonGroup({ className, orientation })}>
      <ButtonGroupContext.Provider value={{ size, orientation }}>{children}</ButtonGroupContext.Provider>
    </div>
  );
};
