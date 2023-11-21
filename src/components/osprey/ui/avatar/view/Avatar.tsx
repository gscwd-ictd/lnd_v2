import Image from "next/image";
import { FunctionComponent } from "react";
import { AvatarProps } from "../utils/props";
import { styles } from "../utils/styles";

export const Avatar: FunctionComponent<AvatarProps> = ({
  source,
  alt = "avatar",
  size = "md",
  roundedness = "full",
  width = 1000,
  height = 1000,
}) => {
  return <Image src={source} alt={alt} height={height} width={width} className={styles.avatar(size, roundedness)} />;
};
