import MicrophoneStream from "microphone-stream";
import { useState } from "react";
import { useConvertSpeechToText } from "./use-convert-speech-to-text";
import { useQuestion } from "./use-question";

const silenceSeconds = 2;
const minVolume = 0.003;

export const useSpeechToText = () => {
  const { dispatch } = useQuestion();
  const {
    convertSpeechToText,
    transcribeText,
    clearTranscribeText,
    isConverting,
    error,
  } = useConvertSpeechToText();
  const [isRecording, setIsRecording] = useState(false);
  const [micStream, setMicStream] = useState<MicrophoneStream | null>(null);
  const [audioBuffer] = useState(
    (() => {
      let buffer: ArrayBuffer[] = [];
      const addData = (raw: any) => {
        buffer = buffer.concat(...raw);
        return buffer;
      };
      const reset = () => {
        buffer = [];
      };
      const getData = () => buffer;
      return { reset, addData, getData };
    })()
  );

  const startRecording = async () => {
    audioBuffer.reset();

    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    const startMic = new MicrophoneStream();

    startMic.setStream(stream);
    setMicStream(startMic);
    setIsRecording(true);

    const startTime = new Date();
    (startMic as any).on("data", async (chunk: Buffer) => {
      var raw = MicrophoneStream.toRaw(chunk);
      if (raw == null) {
        return;
      }
      audioBuffer.addData(raw);
      // 一定音量以下の場合録音停止処理
      if (raw[0] < minVolume) {
        const finishTime = new Date().getTime() - startTime.getTime();
        // 無音秒数(2s)経過した場合録音停止
        if (Math.floor(finishTime / 1000) === silenceSeconds) {
          startMic.stop();
          setMicStream(null);
          setIsRecording(false);
          const resultBuffer = audioBuffer.getData();
          const resultText = await convertSpeechToText(resultBuffer);
          if (resultText) {
            dispatch({ type: "judgeAnswer", transcribeText: resultText });
          }
          return;
        }
      }
    });
  };

  const stopRecording = async () => {
    if (micStream) {
      micStream.stop();
      setMicStream(null);
      setIsRecording(false);
      const resultBuffer = audioBuffer.getData();
      const resultText = await convertSpeechToText(resultBuffer);
      if (resultText) {
        dispatch({ type: "judgeAnswer", transcribeText: resultText });
      }
    }
  };

  return {
    startRecording,
    stopRecording,
    transcribeText,
    clearTranscribeText,
    isRecording,
    isConverting,
    error,
  };
};
