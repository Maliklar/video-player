import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import useVideo from "../hooks/useVideo";

export default function Ambient({ enabled }: { enabled: boolean }) {
  const [scrolling, setScrolling] = useState(false);
  const ambientRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { container, video } = useVideo();

  useEffect(() => {
    const ambient = ambientRef.current;
    const canvas = canvasRef.current;

    if (!enabled) return;

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
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [container, enabled, video]);

  useEffect(() => {
    const handler = (e?: Event | boolean) => {
      setScrolling(true);
    };
    const scrollEnd = () => {
      setScrolling(false);
    };
    document.addEventListener("scroll", handler);
    document.addEventListener("scrollend", scrollEnd);
    return () => {
      document.removeEventListener("scroll", handler);
      document.removeEventListener("scrollend", scrollEnd);
    };
  }, []);

  return (
    <div
      ref={ambientRef}
      className={styles.container}
      data-scrolling={scrolling}
    >
      <canvas ref={canvasRef} className={styles.ambientImage} />
    </div>
  );
}
