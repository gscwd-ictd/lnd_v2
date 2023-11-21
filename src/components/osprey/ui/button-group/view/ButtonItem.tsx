"use client";

import React, { ButtonHTMLAttributes, forwardRef, useContext } from "react";
import { ButtonGroupContext } from "../utils/contexts";
import { styles } from "../utils/styles";

export const ButtonItem = forwardRef<HTMLButtonElement, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { size, orientation } = useContext(ButtonGroupContext);

    return (
      <button
        ref={forwardedRef}
        {...restProps}
        type="button"
        className={styles.buttonItem({ size, orientation, className })}
      >
        {children}
      </button>
    );
  }
);

ButtonItem.displayName = "ButtonItem";
