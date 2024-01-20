import FullScreenController from "./FullScreenController";
import PlayController from "./PlayController";
import TimerDisplay from "./TimerDisplay";
import VolumeController from "./VolumeController";
import styles from "./index.module.scss";

export default function Controls() {
  return (
    <div className={styles.container}>
      <PlayController />
      <div className={styles.middle}>
        <VolumeController />
        <TimerDisplay />
      </div>
      <FullScreenController />
    </div>
  );
}
