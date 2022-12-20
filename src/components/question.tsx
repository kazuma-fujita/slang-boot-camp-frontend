import { Button, Grid, Typography } from "@mui/material";
import { useQuestion } from "../hooks/use-question";
import { SpeechToText } from "./speech-to-text";
import { TextToSpeech } from "./text-to-speech";

export const Question = () => {
  const { state, dispatch } = useQuestion();
  const handleNextButton = () => {
    dispatch({ type: "next" });
  };

  return (
    <>
      <Grid item>
        <Typography variant="h5">
          {`Stage${state.currentIndex + 1}.`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">
          {`${state.currentQuestion.question} (${state.currentQuestion.translation})`}
        </Typography>
      </Grid>
      <TextToSpeech state={state} />
      <SpeechToText state={state} />
      <Grid item>
        <Button variant="contained" onClick={handleNextButton}>
          Next
        </Button>
      </Grid>
    </>
  );
};
