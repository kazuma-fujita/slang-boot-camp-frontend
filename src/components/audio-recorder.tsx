import { useState } from "react";
import MicrophoneStream from "microphone-stream";

type Props = {
  finishRecording: (bytes: Buffer | ArrayBuffer | Blob | string) => void;
};

export const AudioRecorder = ({ finishRecording }: Props) => {
  const [recording, setRecording] = useState(false);
  const [micStream, setMicStream] = useState<MicrophoneStream | null>(null);
  const [audioBuffer] = useState(
    (function () {
      let buffer: ArrayBuffer[] = [];
      function add(raw: ArrayBuffer[]) {
        buffer = buffer.concat(...raw);
        return buffer;
      }
      function newBuffer() {
        console.log("resetting buffer");
        buffer = [];
      }

      return {
        reset: function () {
          newBuffer();
        },
        addData: function (raw: ArrayBuffer) {
          return add([raw]);
        },
        getData: function () {
          return buffer;
        },
      };
    })()
  );

  async function startRecording() {
    console.log("start recording");
    audioBuffer.reset();

    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    const startMic = new MicrophoneStream();

    startMic.setStream(stream);
    (startMic as any).on("data", (chunk: Buffer) => {
      console.log("MicrophoneStream on data");
      var raw = MicrophoneStream.toRaw(chunk);
      if (raw == null) {
        return;
      }
      audioBuffer.addData(raw);
    });

    setRecording(true);
    setMicStream(startMic);
  }

  async function stopRecording() {
    console.log("stop recording");

    if (micStream) {
      micStream.stop();
      setMicStream(null);
      setRecording(false);
      const resultBuffer = audioBuffer.getData();
      console.log("resultBuffer", resultBuffer);
      finishRecording(resultBuffer.join(""));
    }
  }

  return (
    <div className="audioRecorder">
      <div>
        {recording && <button onClick={stopRecording}>Stop recording</button>}
        {!recording && (
          <button onClick={startRecording}>Start recording</button>
        )}
      </div>
    </div>
  );
};
