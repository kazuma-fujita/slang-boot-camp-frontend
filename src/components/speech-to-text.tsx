import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { State } from "../states/reducer";

type Props = {
  state: State;
};

export const SpeechToText = ({ state }: Props) => {
  const {
    startRecording,
    stopRecording,
    transcribeText,
    isRecording,
    isConverting,
    error,
  } = useSpeechToText();

  const [isNextQuestion, setNextQuestion] = useState(false);
  useEffect(() => {
    console.log("Q", state.currentQuestion.question);
    // console.log("A", transcribeText);
    setNextQuestion(true);
  }, [state]);

  const handleStopRecording = () => {
    setNextQuestion(false);
    stopRecording();
  };

  return (
    <>
      <Grid item>
        <IconButton
          onClick={isRecording ? handleStopRecording : startRecording}
          size="large"
          aria-label="mic"
        >
          {isRecording ? (
            <MicIcon sx={{ fontSize: "100px" }} />
          ) : (
            <MicNoneIcon sx={{ fontSize: "100px" }} />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {isNextQuestion ? (
            "Speak up!"
          ) : isConverting ? (
            <CircularProgress />
          ) : state.currentQuestion.question === transcribeText ? (
            `Whoo-hoo! You're fucking awesome! You said "${transcribeText}"!`
          ) : (
            `What the hell are you doing? You said "${transcribeText}"`
          )}
        </Typography>
      </Grid>
      {error && <p>{error}</p>}
    </>
  );
};
