import { forwardRef } from "react";
import { CheckboxProps } from "../utils/props";
import { styles } from "../utils/styles";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, color = "indigo", className, disabled, ...restProps }, forwardedRef) => {
    return (
      <>
        <input
          id={id}
          ref={forwardedRef}
          {...restProps}
          disabled={disabled}
          type="checkbox"
          className={styles.checkbox(className, color, disabled)}
        />
        <label htmlFor={id} className="w-full cursor-pointer select-none hover:font-medium">
          {label}
        </label>
      </>
    );
  }
);

Checkbox.displayName = "Checkbox";
