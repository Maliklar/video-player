import useVideo from "../../../hooks/useVideo";
import formatTime from "../../../utils/formatTime";
import styles from "./index.module.scss";
function TimerDisplay() {
  const { progress, video } = useVideo();
  return (
    <div className={styles.container}>
      <p>
        {formatTime(progress)} /{" "}
        {video?.duration ? formatTime(video?.duration) : null}
      </p>
    </div>
  );
}

export default TimerDisplay;
