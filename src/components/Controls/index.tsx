import styles from "./index.module.scss";

type Props = {
  onPlayChange: VoidFunction;
  isPlaying: boolean;
};
export default function Controls({ onPlayChange, isPlaying }: Props) {
  return (
    <div className={styles.container}>
      <button title="Play" onClick={onPlayChange} type="button">
        <PlayIcon isPlaying={isPlaying} />
      </button>
      <div className={styles.timerContainer}></div>
      <button
        className={styles.fullScreenButton}
        type="button"
        title="Full screen"
      >
        <FullScreenIcon />
      </button>
    </div>
  );
}

type PlayProps = {
  isPlaying: boolean;
};
function PlayIcon({ isPlaying = false }: PlayProps) {
  return <div className={styles.PlayIcon} data-playing={isPlaying} />;
}

function FullScreenIcon() {
  return <div className={styles.fullScreenIcon}></div>;
}
