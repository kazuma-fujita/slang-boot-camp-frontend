import { Question, questions } from "../data/questions";

export type State = {
  currentIndex: number;
  currentQuestion: Question;
  isLastQuestion: boolean;
};

export const initialState: State = {
  currentIndex: 0,
  currentQuestion: questions[0],
  isLastQuestion: false,
};

export type Action = { type: "first" } | { type: "prev" } | { type: "next" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "first":
      return initialState;
    case "prev":
      const prevIndex = state.currentIndex - 1;
      if (prevIndex in questions) {
        return {
          currentIndex: prevIndex,
          currentQuestion: questions[prevIndex],
          isLastQuestion: false,
        };
      }
    case "next":
      const nextIndex = state.currentIndex + 1;
      if (nextIndex in questions) {
        return {
          currentIndex: nextIndex,
          currentQuestion: questions[nextIndex],
          isLastQuestion: nextIndex + 1 === questions.length,
        };
      }
    default:
      return state;
  }
};
