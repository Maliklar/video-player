import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import FullScreenMin from "../../../assets/fullscreen-min.svg";
import FullScreen from "../../../assets/fullscreen.svg";
import useVideo from "../../../hooks/useVideo";
import { PlayerComponentEnum } from "../../../types";
import styles from "./index.module.scss";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
function FullScreenController({ type, className, ...props }: Props) {
  const { isFullScreen, toggleFullScreen } = useVideo();
  return (
    <button
      className={`${styles.container} ${className}`}
      type="button"
      onClick={toggleFullScreen}
      {...props}
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
export default FullScreenController;
