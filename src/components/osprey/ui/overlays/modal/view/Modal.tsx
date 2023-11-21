import { Root, Content, Portal, Overlay, Trigger, Close } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, FunctionComponent, useContext, useState } from "react";
import { ModalContext } from "../utils/context";
import { ModalCompositionProps, ModalProps } from "../utils/props";
import { styles } from "../utils/styles";
import { ModalContentComposition } from "../utils/types";

/**
 * Copy Dialog.Trigger as ModalTrigger
 *
 * This component is used to open the modal
 */
export const ModalTrigger = Trigger;

/**
 * Copy Dialog.Close as ModalClose
 *
 * This component is used to close the modal
 */
export const ModalClose = Close;

/**
 *
 * - A component in which users cannot interact with your application until it is closed.
 * - Interrupt the user’s attention and halt all other actions until a message is dealt with or dismissed.
 * - This component is using radix-ui's Dialog primitive for out-of-the-box accessibility.
 * - Please visit their official website documentation to learn more: https://www.radix-ui.com/docs/primitives/components/dialog
 *
 * @example
 * <Modal>
 *    <ModalTrigger>Open Modal</ModalTrigger>
 *    <ModalContent>
 *       <ModalContent.Title>My Title</ModalContent.Title>
 *       <ModalContent.Body>The quick brown fox jumps over a lazy dog near the riverbanks.</ModalContent.Body>
 *       <ModalContent.Footer>
 *          <ModalClose>Okay</ModalClose>
 *       </ModalContent.Footer>
 *    </ModalContent>
 * <Modal />
 */

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  setIsOpen,
  withCloseBtn = true,
  isStatic,
  fixedHeight,
  center,
  size = "sm",
  children,
  defaultOpen,
  modal = true,
  animate = true,
  onClose,
}) => {
  /**
   * initialize state to listen to the current open state of Dialog.Root
   * expose this state via context so that it can be consumed by the Dialog.Content
   */

  return (
    <Root
      // assign Dialog.Root props
      open={isOpen}
      defaultOpen={defaultOpen}
      modal={modal}
      onOpenChange={setIsOpen}
    >
      <ModalContext.Provider
        value={{ isOpen, fixedHeight, center, size, setIsOpen, isStatic, onClose, withCloseBtn, animate }}
      >
        {children}
      </ModalContext.Provider>
    </Root>
  );
};

/**
 * Abstraction component for <Dialog.Content />
 */
const modalContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ children, forceMount, onEscapeKeyDown, onPointerDownOutside, ...props }, forwardedRef) => {
    /**
     * listen to the current value of Dialog.Root's open state so it can be used
     * by AnimatePresence for controlling the exit animation of ModalContent
     */
    // const { isOpen, setIsOpen } = useContext(ModalContext);

    const { isOpen, isStatic, size, center, fixedHeight, animate } = useContext(ModalContext);

    const [shake, setShake] = useState<boolean>(false);

    const staticY = {
      initial: {
        opacity: 0,
        y: 20,
        width:
          size === "xs"
            ? "20rem"
            : size === "sm"
            ? "25rem"
            : size === "md"
            ? "30rem"
            : size === "2md"
            ? "42rem"
            : size === "3md"
            ? "50rem"
            : size === "lg"
            ? "70rem"
            : size === "xl"
            ? "90%"
            : "100%",
        height:
          size === "xs"
            ? "22rem"
            : fixedHeight && size === "sm"
            ? "27rem"
            : fixedHeight && size === "md"
            ? "32rem"
            : fixedHeight && size === "2md"
            ? "33rem"
            : fixedHeight && size === "3md"
            ? "34rem"
            : fixedHeight && size === "lg"
            ? "35rem"
            : fixedHeight && size === "xl"
            ? "90%"
            : fixedHeight && size === "full"
            ? "100%"
            : "",
      },
      exit: { opacity: 0, scale: 0.95 },
      animate: {
        opacity: 1,
        y: 0,
        width:
          size === "xs"
            ? "20rem"
            : size === "sm"
            ? "25rem"
            : size === "md"
            ? "30rem"
            : size === "2md"
            ? "42rem"
            : size === "3md"
            ? "50rem"
            : size === "lg"
            ? "70rem"
            : size === "xl"
            ? "90%"
            : "100%",
        height:
          size === "xs"
            ? "22rem"
            : fixedHeight && size === "sm"
            ? "27rem"
            : fixedHeight && size === "md"
            ? "32rem"
            : size === "2md"
            ? "33rem"
            : size === "3md"
            ? "34rem"
            : fixedHeight && size === "lg"
            ? "35rem"
            : fixedHeight && size === "xl"
            ? "90%"
            : fixedHeight && size === "full"
            ? "100%"
            : "",
      },
    };

    const dynamicY = {
      initial: {
        opacity: 0,
        y: 20,
        maxHeight: "90%",
        width:
          size === "xs"
            ? "20rem"
            : size === "sm"
            ? "25rem"
            : size === "md"
            ? "30rem"
            : size === "2md"
            ? "42rem"
            : size === "3md"
            ? "50rem"
            : size === "lg"
            ? "70rem"
            : size === "xl"
            ? "90%"
            : "100%",
      },
      exit: { opacity: 0, scale: 0.95 },
      animate: {
        opacity: 1,
        y: 0,
        maxHeight: "100%",
        width:
          size === "xs"
            ? "20rem"
            : size === "sm"
            ? "25rem"
            : size === "md"
            ? "30rem"
            : size === "2md"
            ? "42rem"
            : size === "3md"
            ? "50rem"
            : size === "lg"
            ? "70rem"
            : size === "xl"
            ? "90%"
            : "100%",
      },
    };

    return (
      <AnimatePresence>
        {isOpen ? (
          <Portal forceMount>
            <div className={styles.container}>
              <Overlay asChild>
                <motion.div
                  tabIndex={-1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={styles.overlay}
                />
              </Overlay>
              <Content
                {...props}
                ref={forwardedRef}
                asChild
                forceMount
                onEscapeKeyDown={(e) => {
                  if (isStatic) {
                    e.preventDefault();
                    setShake(true);
                  } else {
                    onEscapeKeyDown?.(e);
                  }
                }}
                onPointerDownOutside={(e) => {
                  if (isStatic) {
                    e.preventDefault();
                    setShake(true);
                  } else {
                    onPointerDownOutside?.(e);
                  }
                }}
              >
                <div className={styles.content(size, center)}>
                  <motion.div
                    variants={fixedHeight ? staticY : dynamicY}
                    initial={fixedHeight ? staticY.initial : dynamicY.initial}
                    animate={fixedHeight ? staticY.animate : dynamicY.animate}
                    exit={fixedHeight ? staticY.exit : dynamicY.exit}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={styles.motionDiv(size, shake, animate!)}
                    onAnimationEnd={() => setShake(false)}
                  >
                    {children}
                  </motion.div>
                </div>
              </Content>
            </div>
          </Portal>
        ) : null}
      </AnimatePresence>
    );
  }
);

/**
 * Custom Title component for ModalContent
 */
const Title: FunctionComponent<ModalCompositionProps> = ({ children }) => {
  const { withCloseBtn, onClose, setIsOpen } = useContext(ModalContext);

  return (
    <div className={styles.title}>
      <div className="flex items-start justify-between w-full">
        <div>{children}</div>
        {withCloseBtn ? (
          <button
            onClick={(event) => {
              setIsOpen(false);
              onClose?.(event);
            }}
            className="flex items-center justify-center text-gray-600 transition-colors rounded-full h-7 w-7 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
};

/**
 * Custom Body component for ModalContent
 */
const Body: FunctionComponent<ModalCompositionProps> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};

/**
 * Custom Footer component for ModalContent
 */
const Footer: FunctionComponent<ModalCompositionProps> = ({ children }) => {
  return <div className={`${styles.footer}`}>{children}</div>;
};

/**
 * This component is using a compound component pattern in conjunction with forwarding
 * refs and inheriting props from Dialog.Content.
 * Please refer to this stackoverflow question to learn more:
 * https://stackoverflow.com/questions/70202711/
 */
export const ModalContent = {
  ...modalContent,
  Title: Title,
  Body: Body,
  Footer: Footer,
} as ModalContentComposition<FunctionComponent<ModalCompositionProps>>;

modalContent.displayName = "ModalContent";
