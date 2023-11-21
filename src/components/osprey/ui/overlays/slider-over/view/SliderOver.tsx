import React, { createContext, Fragment, FunctionComponent, ReactNode, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { styles } from "../utils/styles";

type SlideOverContextState = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

type Props = {
  children: ReactNode | Array<ReactNode>;
};

type SlideOverProps = Props & {
  open: boolean;
  setOpen: (state: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

type HeaderProps = Props & {
  withCloseBtn?: boolean;
};

type FooterProps = Props & {
  alignEnd?: boolean;
};

type SlideOverComposition = {
  Header: typeof Header;
  Title: typeof Title;
  Body: typeof Body;
  Footer: typeof Footer;
};

const SlideOverContext = createContext({} as SlideOverContextState);

export const SlideOver: FunctionComponent<SlideOverProps> & SlideOverComposition = ({
  open = false,
  setOpen,
  size = "sm",
  children,
}) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 blur-lg transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={styles.panel(size)}>
                  <SlideOverContext.Provider value={{ open, setOpen }}>
                    <div className="flex h-full flex-col bg-white shadow-xl">{children}</div>
                  </SlideOverContext.Provider>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Header: FunctionComponent<HeaderProps> = ({ children, withCloseBtn }) => {
  const { setOpen } = useContext(SlideOverContext);

  // change close button
  return <header className={styles.header(withCloseBtn)}>{children}</header>;
};

const Title: FunctionComponent<Props> = ({ children }) => {
  return <div>{children}</div>;
};

const Body: FunctionComponent<Props> = ({ children }) => {
  return <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>;
};

const Footer: FunctionComponent<FooterProps> = ({ children, alignEnd }) => {
  return <footer className={styles.footer(alignEnd)}>{children}</footer>;
};

SlideOver.Header = Header;

SlideOver.Title = Title;

SlideOver.Body = Body;

SlideOver.Footer = Footer;
