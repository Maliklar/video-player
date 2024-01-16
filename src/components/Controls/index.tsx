import { ChangeEvent, useState } from "react";
import formatTime from "../../utils/formatTime";
import styles from "./index.module.scss";
import useVideo from "../hooks/useVideo";

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
  const { volume, changeVolume } = useVideo();
  function volumeChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    changeVolume(Number(e.target.value) / 100);
  }
  console.log("LLLL", volume);
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
        <input
          title="kkk"
          type="range"
          min="1"
          max="100"
          onChange={volumeChangeHandler}
          value={volume}
        />
        <div className={styles.timerContainer}>
          {video?.currentTime && formatTime(video?.currentTime)}
        </div>
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
