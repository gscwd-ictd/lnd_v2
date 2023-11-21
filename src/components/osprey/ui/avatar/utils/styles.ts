import cls from "classnames";

export const styles = {
  avatar: (
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl",
    roundedness?: "sm" | "md" | "lg" | "xl" | "full"
  ) =>
    cls("inline-block border-2 border-white", {
      "h-8 w-8 ": size === "sm",
      "h-[2.375rem] w-[2.375rem]": size === "md",
      "h-[2.875rem] w-[2.875rem]": size === "lg",
      "h-[3.875rem] w-[3.875rem]": size === "xl",
      "h-[4rem] w-[4rem]": size === "2xl",
      "h-[5.375rem] w-[5.375rem]": size === "3xl",
      "h-[6.575rem] w-[6.575rem]": size === "4xl",
      "h-[6.875rem] w-[6.875rem]": size === "5xl",
      "h-[7rem] w-[7rem]": size === "6xl",
      "rounded-sm": roundedness === "sm",
      "rounded-md": roundedness === "md",
      "rounded-lg": roundedness === "lg",
      "rounded-xl": roundedness === "xl",
      "rounded-full": roundedness === "full",
    }),
};
