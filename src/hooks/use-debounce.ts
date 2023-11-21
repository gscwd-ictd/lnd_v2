import { useState } from "react";

export const useDebounce = (delay: number, callBack: Function) => {
  const [_, setEnabled] = useState(false);

  let timer: NodeJS.Timeout | null;
  return (...args: any[]) => {
    setEnabled(true);
    const context = this;
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      setEnabled(false);
      timer = null;
      callBack.apply(context, args);
    }, delay);
  };
};
