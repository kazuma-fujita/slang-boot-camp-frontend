import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import { useQuestion } from "../hooks/use-question";

const appUrl = "https://main.d1ntt9o0lggnhf.amplifyapp.com";

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
