import { HTMLAttributes } from "react";

export enum VideoStatusEnum {
  Playing,
  Paused,
}
export type VideoContextType = {
  container?: HTMLDivElement;
  video?: HTMLVideoElement;
  status: VideoStatusEnum;
  volume: number;
  progress: number;
  changeVolume: (e: number) => void;
  changeProgress: (e: number) => void;
  togglePlay: () => void;
  toggleFullScreen: () => void;
  toggleMute: () => void;
  focusVolume: boolean;
  focusProgress: boolean;
  isFullScreen: boolean;
  mute: boolean;
};

type VideoElement = HTMLAttributes<HTMLVideoElement>;
export type VideoPlayerProps = VideoElement & {
  src: string;
  ambient?: boolean;
  autoFocus?: boolean;
};
