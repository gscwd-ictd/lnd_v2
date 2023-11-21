import { HTMLAttributes, forwardRef } from "react";
import { styles } from "../utils/styles";
import { Topbar } from "../../navigations/top/topbar/view/Topbar";

export const PageContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...restProps }, forwardedRef) => {
    return (
      <main {...restProps} ref={forwardedRef} className={styles.pageContent(className)}>
        <div className="relative flex flex-col w-full h-full bg-red-600">
          <Topbar />
          <section className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">{children}</section>
        </div>
      </main>
    );
  }
);

PageContent.displayName = "PageContent";
