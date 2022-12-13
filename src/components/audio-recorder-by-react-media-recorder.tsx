import ReactAudioPlayer from "react-audio-player";
import { useReactMediaRecorder } from "react-media-recorder";
import { useConvertSpeechToText } from "../hooks/use-convert-speech-to-text";

export const AudioRecorderByReactMediaRecorder = () => {
  const { convertSpeechToText } = useConvertSpeechToText();
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: "audio/mpeg" },
      onStop(_, blob) {
        convertSpeechToText(blob);
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
