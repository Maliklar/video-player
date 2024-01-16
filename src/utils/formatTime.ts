export default function formatTime(seconds: number): string {
  seconds = Math.round(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    (hours > 0 ? padZero(hours) + ":" : "") +
    padZero(minutes) +
    ":" +
    padZero(remainingSeconds);

  return formattedTime;
}

function padZero(value: number): string {
  return value < 10 ? "0" + value : value.toString();
}
