import { Grid, Typography } from "@mui/material";
import { Question } from "./question";
import { TweetButton } from "./tweet-button";

export const IndexTemplate = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      rowSpacing={4}
      mt={8}
    >
      <Grid item>
        <Typography variant="h2">Slang Boot Camp</Typography>
      </Grid>
      <Question />
      <Grid item mt={4}>
        <TweetButton />
      </Grid>
    </Grid>
  );
};
