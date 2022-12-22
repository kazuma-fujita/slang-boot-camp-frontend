import { Question, questions } from "../data/questions";

export type State = {
  currentIndex: number;
  currentQuestion: Question;
  isLastQuestion: boolean;
  isCorrect: boolean;
  correctAnswerCount: number;
};

export const initialState: State = {
  currentIndex: 0,
  currentQuestion: questions[0],
  isLastQuestion: false,
  isCorrect: false,
  correctAnswerCount: 0,
};

export type Action =
  | { type: "first" }
  | { type: "addCorrectAnswerCount" }
  | { type: "next" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "first":
      return initialState;
    case "addCorrectAnswerCount":
      return {
        ...state,
        isCorrect: true,
        correctAnswerCount: state.isCorrect
          ? state.correctAnswerCount
          : state.correctAnswerCount + 1,
      };
    case "next":
      const nextIndex = state.currentIndex + 1;
      if (nextIndex in questions) {
        return {
          currentIndex: nextIndex,
          currentQuestion: questions[nextIndex],
          isLastQuestion: nextIndex + 1 === questions.length,
          isCorrect: false,
          correctAnswerCount: state.correctAnswerCount,
        };
      }
    default:
      return state;
  }
};
