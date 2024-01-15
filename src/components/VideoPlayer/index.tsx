import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import Controls from "../Controls";
import Progress from "../Progress";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [percentage, setPercentage] = useState(0);

  function toggleFullScreen() {
    if (isFullScreen) document.exitFullscreen();
    else containerRef.current?.requestFullscreen();
    setIsFullScreen((i) => !i);
  }
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
  function progressChangeHandler(progress: number) {
    setPercentage(progress);
    const currentTime = videoRef.current?.currentTime;
    const duration = videoRef.current?.duration;
    if (duration && currentTime)
      videoRef.current.currentTime = duration * (progress / 100);
  }
  return (
    <div
      className={styles.container}
      ref={containerRef}
      data-fullscreen={isFullScreen}
    >
      <video
        src="./test.mp4"
        className={styles.video}
        ref={videoRef}
        controls={false}
        data-fullscreen="true"
        controlsList="nodownload nofullscreen noremoteplayback"
      />
      <div className={styles.footer}>
        <Progress
          percentage={percentage}
          onProgressChange={progressChangeHandler}
        />
        <Controls
          onPlayChange={togglePlaying}
          isPlaying={isPlaying}
          toggleFullScreen={toggleFullScreen}
        />
      </div>
    </div>
  );
}
