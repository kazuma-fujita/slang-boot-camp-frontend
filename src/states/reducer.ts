import { Question, questions } from "../data/questions";

export type State = { currentIndex: number; currentQuestion: Question } | null;

export const initialState: State = null;

export type Action = { type: "prev" } | { type: "next" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "prev":
      const prevIndex = state ? state.currentIndex - 1 : 0;
      if (prevIndex in questions) {
        return {
          currentIndex: prevIndex,
          currentQuestion: questions[prevIndex],
        };
      }
    case "next":
      const nextIndex = state ? state.currentIndex + 1 : 0;
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
