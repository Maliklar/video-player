import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import debounce from "../../utils/debounce";
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
  volume: 0.3,
  progress: 0,
  changeVolume: (e: number) => {},
  changeProgress: (e: number) => {},
  togglePlay: () => {},
  toggleFullScreen: () => {},
  focusVolume: false,
  focusProgress: false,
  isFullScreen: false,
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
  isFullScreen: boolean;
};

type Props = {
  src: string;
  ambient?: boolean;
  autoFocus?: boolean;
};
export default function VideoPlayer({
  src,
  ambient = false,
  autoFocus = true,
}: Props) {
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
  const changeVolume = useCallback((value: number) => {
    setVolume(value);
    setFocusVolume(true);
    debounce(() => setFocusVolume(false), 3000);
  }, []);
  useLayoutEffect(() => {
    setVideo(videoRef.current);
    setContainer(containerRef.current);
    if (videoRef.current) videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    function handler() {
      setVideoLoaded(true);
    }
    video?.addEventListener("loadedmetadata", handler);
    return () => {
      video?.addEventListener("loadedmetadata", handler);
    };
  }, [video]);

  useEffect(() => {
    if (!videoRef?.current) return;
    function handler() {
      if (!videoRef?.current?.volume) return;
      setVolume(videoRef.current.volume);
    }
    video?.addEventListener("volumechange", handler);

    return () => {
      video?.removeEventListener("volumechange", handler);
    };
  }, [video]);

  const volumeUp = useCallback(() => {
    if (!videoRef.current) return;
    changeVolume(
      videoRef.current.volume + 0.05 <= 1 ? videoRef.current.volume + 0.05 : 1
    );
  }, [changeVolume]);

  const volumeDown = useCallback(() => {
    if (!videoRef.current) return;
    changeVolume(
      videoRef.current.volume - 0.05 >= 0 ? videoRef.current.volume - 0.05 : 0
    );
  }, [changeVolume]);
  const moveForward = useCallback(() => {
    if (!videoRef?.current) return;
    changeProgress(videoRef.current.currentTime + 5);
  }, []);
  const moveBackward = useCallback(() => {
    if (!videoRef?.current) return;
    changeProgress(videoRef.current.currentTime - 5);
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (isFullScreen) document.exitFullscreen();
    else containerRef.current?.requestFullscreen();
    setIsFullScreen((i) => !i);
  }, [isFullScreen]);
  const togglePlay = useCallback(() => {
    debounce(() => {
      setIsPlaying((playing) => {
        !playing ? videoRef.current?.play() : videoRef.current?.pause();
        return !playing;
      });
    }, 320);
  }, []);

  useEffect(() => {
    function handler(e: globalThis.KeyboardEvent) {
      e.preventDefault();
      switch (e.code) {
        case "ArrowUp":
          volumeUp();
          break;
        case "ArrowDown":
          volumeDown();
          break;
        case "ArrowLeft":
          moveBackward();
          break;
        case "ArrowRight":
          moveForward();
          break;
        case "Space":
          togglePlay();
          break;
        case "KeyF":
          toggleFullScreen();
          break;
        case "KeyM":
          changeVolume(0);
          break;
        default:
      }
    }
    container?.addEventListener("keydown", handler);
    return () => {
      container?.removeEventListener("keydown", handler);
    };
  }, [
    container,
    moveBackward,
    moveForward,
    toggleFullScreen,
    volumeDown,
    volumeUp,
    togglePlay,
    changeVolume,
  ]);
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
    if (value < 0) value = 0;
    if (value > videoRef.current?.duration) value = videoRef.current?.duration;

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
    if (value) {
      setFocus(value);
      debounce(() => setFocus(false), 1000);
    } else debounce(() => setFocus(value), 1000);
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
        isFullScreen,
      }}
    >
      <div
        tabIndex={0}
        className={styles.container}
        ref={containerRef}
        data-fullscreen={isFullScreen}
        onMouseOver={() => updateFocus(true)}
        onMouseLeave={() => updateFocus(false)}
        onMouseMove={() => updateFocus(true)}
        data-focus={focus}
      >
        <div className={styles.header} data-focus={focus}>
          <h3>TITLE</h3>
        </div>
        <video
          src={src}
          className={styles.video}
          autoFocus={autoFocus}
          ref={videoRef}
          onDoubleClick={toggleFullScreen}
          onClick={togglePlay}
          preload="true"
          controls={false}
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
