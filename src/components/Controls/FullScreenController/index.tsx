import useVideo from "../../../hooks/useVideo";
import styles from "./index.module.scss";
import FullScreenMin from "../../../assets/fullscreen-min.svg";
import FullScreen from "../../../assets/fullscreen.svg";
import { PlayerComponentEnum } from "../../../types";

export default function FullScreenController() {
  const { isFullScreen, toggleFullScreen } = useVideo();
  return (
    <button
      className={styles.container}
      type="button"
      title="Full screen"
      onClick={toggleFullScreen}
    >
      <img
        className={styles.iconImage}
        src={isFullScreen ? FullScreenMin : FullScreen}
        alt="Toggle Fullscreen"
      />
    </button>
  );
}

FullScreenController.PlayerComponent = PlayerComponentEnum.FullScreenController;
