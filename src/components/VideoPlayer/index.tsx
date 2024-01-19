import React, {
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import useDebounce from "../../hooks/useDebounce";
import {
  VideoContextType,
  VideoPlayerProps,
  VideoStatusEnum,
} from "../../types";
import { clamp } from "../../utils/clamp";
import Ambient from "../Ambient";
import Controls from "../Controls";
import Progress from "../Progress";
import styles from "./index.module.scss";

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
  isFullScreen: false,
  mute: false,
  toggleMute: () => {},
});

export default function VideoPlayer({
  src,
  ambient = false,
  autoFocus = true,
  ...props
}: VideoPlayerProps) {
  const debounce = useDebounce();
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
  const [mute, setMute] = useState(false);
  const [focus, setFocus] = useState(false);

  // Focus: Handle showing the video controls
  const updateFocus = useCallback(
    (value: boolean) => {
      if (value) {
        setFocus(value);
        debounce(() => setFocus(false), 3000);
      } else debounce(() => setFocus(value), 3000);
    },
    [debounce]
  );

  // Update the progress of the video (currentTime)
  const changeProgress = useCallback((value: number) => {
    const duration = videoRef.current?.duration;
    if (!duration) return;
    videoRef.current.currentTime = clamp(value, duration);
    setProgress(clamp(value, duration));
  }, []);

  // Mute toggler
  const toggleMute = useCallback(() => {
    setMute((mute) => {
      if (videoRef?.current) videoRef.current.muted = !mute;
      return !mute;
    });
    updateFocus(true);
  }, [updateFocus]);

  const changeVolume = useCallback((value: number) => {
    if (videoRef.current) videoRef.current.volume = clamp(value, 1);
    if (videoRef.current?.muted) {
      videoRef.current.muted = false;
      setMute(false);
    }
    setVolume(clamp(value, 1));
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (isFullScreen) document.exitFullscreen();
    else containerRef.current?.requestFullscreen();
    setIsFullScreen((i) => !i);
  }, [isFullScreen]);
  const togglePlay = useCallback(() => {
    updateFocus(true);
    setIsPlaying((playing) => {
      !playing ? videoRef.current?.play() : videoRef.current?.pause();
      return !playing;
    });
  }, [updateFocus]);

  function timeUpdateHandler(e: SyntheticEvent<HTMLVideoElement, Event>) {
    setProgress(e.currentTarget.currentTime);
    updateFocus(true);
    setFocusProgress(true);
    debounce(() => setFocusProgress(false), 2000);
  }

  function volumeChangeHandler(e: SyntheticEvent<HTMLVideoElement, Event>) {
    setVolume(e.currentTarget.volume);
    updateFocus(true);
    setFocusVolume(true);
    debounce(() => setFocusVolume(false), 2000);
  }

  function metaDataLoadedHandler(e: SyntheticEvent<HTMLVideoElement, Event>) {
    const video = e.currentTarget;
    setVideoLoaded(true);
    setVideo(video);
    setContainer(containerRef.current);
    video.volume = volume;
    if (autoFocus) containerRef?.current?.focus();
  }

  function keyDownHandler(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const video = videoRef?.current;
    if (!video) return;
    switch (e.code) {
      case "ArrowUp":
        changeVolume(volume + 0.05);
        break;
      case "ArrowDown":
        changeVolume(volume - 0.05);
        break;
      case "ArrowLeft":
        changeProgress(progress - 5);
        break;
      case "ArrowRight":
        changeProgress(progress + 5);
        break;
      case "Space":
        togglePlay();
        break;
      case "KeyF":
        toggleFullScreen();
        break;
      case "KeyM":
        toggleMute();
        break;
      default:
    }
  }

  function playHandler() {
    setIsPlaying(true);
  }
  function pauseHandler() {
    setIsPlaying(false);
  }

  function canPlayHandler() {}
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
        isFullScreen,
        mute,
        toggleMute,
      }}
    >
      <div
        id="video"
        tabIndex={0}
        autoFocus={autoFocus}
        className={styles.container}
        ref={containerRef}
        data-fullscreen={isFullScreen}
        onMouseOver={() => updateFocus(true)}
        onMouseLeave={() => updateFocus(false)}
        onMouseMove={() => updateFocus(true)}
        onKeyDown={keyDownHandler}
        data-focus={focus}
      >
        <div className={styles.header} data-focus={focus}>
          <h3>TITLE</h3>
        </div>
        <video
          src={src}
          className={styles.video}
          ref={videoRef}
          onDoubleClick={toggleFullScreen}
          onClick={togglePlay}
          preload="true"
          controls={false}
          onTimeUpdate={timeUpdateHandler}
          onVolumeChange={volumeChangeHandler}
          onLoadedMetadata={metaDataLoadedHandler}
          onPlay={playHandler}
          onPause={pauseHandler}
          onCanPlay={canPlayHandler}
          controlsList="nodownload nofullscreen noremoteplayback"
        />
        <div className={styles.footer} data-focus={focus}>
          {videoLoaded ? <Progress /> : null}
          {videoLoaded ? (
            <Controls
              onPlayChange={togglePlay}
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
