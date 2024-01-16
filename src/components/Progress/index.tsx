import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type Props = {
  percentage: number;
  onProgressChange: (percent: number) => void;
};
export default function Progress({ percentage, onProgressChange }: Props) {
  const style: React.CSSProperties = { width: `${percentage}%` };
  const dragging = useRef(false);
  const progressWidth = useRef(0);
  const cursorPosition = useRef(0);
  const progressRect = useRef<DOMRect>();
  const clientPosition = useRef<{
    clientX: number;
    clientY: number;
  }>();

  function progressClickHandler({ currentTarget, clientX }: ClickEvent) {
    progressRect.current = currentTarget.getBoundingClientRect();
    const { left, right } = currentTarget.getBoundingClientRect();
    progressWidth.current = right - left;
    cursorPosition.current = clientX - left;
    const percent = (cursorPosition.current / progressWidth.current) * 100;
    onProgressChange(percent);
    dragging.current = true;
  }

  useEffect(() => {
    function mouseMoveHandler({ clientX, clientY }: MouseEvent) {
      if (!dragging.current || !progressRect.current?.left) return;
      clientPosition.current = { clientX, clientY };
      cursorPosition.current = clientX - progressRect.current.left;
      const percent = (cursorPosition.current / progressWidth.current) * 100;
      onProgressChange(percent);
    }
    function mouseUpHandler() {
      dragging.current = false;
    }
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onProgressChange]);

  return (
    <div
      className={styles.progressContainer}
      onMouseDown={progressClickHandler}
    >
      <div className={styles.background} />
      <div className={styles.container} style={style}>
        <div className={styles.progressIndicator} />
      </div>
    </div>
  );
}
