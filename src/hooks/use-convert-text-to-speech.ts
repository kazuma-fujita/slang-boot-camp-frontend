import { TextToSpeechOutput } from "@aws-amplify/predictions";
import { Predictions } from "aws-amplify";
import { useState, useCallback } from "react";

export const useConvertTextToSpeech = () => {
  const [speechBuffer, setSpeechBuffer] = useState<Buffer | null>(null);
  const [speechBlobUrl, setSpeechBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const convertTextToSpeech = useCallback(async (sourceText: string) => {
    try {
      const result: TextToSpeechOutput = await Predictions.convert({
        textToSpeech: {
          source: {
            text: sourceText,
          },
          voiceId: "Amy",
        },
      });
      setSpeechBuffer(result.audioStream);
      setSpeechBlobUrl(result.speech.url);
    } catch (err) {
      console.error(err);
      const error = err as Error;
      setError(error.message);
    }
  }, []);

  return { convertTextToSpeech, speechBuffer, speechBlobUrl, error };
};
