import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data from "../database/data";

/**redux action */
import * as Action from "../redux/question_reducer";

/**fetch questions  hookj to fetch api data andd set value to store*/
export const useFetchQestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, Loading: true }));

    /**async function fetch backend data*/
    (async () => {
      try {
        let question = await data;

        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: question }));

          /**dispatch an action */
          dispatch(Action.startExamAction(question));
        } else {
          throw new Error("No Questions Available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};
