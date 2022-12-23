import { SpeechToTextOutput } from "@aws-amplify/predictions";
import { Predictions } from "aws-amplify";
import { useCallback, useState } from "react";

export const useConvertSpeechToText = () => {
  const [transcribeText, setTranscribeText] = useState("");
  const [error, setError] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const clearTranscribeText = useCallback(() => {
    setTranscribeText("");
  }, []);

  const convertSpeechToText = useCallback(
    // Amazon Transcribe Streaming が正常動作したのは Buffer[] | ArrayBuffer[] 型のみだった
    // 以下型指定(BytesSource型)では動作しない為、ここだけany型で回避
    // async (bytes: Buffer | ArrayBuffer | Blob | string) => {
    async (bytes: any) => {
      try {
        setIsConverting(true);
        const result: SpeechToTextOutput = await Predictions.convert({
          transcription: {
            source: { bytes },
            language: "en-US",
          },
        });
        setIsConverting(false);
        const resultText = result.transcription.fullText;
        setTranscribeText(resultText);
        return resultText;
      } catch (err) {
        const error = err as Error;
        console.error(error);
        setError(error.message);
      }
    },
    []
  );

  return {
    convertSpeechToText,
    transcribeText,
    clearTranscribeText,
    isConverting,
    error,
  };
};
