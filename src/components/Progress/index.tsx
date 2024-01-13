import React from "react";
import styles from "./index.module.scss";

type Props = {
  percentage: number;
};
export default function Progress({ percentage }: Props) {
  const style: React.CSSProperties = { width: `${percentage}%` };
  return <div className={styles.container} style={style} />;
}
