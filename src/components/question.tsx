import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { useQuestion } from "../hooks/use-question";
import { useSpeechToText } from "../hooks/use-speech-to-text";
import { SpeechToText } from "./speech-to-text";
import { TextToSpeech } from "./text-to-speech";

export const Question = () => {
  const { state, dispatch } = useQuestion();
  const speechToTextReturns = useSpeechToText();
  const { isRecording, isConverting } = speechToTextReturns;

  const handleNextButton = () => {
    state.isLastQuestion
      ? dispatch({ type: "first" })
      : dispatch({ type: "next" });
  };

  return (
    <>
      <Grid item>
        <Typography variant="h5">
          {state.isLastQuestion
            ? "Last stage."
            : `Stage${state.currentIndex + 1}.`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">
          {`${state.currentQuestion.question} (${state.currentQuestion.translation})`}
        </Typography>
      </Grid>
      <TextToSpeech state={state} />
      <SpeechToText state={state} {...speechToTextReturns} />
      <Grid item>
        <LoadingButton
          variant="contained"
          onClick={handleNextButton}
          loading={isRecording || isConverting}
        >
          {state.isLastQuestion ? "Back to the first" : "Next"}
        </LoadingButton>
      </Grid>
    </>
  );
};
