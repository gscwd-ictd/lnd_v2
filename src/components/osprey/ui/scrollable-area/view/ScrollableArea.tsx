import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Root, Viewport, Corner, ScrollAreaScrollbar, ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import { styles } from "../utils/styles";

/**
 * - "Augments native scroll functionality for custom, cross-browser styling" - from radix-ui official docs
 * - This component is using radix-ui's ScrollArea primitive for out-of-the-box accessibility.
 * - Please visit their official website documentation to learn more: https://www.radix-ui.com/docs/primitives/components/scroll-area
 *
 * @example
 * <ScrollableArea>
 *    A scroll thumb will show the moment this content overflows.
 *    Note that for an area to be scrollable, the ScrollableArea's parents
 *    must have a definite width and height, since the ScrollableArea will take the full width and
 *    height of its parents.
 * </ScrollableArea>
 */
export const ScrollableArea = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, children, type = "scroll", scrollHideDelay = 600, dir, ...props }, forwardedRef) => {
    return (
      <Root
        {...props}
        ref={forwardedRef}
        type={type}
        dir={dir}
        scrollHideDelay={scrollHideDelay}
        className={`${styles.root} ${className}`}
      >
        <Viewport className={styles.viewport}>{children}</Viewport>
        <Scrollbar />
        <Corner />
      </Root>
    );
  }
);

const Scrollbar = forwardRef<
  ElementRef<typeof ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ orientation = "vertical", ...props }, forwardedRef) => {
  return (
    <ScrollAreaScrollbar {...props} ref={forwardedRef} className={styles.scrollbar(orientation)}>
      <ScrollAreaThumb className={styles.thumb} />
    </ScrollAreaScrollbar>
  );
});

ScrollableArea.displayName = "ScrollableArea";
Scrollbar.displayName = "Scrollbar";
