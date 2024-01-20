import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import useVideo from "../../hooks/useVideo";

export default function Ambient({ enabled }: { enabled?: boolean }) {
  const [scrolling, setScrolling] = useState(false);
  const ambientRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { container, video } = useVideo();
  const ambient = ambientRef.current;
  const canvas = canvasRef.current;
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (!ambient || !container || !canvas || !video) return;
      const { left, top, height, width } = container.getBoundingClientRect();
      ambient.style.left = left - width / 2 + "px";
      ambient.style.top = top - height / 2 + "px";
      ambient.style.height = height * 2 + "px";
      ambient.style.width = width * 2 + "px";
      canvas.width = video.videoWidth / 10;
      canvas.height = video.videoHeight / 10;
      canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, video.videoWidth / 10, video.videoHeight / 10);
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [ambient, canvas, container, enabled, video]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    function debounce(func: () => void, delay: number) {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    }
    function handler() {
      setScrolling(true);
      debounce(() => setScrolling(false), 1000);
    }

    document.addEventListener("scroll", handler);
    return () => {
      document.removeEventListener("scroll", handler);
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
