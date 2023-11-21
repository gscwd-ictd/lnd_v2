import { ComponentPropsWithoutRef, ElementRef, FunctionComponent, ReactNode, forwardRef, HTMLAttributes } from "react";
import { Button } from "../../button/view/Button";
import { styles } from "../utils/styles";
import { CardHeaderProps, CardProps } from "../utils/props";

export const Card: FunctionComponent<CardProps> = ({ variant = "default", className, children }) => {
  return <div className={styles.card({ variant, className })}>{children}</div>;
};

export const CardHeader: FunctionComponent<CardHeaderProps> = ({ startIcon, title, subtitle, action }) => {
  return (
    <div className="flex items-center px-5 pt-5 mb-3">
      {startIcon ? <div className="mr-2">{startIcon}</div> : null}
      <div>
        <h3 className="text-gray-700 text-lg font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
      {action ? <div className="ml-auto">{action}</div> : null}
    </div>
  );
};

export const CardContent: FunctionComponent<CardProps & HTMLAttributes<HTMLDivElement>> = ({ className, children }) => {
  return <div className={styles.cardcontent({ className })}>{children}</div>;
};

export const CardActions: FunctionComponent<CardProps & HTMLAttributes<HTMLDivElement>> = ({ className, children }) => {
  return <div className={styles.cardactions({ className })}>{children}</div>;
};
