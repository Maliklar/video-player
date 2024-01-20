import FullScreenMin from "../../assets/fullscreen-min.svg";
import FullScreen from "../../assets/fullscreen.svg";
import Pause from "../../assets/pause.svg";
import Play from "../../assets/play.svg";
import useVideo from "../../hooks/useVideo";
import formatTime from "../../utils/formatTime";
import VolumeController from "./VolumeController";
import styles from "./index.module.scss";

export default function Controls() {
  const {
    isFullScreen,
    progress,
    isPlaying,
    togglePlay,
    toggleFullScreen,
    video,
  } = useVideo();

  return (
    <div className={styles.container}>
      <button
        title="Play"
        onClick={togglePlay}
        className={styles.playButton}
        type="button"
      >
        <img
          className={styles.iconImage}
          src={isPlaying ? Pause : Play}
          alt="Toggle Play"
        />
      </button>
      <div className={styles.middle}>
        <VolumeController />
        <div className={styles.timerContainer}>{formatTime(progress)}</div>/
        {video?.duration ? (
          <div className={styles.timerContainer}>
            {formatTime(video?.duration)}
          </div>
        ) : null}
      </div>
      <button
        className={styles.fullScreenButton}
        type="button"
        title="Full screen"
        onClick={toggleFullScreen}
      >
        <img
          className={styles.iconImage}
          src={isFullScreen ? FullScreenMin : FullScreen}
          alt="Toggle Fullscreen"
        />
      </button>
    </div>
  );
}
