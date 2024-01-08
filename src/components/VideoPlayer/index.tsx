import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const interval = useRef<NodeJS.Timeout>();
  const [currentTime, setCurrentTime] = useState(0);
  const [percentage, setPercentage] = useState(0);
  function togglePlaying() {
    setPlaying((playing) => {
      !playing ? videoRef.current?.play() : videoRef.current?.pause();
      return !playing;
    });
  }

  console.log(videoRef.current?.duration);
  useEffect(() => {
    if (!videoRef.current) return;
    if (
      typeof videoRef.current?.currentTime === "undefined" ||
      typeof videoRef.current?.duration === "undefined"
    )
      return;
    if (!playing) return clearInterval(interval.current);
    interval.current = setInterval(() => {
      if (
        typeof videoRef.current?.currentTime === "undefined" ||
        typeof videoRef.current?.duration === "undefined"
      )
        return;
      setCurrentTime(videoRef.current.currentTime);
      setPercentage(
        (videoRef.current.currentTime / videoRef.current?.duration) * 100
      );
      console.log(videoRef.current.currentTime);
    }, 100);

    return () => {
      clearInterval(interval.current);
    };
  }, [playing]);
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
            <PlayIcon playing={playing} />
          </button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  playing: boolean;
};
function PlayIcon({ playing = false }: Props) {
  return <div className={styles.PlayIcon} data-playing={playing}></div>;
}
