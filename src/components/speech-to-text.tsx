import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { State } from "../states/reducer";

type Props = {
  state: State;
};

export const SpeechToText = ({ state }: Props) => {
  const { startRecording, stopRecording, transcribeText, isRecording, error } =
    useSpeechToText();

  useEffect(() => {
    console.log("Q", state.currentQuestion.question);
    console.log("A", transcribeText);
  }, [state, transcribeText]);

  return (
    <>
      <IconButton
        onClick={isRecording ? stopRecording : startRecording}
        size="large"
        aria-label="mic"
      >
        {isRecording ? <MicIcon /> : <MicNoneIcon />}
      </IconButton>
      <textarea value={transcribeText} rows={8} cols={32} readOnly />
      {state.currentQuestion.question === transcribeText
        ? "Whoo-hoo! You're fucking awesome!"
        : `What the hell are you doing? It sounds like what you said ${transcribeText}`}
      {error && <p>{error}</p>}
    </>
  );
};
