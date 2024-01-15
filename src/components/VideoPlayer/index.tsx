import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import Controls from "../Controls";
import Progress from "../Progress";

const canvas = document.createElement("canvas");
const ambient = document.createElement("div");

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    console.log("KKK");
    containerRef.current?.addEventListener("keydown", (e) => {
      console.log(e.key);
    });
  }, []);

  useEffect(() => {
    if (!ambientRef.current || !containerRef.current || !videoRef.current)
      return;
    const { left, right, bottom, top } =
      containerRef.current.getBoundingClientRect();
    const width = right - left;
    const height = bottom - top;
    ambientRef.current.style.left = left - 100 + "px";
    ambientRef.current.style.top = top - 100 + "px";
    ambientRef.current.style.height = height + 200 + "px";
    ambientRef.current.style.width = width + 200 + "px";

    const interval = setInterval(() => {
      if (!videoRef.current || !canvas || !imageRef.current) return;
      canvas.width = videoRef.current.videoWidth / 10;
      canvas.height = videoRef.current.videoHeight / 10;

      canvas
        .getContext("2d")
        ?.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth / 10,
          videoRef.current.videoHeight / 10
        );

      imageRef.current.src = canvas.toDataURL();
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
    <>
      <div
        tabIndex={0}
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
      <div ref={ambientRef} className={styles.ambientBg}>
        <img ref={imageRef} className={styles.ambientImage} alt="" />
      </div>
    </>
  );
}
