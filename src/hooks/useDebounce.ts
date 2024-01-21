import { useRef } from "react";

export default function useDebounce() {
  const timeout = useRef<number>();
  const timeoutQueue = useRef<number[]>();
  function debounce(callback: Function, delay: number) {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(callback, delay);
    timeoutQueue.current?.push(timeout.current);
  }
  return debounce;
}
