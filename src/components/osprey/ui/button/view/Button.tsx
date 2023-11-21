import React from "react";
import { ButtonProps } from "../utils/props";
import { styles } from "../utils/styles";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      fluid = false,
      disabled = false,
      color = "primary",
      variant = "solid",
      size = "default",
      ...restProps
    },
    forwardedRef
  ) => {
    return (
      <button
        {...restProps}
        disabled={disabled}
        ref={forwardedRef}
        className={styles.button({ color, variant, size, className, disabled, fluid })}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
