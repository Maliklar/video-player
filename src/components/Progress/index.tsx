import { ChangeEvent } from "react";
import styles from "./index.module.scss";

type Props = {
  percentage: number;
  onProgressChange: (percent: number) => void;
};
export default function Progress({ percentage, onProgressChange }: Props) {
  function progressChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    onProgressChange(Number(e.target.value) / 10);
  }

  return (
    <div className={styles.progressContainer}>
      <input
        title="d"
        className={styles.container}
        type="range"
        onChange={progressChangeHandler}
        value={percentage * 100}
        min={0}
        max={10000}
      />
    </div>
  );
}
