import { useRef } from "react";
import "./App.css";
import Player from "./components/index";
import { VideoContextType } from "./types";

function App() {
  const video = useRef<VideoContextType>();
  function readyHandler(v: VideoContextType) {
    video.current = v;
  }
  return (
    <div className="App">
      <div>asdf</div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div>asdf</div>
        <Player
          src="/test1.mp4"
          ambient
          autoFocus
          headerTitle="My Title"
          ready={readyHandler}
        />

        <div>asdf</div>
      </div>
      <div>asdf</div>
    </div>
  );
}

export default App;
