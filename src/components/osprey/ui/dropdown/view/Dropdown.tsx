"use client";

import { Content, Item, Portal, Root, Sub, SubContent, SubTrigger, Trigger } from "@radix-ui/react-dropdown-menu";
import { FunctionComponent, HTMLAttributes, forwardRef } from "react";
import { DropdownProps } from "../utils/props";
import { styles } from "../utils/styles";
import React from "react";

export const Dropdown = Root;

export const DropdownTrigger: FunctionComponent<DropdownProps> = ({ children }) => {
  return <Trigger asChild>{children}</Trigger>;
};

export const DropdownContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => {
  return (
    <Content ref={ref} {...props} className={styles.dropdowncontent({ className })} sideOffset={5}>
      {children}
    </Content>
  );
});

export const DropdownItem: FunctionComponent<DropdownProps> = ({ children }) => {
  return <Item className="py-2 px-3 rounded-md text-sm cursor-pointer hover:bg-gray-100">{children}</Item>;
};

export const DropdownSub: FunctionComponent<DropdownProps> = ({ children }) => {
  return <Sub>{children}</Sub>;
};

export const DropdownSubTrigger: FunctionComponent<DropdownProps> = ({ children }) => {
  return (
    <SubTrigger className="flex py-2 px-3 rounded-md text-sm hover:bg-gray-100">
      {children}
      <div className="flex items-center ml-auto">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </SubTrigger>
  );
};

export const DropdownSubItem = forwardRef<
  React.ElementRef<typeof SubContent>,
  React.ComponentPropsWithoutRef<typeof SubContent>
>(({ children, className, ...props }, ref) => {
  return (
    <Portal>
      <SubContent sideOffset={10} className={styles.dropdownsubitem({ className })}>
        {children}
      </SubContent>
    </Portal>
  );
});

DropdownContent.displayName = "DropdownContent";
DropdownSubItem.displayName = "DropdownSubItem";
