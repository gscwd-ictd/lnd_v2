import { forwardRef } from "react";
import { InputGroupProps } from "../utils/props";
import { styles } from "../utils/styles";
import { start } from "repl";

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ size = "default", startIcon, children, ...props }, forwardedRef) => {
    return (
      <div className={`${startIcon ? "relative " : ""} flex rounded-md shadow-sm`}>
        <input type="text" {...props} ref={forwardedRef} className={styles.input(startIcon, size)} />
        {startIcon !== undefined && (
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">{startIcon}</div>
        )}
        <button type="button" className={styles.button(size)}>
          {children}
        </button>
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";
