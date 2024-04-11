import { InputHTMLAttributes, forwardRef } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, id, ...restProps }, forwardedRef) => {
  return (
    <>
      <input
        id={id}
        ref={forwardedRef}
        {...restProps}
        type="checkbox"
        className={`transition-colors border-2 border-gray-200 rounded-sm ${
          restProps.readOnly
            ? "cursor-default checked:bg-indigo-500 focus:checked:bg-indigo-500 focus:ring-indigo-500"
            : "cursor-pointer hover:border-indigo-500 checked:bg-indigo-500 hover:checked:bg-indigo-500 focus:ring-indigo-500 focus:checked:bg-indigo-500"
        } `}
      />
      <label htmlFor={id} className="w-full cursor-pointer select-none hover:font-medium">
        {label}
      </label>
    </>
  );
});

Checkbox.displayName = "Checkbox";
