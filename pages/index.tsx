import { useReducer } from "react";
import { IndexTemplate } from "../src/components/index-template";
import { QuestionContext } from "../src/hooks/use-question";
import { initialState, reducer } from "../src/states/reducer";

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuestionContext.Provider value={{ state, dispatch }}>
      <IndexTemplate />
    </QuestionContext.Provider>
  );
};

export default Home;
