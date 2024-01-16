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
});

type VideoContextType = {
  container?: HTMLDivElement;
  video?: HTMLVideoElement;
  status: VideoStatusEnum;
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
  const [container, setContainer] = useState(containerRef.current);

  useLayoutEffect(() => {
    setVideo(videoRef.current);
    setContainer(containerRef.current);
  }, []);
  useEffect(() => {
    containerRef.current?.addEventListener("keydown", (e) => {
      console.log(e.key);
    });
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
            video={videoRef.current}
            toggleFullScreen={toggleFullScreen}
          />
        </div>
      </div>
      <Ambient enabled={ambient} />
    </Context.Provider>
  );
}
