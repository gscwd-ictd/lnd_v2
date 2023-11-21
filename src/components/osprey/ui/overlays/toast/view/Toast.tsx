import { Close, Description, Provider, Root, Title, Viewport } from "@radix-ui/react-toast";
import { FunctionComponent } from "react";
import { styles } from "../utils/style";
import { AnimatePresence, motion } from "framer-motion";
import { ToastProps } from "../utils/props";

export const Toast: FunctionComponent<ToastProps> = ({
  duration,
  open,
  setOpen,
  startIcon,
  color = "success",
  title,
  content,
  children,
}) => {
  return (
    <AnimatePresence>
      {open ? (
        <Provider>
          <Root duration={duration} open={open} onOpenChange={setOpen} className="fixed z-50 top-2 right-2 w-96">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 1, opacity: 1 }}
              exit={{ x: 50, opacity: 0, transition: { duration: 0.25 } }}
              className={`${styles.wrapper({ color })}`}
            >
              {startIcon && <div className="flex items-center pl-3">{startIcon}</div>}
              <div className="flex items-center flex-1 w-0 py-3 pl-5">
                <div className="w-full">
                  {title && <Title className={`${styles.title({ color })}`}>{title}</Title>}
                  <Description className={`${styles.description({ color })}`}>{content}</Description>
                  {children && (
                    <div className="mt-4">
                      <div className="flex space-x-3">{children}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col px-3 pt-1 space-y-1">
                  <Close className={`${styles.close}`}>
                    <svg
                      className={`${styles.closeIcon({ color })}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Close>
                </div>
              </div>
            </motion.div>
          </Root>
          <Viewport />
        </Provider>
      ) : null}
    </AnimatePresence>
  );
};
