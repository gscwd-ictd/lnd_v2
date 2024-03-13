import { FunctionComponent, HTMLAttributes } from "react";
import { styles } from "../utils/styles";
import { CardHeaderProps, CardProps } from "../utils/props";

export const CardMiniStats: FunctionComponent<CardProps> = ({
  variant = "default",
  className,
  icon,
  title,
  content,
  subtitle,
}) => {
  return (
    <div className={styles.card({ variant, className })}>
      <div className="flex w-full gap-2 p-5 sm:h-[6rem] lg:h-[8rem]">
        <section
          className={`${
            icon
              ? "flex flex-col h-full justify-between w-[75%]  sm:break-words "
              : "flex flex-col h-full justify-between w-full  "
          }`}
        >
          <div className="flex flex-col text-left">
            <div className="  sm:text-sm  lg:text-md font-sans  text-gray-500 ">{title}</div>
            <div className=" sm:text-sm lg:text-md">{subtitle}</div>
          </div>
          <div className={`text-3xl font-medium text-slate-700`}>{content}</div>
        </section>

        {icon ? <section className="w-[25%] items-center justify-center flex shrink-0 pr-2 ">{icon}</section> : null}
      </div>
    </div>
  );
};

export const CardMiniStatsHeader: FunctionComponent<CardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex items-center px-5 pt-5 mb-3">
      <div>
        <h3 className="text-gray-700 text-lg font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export const CardMiniStatsContent: FunctionComponent<CardProps & HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => {
  return <div className={styles.cardcontent({ className })}>{children}</div>;
};
