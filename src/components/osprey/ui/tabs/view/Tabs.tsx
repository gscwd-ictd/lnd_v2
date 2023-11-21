import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, ElementRef, FunctionComponent, ReactNode, forwardRef, useState } from "react";
import { styles } from "../utils/styles";
import { createContext, useContext } from "react";

type TabContentWrapProp = {
  children?: ReactNode | ReactNode[];
};

type TabsContextState = {
  orientationState: "horizontal" | "vertical" | undefined;
  setOrientationState: (orientation: "horizontal" | "vertical") => void;
};

export const TabsContext = createContext({} as TabsContextState);

export const Tabs = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, orientation = "horizontal", children, ...props }, forwardedRef) => {
    const [orientationState, setOrientationState] = useState(orientation);

    return (
      <Root ref={forwardedRef} {...props} className={`${styles.root} ${className}`}>
        <TabsContext.Provider value={{ orientationState, setOrientationState }}>
          <div className={`${orientation == "horizontal" ? "flex-col block" : "flex"}`}>{children}</div>
        </TabsContext.Provider>
      </Root>
    );
  }
);

export const TabContentWrap: FunctionComponent<TabContentWrapProp> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export const TabsContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, children, value }, forwardedRef) => {
    return (
      <Content ref={forwardedRef} value={value} className={`${styles.content} ${className}`}>
        {children}
      </Content>
    );
  }
);

export const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, children, ...props }, forwardedRef) => {
    const { orientationState } = useContext(TabsContext);

    return (
      <List ref={forwardedRef} {...props} className={`${orientationState === "horizontal" ? "" : "flex flex-col"}`}>
        {children}
      </List>
    );
  }
);

export const TabsTrigger = forwardRef<ElementRef<typeof Trigger>, ComponentPropsWithoutRef<typeof Trigger>>(
  ({ className, children, value, ...props }, forwardedRef) => {
    return (
      <Trigger ref={forwardedRef} {...props} value={value} className={`${styles.trigger} ${className}`}>
        {children}
      </Trigger>
    );
  }
);

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsContent.displayName = "TabsContent";
TabsTrigger.displayName = "TabsTrigger";
