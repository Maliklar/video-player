import styles from "./index.module.scss";
import { useEffect, useRef } from "react";
import useVideo from "../hooks/useVideo";
const canvas = document.createElement("canvas");
const image = document.createElement("img");
export default function Ambient({ enabled }: { enabled: boolean }) {
  const ambientRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { container, video } = useVideo();

  const imageAppended = useRef(false);

  useEffect(() => {
    const ambient = ambientRef.current;
    const canvas = canvasRef.current;

    if (!enabled) return;

    // if (!imageAppended.current) {
    //   image.setAttribute("class", styles.ambientImage);
    //   ambient?.appendChild(image);
    //   imageAppended.current = true;
    // }

    const interval = setInterval(() => {
      if (!ambient || !container || !canvas || !video) return;
      const { left, right, bottom, top, y, height, width } =
        container.getBoundingClientRect();
      console.log(top, y);
      ambient.style.left = left - width / 2 + "px";
      ambient.style.top = top - height / 2 + "px";
      ambient.style.height = height * 2 + "px";
      ambient.style.width = width * 2 + "px";
      if (!video) return;
      canvas.width = video.videoWidth / 10;
      canvas.height = video.videoHeight / 10;

      canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, video.videoWidth / 10, video.videoHeight / 10);

      image.src = canvas.toDataURL();
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [container, enabled, video]);

  return (
    <div ref={ambientRef} className={styles.container}>
      <canvas ref={canvasRef} className={styles.ambientImage} />
    </div>
  );
}
