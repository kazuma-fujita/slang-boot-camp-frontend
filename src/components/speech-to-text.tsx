import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { Grid, IconButton } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  isRecording: boolean;
  error: string;
};

export const SpeechToText = ({
  startRecording,
  stopRecording,
  isRecording,
  error,
}: Props) => {
  return (
    <>
      <Grid item>
        <IconButton
          onClick={isRecording ? stopRecording : startRecording}
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
      {error && <p>{error}</p>}
    </>
  );
};
