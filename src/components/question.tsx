import { TextToSpeech } from "./text-to-speech";
import { useQuestion } from "../../pages/index";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { SpeechToText } from "./speech-to-text";

export const Question = () => {
  const { state, dispatch } = useQuestion();
  const handleNextButton = () => {
    dispatch({ type: "next" });
  };

  return (
    <>
      <TextToSpeech state={state} />
      <SpeechToText state={state} />
      <Button variant="contained" onClick={handleNextButton}>
        Next
      </Button>
    </>
  );
};
