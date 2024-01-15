import { useEffect } from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";

function App() {
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

        <VideoPlayer />
        <div>asdf</div>
      </div>
      <div>asdf</div>
    </div>
  );
}

export default App;
