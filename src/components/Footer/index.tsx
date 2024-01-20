import { HTMLAttributes } from "react";
import useVideo from "../../hooks/useVideo";
import Controls from "../Controls";
import ProgressController from "../Controls/ProgressController";
import styles from "./index.module.scss";

type Props = HTMLAttributes<HTMLDivElement>;
export default function Footer({ className, ...props }: Props) {
  const { focus, videoLoaded } = useVideo();
  return (
    <div
      className={`${styles.container} ${className}`}
      {...props}
      data-focus={focus}
    >
      {videoLoaded ? <ProgressController /> : null}
      {videoLoaded ? <Controls /> : null}
    </div>
  );
}
