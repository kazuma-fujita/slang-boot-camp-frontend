import { Button } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import { useQuestion } from "../../pages/index";
import { useConvertTextToSpeech } from "../hooks/use-convert-text-to-speech";

export const TextToSpeech = () => {
  const { state, dispatch } = useQuestion();
  const { convertTextToSpeech, speechBlobUrl, error } =
    useConvertTextToSpeech();

  const handleListenButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    convertTextToSpeech(state.currentQuestion.question);
  };

  return (
    <>
      <Button variant="contained" onClick={handleListenButton}>
        Listen
      </Button>
      {speechBlobUrl && (
        <ReactAudioPlayer src={speechBlobUrl} controls autoPlay />
      )}
      {error && <p>{error}</p>}
    </>
  );
};
