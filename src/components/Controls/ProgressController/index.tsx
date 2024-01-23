import { ChangeEvent } from "react";
import styles from "./index.module.scss";
import useVideo from "../../../hooks/useVideo";
import { PlayerComponentEnum } from "../../../types";

function ProgressController() {
  const { progress, video, focusProgress, changeProgress } = useVideo();
  function progressChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    changeProgress(Number(e.target.value));
  }
  if (!video) return null;
  return (
    <div className={styles.progressContainer} data-focus={focusProgress}>
      <input
        title="Progress Bar"
        className={styles.progress}
        type="range"
        onChange={progressChangeHandler}
        value={progress}
        min={0}
        step="1"
        max={video.duration}
      />
    </div>
  );
}
ProgressController.PlayerComponent = PlayerComponentEnum.ProgressController;
export default ProgressController;
