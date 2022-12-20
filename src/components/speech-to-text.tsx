import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { State } from "../states/reducer";

type Props = {
  state: State;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  transcribeText: string;
  isRecording: boolean;
  isConverting: boolean;
  error: string;
};

export const SpeechToText = ({
  state,
  startRecording,
  stopRecording,
  transcribeText,
  isRecording,
  isConverting,
  error,
}: Props) => {
  const [isNextQuestion, setIsNextQuestion] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsNextQuestion(true);
  }, [state]);

  useEffect(() => {
    const question = state.currentQuestion.question;
    // 文末の ! ? . など記号を除去した値を比較
    setIsCorrect(question.slice(0, -1) === transcribeText.slice(0, -1));
  }, [state, transcribeText]);

  const handleStopRecording = () => {
    setIsNextQuestion(false);
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
            <MicIcon sx={{ fontSize: "100px" }} color="error" />
          ) : (
            <MicNoneIcon sx={{ fontSize: "100px" }} />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <Box sx={{ typography: "h5" }} height={32}>
          {isNextQuestion ? (
            "Speak up!"
          ) : isRecording || isConverting ? (
            <CircularProgress size={32} />
          ) : isCorrect ? (
            `Whoo-hoo🎉 You were able to say "${transcribeText}" 👍`
          ) : (
            `What the hell are you doing? You said "${transcribeText}" 👎`
          )}
        </Box>
      </Grid>
      {error && <p>{error}</p>}
    </>
  );
};
