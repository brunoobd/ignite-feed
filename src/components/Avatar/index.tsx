import { ImgHTMLAttributes } from "react";
import styles from "./styles.module.css";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  hasBorder?: boolean;
};

export const Avatar = ({ hasBorder = true, ...props }: Props) => (
  <img
    className={hasBorder ? styles.avatarWithBorder : styles.avatar}
    {...props}
  />
);
