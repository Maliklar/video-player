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

        <VideoPlayer src="/test1.mp4" ambient headerTitle="Malik">
          <VideoPlayer.Header children="asdf" />
        </VideoPlayer>
        <div>asdf</div>
      </div>
      <div>asdf</div>
    </div>
  );
}

export default App;
