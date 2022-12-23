import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { questions } from "../data/questions";
import { useQuestion } from "../hooks/use-question";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { SpeechToText } from "./speech-to-text";
import { TextToSpeech } from "./text-to-speech";

export const Question = () => {
  const { state, dispatch } = useQuestion();
  const [isNextQuestion, setIsNextQuestion] = useState(true);
  const {
    startRecording,
    stopRecording,
    transcribeText,
    isRecording,
    isConverting,
    error,
  } = useSpeechToText();

  const handleNextButton = () => {
    state.isLastQuestion
      ? dispatch({ type: "first" })
      : dispatch({ type: "next" });
    setIsNextQuestion(true);
  };

  const handleStartRecording = async () => {
    await startRecording();
    setIsNextQuestion(false);
  };

  return (
    <>
      <Grid item>
        <Typography variant="h5">
          {state.isLastQuestion
            ? "Final stage."
            : `Stage${state.currentIndex + 1}.`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">
          {`${state.currentQuestion.question} (${state.currentQuestion.translation})`}
        </Typography>
      </Grid>
      <TextToSpeech state={state} />
      <SpeechToText
        stopRecording={stopRecording}
        startRecording={handleStartRecording}
        isRecording={isRecording}
        error={error}
      />
      <Grid item>
        <Box sx={{ typography: "h5" }} height={32}>
          {isNextQuestion ? (
            "Speak up!👆"
          ) : isRecording ? (
            "Stop the recording👆"
          ) : isConverting ? (
            <CircularProgress size={32} />
          ) : state.isCorrectAnswer ? (
            `Whoo-hoo🎉 You were able to say "${transcribeText}" 👍`
          ) : (
            `What the hell are you doing? You said "${transcribeText}" 👎`
          )}
        </Box>
      </Grid>
      <Grid item>
        <LoadingButton
          variant="contained"
          onClick={handleNextButton}
          loading={isRecording || isConverting}
          size="large"
        >
          {state.isLastQuestion ? "Back to the first" : "Next"}
        </LoadingButton>
      </Grid>
    </>
  );
};
