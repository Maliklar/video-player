import useVideo from "../../../hooks/useVideo";
import styles from "./index.module.scss";
import Pause from "../../../assets/pause.svg";
import Play from "../../../assets/play.svg";
import { PlayerComponentEnum } from "../../../types";

export default function PlayController() {
  const { togglePlay, isPlaying } = useVideo();
  return (
    <button
      title="Play"
      onClick={togglePlay}
      className={styles.container}
      type="button"
    >
      <img
        className={styles.iconImage}
        src={isPlaying ? Pause : Play}
        alt="Toggle Play"
      />
    </button>
  );
}
PlayController.PlayerComponent = PlayerComponentEnum.PlayController;
