import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Ambient from "../Ambient";
import Controls from "../Controls";
import Progress from "../Progress";
import styles from "./index.module.scss";
enum VideoStatusEnum {
  Playing,
  Paused,
}
export const Context = React.createContext<VideoContextType>({
  status: VideoStatusEnum.Paused,
  volume: 30,
  changeVolume: (e: number) => {},
});

type VideoContextType = {
  container?: HTMLDivElement;
  video?: HTMLVideoElement;
  status: VideoStatusEnum;
  volume: number;
  changeVolume: (e: number) => void;
};

type Props = {
  src: string;
  ambient?: boolean;
};
export default function VideoPlayer({ src, ambient = false }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [video, setVideo] = useState(videoRef.current);
  const [volume, setVolume] = useState(30);
  const [container, setContainer] = useState(containerRef.current);

  useLayoutEffect(() => {
    setVideo(videoRef.current);
    setContainer(containerRef.current);
  }, []);

  useEffect(() => {
    containerRef.current?.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code === "ArrowUp") volumeUp();
      if (e.code === "ArrowDown") volumeDown();
      if (e.code === "ArrowLeft") moveBackward();
      if (e.code === "ArrowRight") moveForward();
      if (e.code === "Space") pauseVideo();
      if (e.code === "KeyF") toggleFullScreen();
    });
  }, []);

  useEffect(() => {
    if (!videoRef?.current) return;
    function handler() {
      console.log(Number(videoRef.current?.volume) * 100);
      setVolume(Number(videoRef.current?.volume) * 100);
    }
    videoRef?.current?.addEventListener("volumechange", handler);

    return () => {
      videoRef?.current?.removeEventListener("volumechange", handler);
    };
  }, []);

  function volumeUp() {
    if (!videoRef.current) return;
    videoRef.current.volume =
      videoRef.current.volume + 0.05 <= 1 ? videoRef.current.volume + 0.05 : 1;
  }
  function volumeDown() {
    if (!videoRef.current) return;
    videoRef.current.volume =
      videoRef.current.volume - 0.05 >= 0 ? videoRef.current.volume - 0.05 : 0;
  }
  function moveForward() {
    if (!videoRef?.current) return;
    videoRef.current.currentTime = videoRef.current.currentTime + 5;
  }
  function moveBackward() {
    if (!videoRef?.current) return;
    videoRef.current.currentTime = videoRef.current.currentTime - 5;
  }
  function pauseVideo() {}
  function changeVolume(value: number) {
    setVolume(value * 100);
  }

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

  function progressChangeHandler(progress: number) {
    setPercentage(progress);
    const currentTime = videoRef.current?.currentTime;
    const duration = videoRef.current?.duration;
    if (duration && currentTime)
      videoRef.current.currentTime = duration * (progress / 100);
  }
  return (
    <Context.Provider
      value={{
        container: container || undefined,
        video: video || undefined,
        status: VideoStatusEnum.Playing,
        volume,
        changeVolume,
      }}
    >
      <div
        tabIndex={0}
        className={styles.container}
        ref={containerRef}
        data-fullscreen={isFullScreen}
      >
        <video
          src={src}
          className={styles.video}
          ref={videoRef}
          controls={false}
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
            video={videoRef.current}
            toggleFullScreen={toggleFullScreen}
          />
        </div>
      </div>
      <Ambient enabled={ambient} />
    </Context.Provider>
  );
}
