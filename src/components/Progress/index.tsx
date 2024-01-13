import styles from "./index.module.scss";

type Props = {
  percentage: number;
};
export default function Progress({ percentage }: Props) {
  return (
    <div
      className={styles.progress}
      style={{
        width: `${percentage}%`,
      }}
    />
  );
}
