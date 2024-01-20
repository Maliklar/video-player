import { HTMLAttributes, ReactElement } from "react";
import VideoPlayer from "../components/VideoPlayer";

export enum PlayerComponentEnum {
  Controls,
  Header,
  Footer,
  Progress,
  VolumeController,
}
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
  focus: boolean;
  isPlaying: boolean;
};

type VideoElement = Omit<HTMLAttributes<HTMLVideoElement>, "children">;

type ChildrenType =
  | (ReactElement<typeof VideoPlayer> & {
      type: { PlayerComponent: PlayerComponentEnum };
    })
  | Array<
      ReactElement<typeof VideoPlayer> & {
        type: { PlayerComponent: PlayerComponentEnum };
      }
    >;

export type VideoPlayerProps = VideoElement & {
  src: string;
  ambient?: boolean;
  autoFocus?: boolean;
  children?: ChildrenType;
  headerTitle?: string;
};
