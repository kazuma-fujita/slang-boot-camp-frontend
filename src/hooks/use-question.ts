import { createContext, Dispatch, useContext } from "react";
import { Action, State } from "../states/reducer";

type ContextProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const QuestionContext = createContext({} as ContextProps);

export const useQuestion = () => useContext(QuestionContext);
