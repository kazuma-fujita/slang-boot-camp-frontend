import ReactAudioPlayer from "react-audio-player";
import { useReactMediaRecorder } from "react-media-recorder";

export const AudioRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
      {mediaBlobUrl && <ReactAudioPlayer src={mediaBlobUrl} controls />}
    </div>
  );
};
