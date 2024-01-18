import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Ambient from "../Ambient";
import Controls from "../Controls";
import Progress from "../Progress";
import styles from "./index.module.scss";
import debounce from "../../utils/debounce";
enum VideoStatusEnum {
  Playing,
  Paused,
}
export const Context = React.createContext<VideoContextType>({
  status: VideoStatusEnum.Paused,
  volume: 0.3,
  progress: 0,
  changeVolume: (e: number) => {},
  changeProgress: (e: number) => {},
  togglePlay: () => {},
  toggleFullScreen: () => {},
  focusVolume: false,
  focusProgress: false,
});

type VideoContextType = {
  container?: HTMLDivElement;
  video?: HTMLVideoElement;
  status: VideoStatusEnum;
  volume: number;
  progress: number;
  changeVolume: (e: number) => void;
  changeProgress: (e: number) => void;
  togglePlay: () => void;
  toggleFullScreen: () => void;
  focusVolume: boolean;
  focusProgress: boolean;
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
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(videoRef.current);
  const [volume, setVolume] = useState(0.3);
  const [container, setContainer] = useState(containerRef.current);
  const [focusVolume, setFocusVolume] = useState(false);
  const [focusProgress, setFocusProgress] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [focus, setFocus] = useState(false);

  useLayoutEffect(() => {
    setVideo(videoRef.current);
    setContainer(containerRef.current);
    if (videoRef.current) videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    function handler() {
      setVideoLoaded(true);
    }
    videoRef?.current?.addEventListener("loadedmetadata", handler);
    return () => {
      videoRef?.current?.addEventListener("loadedmetadata", handler);
    };
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
      if (!videoRef?.current?.volume) return;
      setVolume(videoRef.current.volume);
    }
    videoRef?.current.addEventListener("volumechange", handler);

    return () => {
      if (!videoRef?.current) return;
      videoRef.current.removeEventListener("volumechange", handler);
    };
  }, []);

  function volumeUp() {
    if (!videoRef.current) return;
    changeVolume(
      videoRef.current.volume + 0.05 <= 1 ? videoRef.current.volume + 0.05 : 1
    );
  }
  function volumeDown() {
    if (!videoRef.current) return;
    changeVolume(
      videoRef.current.volume - 0.05 >= 0 ? videoRef.current.volume - 0.05 : 0
    );
  }
  function moveForward() {
    if (!videoRef?.current) return;
    changeProgress(videoRef.current.currentTime + 5);
  }
  function moveBackward() {
    if (!videoRef?.current) return;
    changeProgress(videoRef.current.currentTime - 5);
  }
  function pauseVideo() {}
  function changeVolume(value: number) {
    setVolume(value);
    setFocusVolume(true);
    debounce(() => setFocusVolume(false), 3000);
  }
  function togglePlay() {}

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

  function changeProgress(value: number) {
    if (!videoRef.current?.duration) return;
    if (value < 0 || value > videoRef.current?.duration) return;
    setProgress(value);
    setFocusProgress(true);
    debounce(() => setFocusProgress(false), 3000);
    const duration = videoRef.current?.duration;
    if (duration) videoRef.current.currentTime = value;
  }

  useEffect(() => {
    const timeout = setInterval(() => {
      if (videoRef.current) setProgress(videoRef.current?.currentTime);
    }, 1000);
    return () => {
      clearInterval(timeout);
    };
  }, []);

  function updateFocus(value: boolean) {
    if (value) setFocus(true);
    else debounce(() => setFocus(value), 1000);
  }

  return (
    <Context.Provider
      value={{
        container: container || undefined,
        video: video || undefined,
        status: VideoStatusEnum.Playing,
        progress,
        volume,
        changeVolume,
        changeProgress,
        togglePlay,
        toggleFullScreen,
        focusVolume,
        focusProgress,
      }}
    >
      <div
        tabIndex={0}
        className={styles.container}
        ref={containerRef}
        data-fullscreen={isFullScreen}
        onMouseOver={() => updateFocus(true)}
        onMouseLeave={() => updateFocus(false)}
      >
        <div className={styles.header} data-focus={focus}>
          <h3>TITLE</h3>
        </div>
        <video
          src={src}
          className={styles.video}
          ref={videoRef}
          preload="true"
          onDoubleClick={toggleFullScreen}
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
        />
        <div className={styles.footer} data-focus={focus}>
          {videoLoaded ? <Progress /> : null}
          {videoLoaded ? (
            <Controls
              onPlayChange={togglePlaying}
              isPlaying={isPlaying}
              video={videoRef.current}
              toggleFullScreen={toggleFullScreen}
            />
          ) : null}
        </div>
      </div>
      <Ambient enabled={ambient} />
    </Context.Provider>
  );
}
