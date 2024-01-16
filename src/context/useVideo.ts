import { useContext } from "react";
import { Context } from ".";

export default function useVideo() {
  try {
    const video = useContext(Context);
    if (video) return video;
    throw new Error("Error accessing video context");
  } catch (error) {
    throw new Error("Error accessing video context");
  }
}
