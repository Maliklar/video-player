import FullScreenController from "./FullScreenController";
import PlayController from "./PlayController";
import TimerDisplay from "./TimerDisplay";
import VolumeController from "./VolumeController";
import styles from "./index.module.scss";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function Controls({ className, children, ...props }: Props) {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children ? (
        children
      ) : (
        <>
          <PlayController />
          <div className={styles.middle}>
            <VolumeController />
            <TimerDisplay />
          </div>
          <FullScreenController />
        </>
      )}
    </div>
  );
}
