import ReactAudioPlayer from "react-audio-player";
import { useReactMediaRecorder } from "react-media-recorder";
import { useConvertAudioToText } from "../hooks/use-convert-audio-to-text";

export const AudioRecorderByReactMediaRecorder = () => {
  const { convertAudioToText } = useConvertAudioToText();
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: "audio/mpeg" },
      onStop(_, blob) {
        convertAudioToText(blob);
        clearBlobUrl();
      },
    });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {mediaBlobUrl && <ReactAudioPlayer src={mediaBlobUrl} controls />}
    </div>
  );
};
