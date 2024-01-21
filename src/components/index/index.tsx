import { VideoPlayerProps } from "../../types";
import VideoPlayer from "../VideoPlayer";

type Props = VideoPlayerProps;
export default function Player(props: Props) {
  return (
    <VideoPlayer {...props}>
      <VideoPlayer.Header>{props.headerTitle}</VideoPlayer.Header>
      <VideoPlayer.Footer>
        <VideoPlayer.ProgressController />
        <VideoPlayer.Controls />
      </VideoPlayer.Footer>
    </VideoPlayer>
  );
}
