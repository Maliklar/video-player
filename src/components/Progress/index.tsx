import React from "react";
import styles from "./index.module.scss";

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type Props = {
  percentage: number;
  onProgressChange: VoidFunction;
};
export default function Progress({ percentage, onProgressChange }: Props) {
  const style: React.CSSProperties = { width: `${percentage}%` };

  function progressClickHandler({
    currentTarget,
    clientX,
    clientY,
  }: ClickEvent) {
    const { left } = currentTarget.getBoundingClientRect();
    console.log(left, clientX);
  }
  return (
    <div
      className={styles.progressContainer}
      onDrag={(e) => {
        console.log("Dragging", e);
      }}
      onClick={progressClickHandler}
    >
      <div className={styles.background} />
      <div className={styles.container} style={style}>
        <div className={styles.progressIndicator} />
      </div>
    </div>
  );
}
