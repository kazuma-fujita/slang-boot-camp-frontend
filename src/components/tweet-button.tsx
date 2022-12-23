import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import { appUrl } from "../constants/urls";
import { useQuestion } from "../hooks/use-question";

export const TweetButton = () => {
  const { state } = useQuestion();
  const tweetText = `スラングの発音を${state.correctAnswerCount}個覚えた！ ${appUrl}`;
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetText
      )}`}
      target="_blank"
      rel="noreferrer"
    >
      <Button
        startIcon={<TwitterIcon fontSize="large" />}
        size="large"
        variant="outlined"
      >
        Tweet!
      </Button>
    </a>
  );
};
