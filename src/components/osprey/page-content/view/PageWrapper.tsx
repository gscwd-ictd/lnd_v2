"use client";
import { FunctionComponent, ReactNode, createContext, useEffect, useState } from "react";

type PageContentContextState = {
  windowHeight: number;
};

type PageWrapperProps = {
  children?: ReactNode | ReactNode[];
};

// hook
const useHeight = () => {
  const [height, setHeight] = useState(0);
  const handleResize = () => setHeight(window.innerHeight);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);
  return height;
};

export const PageContentContext = createContext({} as PageContentContextState);

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({ children }) => {
  const windowHeight = useHeight();

  return <PageContentContext.Provider value={{ windowHeight }}>{children}</PageContentContext.Provider>;
};
