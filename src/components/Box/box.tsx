import styles from "./box.module.scss";

import { HTMLProps } from "react";

interface BoxProps extends HTMLProps<HTMLDivElement> {}

export function Box({ children, ...props }: BoxProps) {
  return (
    <div className={styles.box} {...props}>
      {children}
    </div>
  );
}
