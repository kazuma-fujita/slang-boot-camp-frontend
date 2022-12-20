import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useConvertTextToSpeech } from "../hooks/use-convert-text-to-speech";
import { State } from "../states/reducer";

type Props = {
  state: State;
};

export const TextToSpeech = ({ state }: Props) => {
  const { convertTextToSpeech, speechBlobUrl, error } =
    useConvertTextToSpeech();

  // dispatch({type: "next"})の状態変更を検知しテキストを音声変換
  useEffect(() => {
    convertTextToSpeech(state.currentQuestion.question);
  }, [convertTextToSpeech, state]);

  return (
    <>
      {speechBlobUrl && (
        <Grid item>
          <ReactAudioPlayer src={speechBlobUrl} controls autoPlay />
        </Grid>
      )}
      {error && <p>{error}</p>}
    </>
  );
};
