import { FunctionComponent } from "react";
import { SpinnerProps } from "../utils/props";
import { styles } from "../utils/styles";

export const Spinner: FunctionComponent<SpinnerProps> = ({
  borderSize = 4,
  color = "blue",
  size = "small",
  className,
}) => {
  return <div className={styles.spinner(className, size, color, borderSize)} />;
};
