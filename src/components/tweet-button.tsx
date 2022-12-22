import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import css from "styled-jsx/css";
import { useQuestion } from "../hooks/use-question";

// ストリングスタイル
const style = css`
  color: white;
`;

export const TweetButton = () => {
  const { state } = useQuestion();
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=スラングを${state.correctAnswerCount}個覚えた！`}
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
