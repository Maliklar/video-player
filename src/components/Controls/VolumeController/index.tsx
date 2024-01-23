import useVideo from "../../../hooks/useVideo";
import styles from "./index.module.scss";
import VolumeMax from "../../../assets/volume-max.svg";
import VolumeMin from "../../../assets/volume-min.svg";
import VolumeMute from "../../../assets/volume-mute.svg";
import { ChangeEvent } from "react";
import { PlayerComponentEnum } from "../../../types";
function VolumeController() {
  const { focusVolume, volume, mute, changeVolume, toggleMute } = useVideo();
  const image = mute
    ? VolumeMute
    : volume >= 0.5
    ? VolumeMax
    : volume === 0
    ? VolumeMute
    : VolumeMin;

  function volumeChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    changeVolume(Number(e.target.value));
  }
  return (
    <div data-focus={focusVolume} className={styles.container}>
      <button
        type="button"
        className={styles.muteButton}
        onClick={toggleMute}
        title="Mute/Unmute button"
      >
        <img className={styles.iconImage} src={image} alt="Volume" />
      </button>
      <input
        className={styles.volumeSlider}
        title="Volume"
        type="range"
        min="0"
        step="0.01"
        max="1"
        onChange={volumeChangeHandler}
        value={volume}
      />
    </div>
  );
}

VolumeController.PlayerComponent = PlayerComponentEnum.VolumeController;
export default VolumeController;
