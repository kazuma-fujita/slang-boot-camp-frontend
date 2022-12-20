import { Question, questions } from "../data/questions";

export type State = { currentIndex: number; currentQuestion: Question };

export const initialState: State = {
  currentIndex: 0,
  currentQuestion: questions[0],
};

export type Action = { type: "prev" } | { type: "next" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "prev":
      const prevIndex = state.currentIndex - 1;
      if (prevIndex in questions) {
        return {
          currentIndex: prevIndex,
          currentQuestion: questions[prevIndex],
        };
      }
    case "next":
      const nextIndex = state.currentIndex + 1;
      if (nextIndex in questions) {
        return {
          currentIndex: nextIndex,
          currentQuestion: questions[nextIndex],
        };
      }
    default:
      return state;
  }
};
