import React from "react";
import styles from "./IconWrapper.module.scss";

const IconWrapper = ({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
}) => (
  <div className={styles["icon-wrapper"]} style={{ width, height }}>
    {children}
  </div>
);

export default IconWrapper;
