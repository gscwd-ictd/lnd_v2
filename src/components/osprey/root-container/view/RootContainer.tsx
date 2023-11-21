"use client";

import { HTMLAttributes, forwardRef, useState } from "react";
import { styles } from "../utils/styles";
import { SidebarContext } from "../../navigations/side/sidebar/utils/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const RootContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const [activeNav, setActiveNav] = useState(0);
    const [queryClient] = useState(new QueryClient());

    return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <div {...restProps} ref={forwardedRef} className={styles.root(className)}>
          <SidebarContext.Provider value={{ activeNav, setActiveNav }}>{children}</SidebarContext.Provider>
        </div>
      </QueryClientProvider>
    );
  }
);

RootContainer.displayName = "RootContainer";
