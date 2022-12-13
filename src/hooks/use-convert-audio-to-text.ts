import {
  BytesSource,
  SpeechToTextInput,
  SpeechToTextOutput,
} from "@aws-amplify/predictions";
import { Predictions } from "aws-amplify";
import { useCallback } from "react";

export const useConvertAudioToText = () => {
  // const convertAudioToText = useCallback(async (blobUrl: string) => {
  //   console.log("blobUrl", blobUrl);
  //   try {
  //     const blob: Blob = await fetch(blobUrl).then((response) =>
  //       response.blob()
  //     );
  //     console.log("blob", blob);
  //     const result: SpeechToTextOutput = await Predictions.convert({
  //       transcription: {
  //         source: { bytes: blob },
  //         language: "en-US",
  //       },
  //     });
  //     console.log("res", result.transcription.fullText);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  const convertAudioToText = useCallback(async (blob: Blob | Buffer) => {
    try {
      console.log("audio blob", blob);
      // const buffer: ArrayBuffer = await blob.arrayBuffer();
      // console.log("buf", buffer);
      const result: SpeechToTextOutput = await Predictions.convert({
        transcription: {
          source: { bytes: blob },
          language: "en-US",
        },
      });
      console.log("audio2text", result.transcription.fullText);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { convertAudioToText };
};
