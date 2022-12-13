import {
  BytesSource,
  SpeechToTextInput,
  SpeechToTextOutput,
} from "@aws-amplify/predictions";
import { Predictions } from "aws-amplify";
import { useCallback } from "react";
import { useState } from "react";

export const useConvertSpeechToText = () => {
  const [transcribeText, setTranscribeText] = useState("");
  const [error, setError] = useState("");

  const convertSpeechToText = useCallback(
    async (bytes: Buffer | ArrayBuffer | Blob | string) => {
      try {
        console.log("audio bytes", bytes);
        // const buffer: ArrayBuffer = await blob.arrayBuffer();
        // console.log("buf", buffer);
        const buffer: ArrayBuffer[] = [];
        const result: SpeechToTextOutput = await Predictions.convert({
          transcription: {
            source: { bytes },
            language: "en-US",
          },
        });
        console.log("audio2text", result.transcription.fullText);
        setTranscribeText(result.transcription.fullText);
      } catch (error) {
        console.error(error);
        setError(JSON.stringify(error, null, 2));
      }
    },
    []
  );

  return { convertSpeechToText, transcribeText, error };
};
