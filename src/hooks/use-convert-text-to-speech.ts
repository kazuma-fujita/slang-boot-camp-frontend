import { TextToSpeechOutput } from "@aws-amplify/predictions";
import { Predictions } from "aws-amplify";
import { useState, useCallback } from "react";

export const useConvertTextToSpeech = () => {
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
      setSpeechBlobUrl(result.speech.url);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      setError(error.message);
    }
  }, []);

  return { convertTextToSpeech, speechBlobUrl, error };
};
