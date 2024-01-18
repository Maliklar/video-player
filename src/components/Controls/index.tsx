import { ChangeEvent, useState } from "react";
import formatTime from "../../utils/formatTime";
import styles from "./index.module.scss";
import useVideo from "../hooks/useVideo";
import VolumeMin from "../../assets/volume-min.svg";
import VolumeMax from "../../assets/volume-max.svg";
import VolumeMute from "../../assets/volume-mute.svg";
type Props = {
  onPlayChange: VoidFunction;
  isPlaying: boolean;
  toggleFullScreen: VoidFunction;
  video: HTMLVideoElement | null;
};
export default function Controls({
  onPlayChange,
  toggleFullScreen,
  isPlaying,
  video,
}: Props) {
  const { volume, focusVolume, progress, changeVolume } = useVideo();
  function volumeChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    changeVolume(Number(e.target.value));
  }

  return (
    <div className={styles.container}>
      <button
        title="Play"
        onClick={onPlayChange}
        className={styles.playButton}
        type="button"
      >
        <PlayIcon isPlaying={isPlaying} />
      </button>
      <div className={styles.middle}>
        <div data-focus={focusVolume} className={styles.volumeController}>
          <button
            type="button"
            className={styles.muteButton}
            title="Mute/Unmute button"
          >
            <img
              src={
                volume >= 0.5
                  ? VolumeMax
                  : volume === 0
                  ? VolumeMute
                  : VolumeMin
              }
              alt="Volume Up"
            />
          </button>
          <input
            className={styles.volumeSlider}
            title="Volume"
            type="range"
            min="0"
            step="0.01"
            max="1"
            onChange={volumeChangeHandler}
            value={volume}
          />
        </div>
        <div className={styles.timerContainer}>{formatTime(progress)}</div>
      </div>
      <button
        className={styles.fullScreenButton}
        type="button"
        title="Full screen"
        onClick={toggleFullScreen}
      >
        <FullScreenIcon />
      </button>
    </div>
  );
}

type PlayProps = {
  isPlaying: boolean;
};
function PlayIcon({ isPlaying = false }: PlayProps) {
  return <div className={styles.PlayIcon} data-playing={isPlaying} />;
}

function FullScreenIcon() {
  return <div className={styles.fullScreenIcon}></div>;
}

// function PauseIcon() {
//   return <div className={styles.pauseIcon}></div>;
// }
