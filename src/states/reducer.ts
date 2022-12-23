import { Question, questions } from "../data/questions";

export type State = {
  currentIndex: number;
  currentQuestion: Question;
  isLastQuestion: boolean;
  isCorrectAnswer: boolean;
  correctAnswerHistories: boolean[];
  correctAnswerCount: number;
};

export const initialState: State = {
  currentIndex: 0,
  currentQuestion: questions[0],
  isLastQuestion: false,
  isCorrectAnswer: false,
  correctAnswerHistories: [false],
  correctAnswerCount: 0,
};

export type Action =
  | { type: "first" }
  | { type: "judgeAnswer"; transcribeText: string }
  | { type: "next" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "first":
      return initialState;
    case "judgeAnswer":
      const question = state.currentQuestion.question;
      console.log("Q", question);
      console.log("A", action.transcribeText);
      const isCorrectAnswer =
        question.slice(0, -1) === action.transcribeText.slice(0, -1);
      console.log(isCorrectAnswer);
      let correctAnswerHistories: boolean[] = state.correctAnswerHistories;
      // 現在の問題で過去に解答があるか否か
      if (state.currentIndex in state.correctAnswerHistories) {
        // 過去解答が不正解の時のみ値を更新
        if (!state.correctAnswerHistories[state.currentIndex]) {
          correctAnswerHistories = state.correctAnswerHistories.map(
            (value, index) =>
              index === state.currentIndex ? isCorrectAnswer : value
          );
        }
      } else {
        // 過去に解答が無ければ解答結果を追加
        correctAnswerHistories = [
          ...state.correctAnswerHistories,
          isCorrectAnswer,
        ];
      }
      console.log(correctAnswerHistories);
      return {
        ...state,
        isCorrectAnswer: isCorrectAnswer,
        correctAnswerHistories: correctAnswerHistories,
        correctAnswerCount: correctAnswerHistories.filter(
          (isCorrectAnswer) => isCorrectAnswer
        ).length,
      };
    case "next":
      const nextIndex = state.currentIndex + 1;
      if (nextIndex in questions) {
        return {
          ...state,
          currentIndex: nextIndex,
          currentQuestion: questions[nextIndex],
          isLastQuestion: nextIndex + 1 === questions.length,
          isCorrectAnswer: false,
          correctAnswerHistories: [...state.correctAnswerHistories, false],
        };
      }
    default:
      return state;
  }
};
