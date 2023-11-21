import cls from "classnames";

export const styles = {
  panel: (size: "sm" | "md" | "lg" | "xl" | "2xl" | undefined) => {
    return cls({
      "pointer-events-auto relative w-screen": true,
      "max-w-sm": size === "sm",
      "max-w-md": size === "md",
      "max-w-lg": size === "lg",
      "max-w-xl": size === "xl",
      "max-w-2xl": size === "2xl",
    });
  },
  header: (withCloseBtn: boolean | undefined) => {
    return cls({
      "flex items-start justify-between": withCloseBtn,
    });
  },
  footer: (alignEnd: boolean | undefined) => {
    return cls({
      "flex items-center gap-2": true,
      "justify-end": alignEnd,
    });
  },
};
