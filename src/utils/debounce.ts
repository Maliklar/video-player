let timeout: NodeJS.Timeout;
export default function debounce(func: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(func, delay);
}
