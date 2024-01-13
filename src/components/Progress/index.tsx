import React from "react";
import styles from "./index.module.scss";

type Props = {
  percentage: number;
  onProgressChange: 
};
export default function Progress({ percentage }: Props) {
  const style: React.CSSProperties = { width: `${percentage}%` };
  return (
    <div className={styles.progressContainer}>
      <div className={styles.background} />
      <div className={styles.container} style={style}>
        <div
          className={styles.progressIndicator}
          onDrag={(e) => {
            console.log("Draggaing", e.clientX);
          }}
        />
      </div>
    </div>
  );
}
