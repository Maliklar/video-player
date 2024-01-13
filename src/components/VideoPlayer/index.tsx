import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const interval = useRef<NodeJS.Timeout>();
  const [percentage, setPercentage] = useState(0);
  function togglePlaying() {
    setIsPlaying((playing) => {
      !playing ? videoRef.current?.play() : videoRef.current?.pause();
      return !playing;
    });
  }

  // Percentage Change Handler
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const currentTime = videoRef.current?.currentTime;
      const duration = videoRef.current?.duration;
      if (!currentTime || !duration || !isPlaying) return;
      setPercentage((currentTime / duration) * 100);
    });

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);
  // Playing Change Handler
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    function onPlayHandler() {
      setIsPlaying(true);
    }
    function onPauseHandler() {
      setIsPlaying(false);
    }
    video.addEventListener("play", onPlayHandler);
    video.addEventListener("pause", onPauseHandler);
    return () => {
      video.removeEventListener("play", onPlayHandler);
      video.removeEventListener("pause", onPauseHandler);
    };
  }, []);

  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <video src="./test.mp4" className={styles.video} ref={videoRef} />
      <div className={styles.footer}>
        <div className={styles.progressContainer}>
          <div
            className={styles.progress}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
        <div className={styles.controls}>
          <button title="Play" onClick={togglePlaying} type="button">
            <PlayIcon isPlaying={isPlaying} />
          </button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  isPlaying: boolean;
};
function PlayIcon({ isPlaying = false }: Props) {
  return <div className={styles.PlayIcon} data-playing={isPlaying}></div>;
}
