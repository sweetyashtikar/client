import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import data from "../database/data";


/*Custom Hooks*/
import { useFetchQestion } from "../hooks/FetchQuestion";

export default function Questions() {
  
  const [checked, setChecked] = useState(undefined);
  const [{isLoading, apiData, serverError}] = useFetchQestion()
  const question = data[0];

  const questions = useSelector(state => state.questions.queue[state.questios.trace])

  useEffect(() => {
    console.log(questions);
  });

  function onSelect() {
    //console.log("radio button change");
  }


  if(isLoading) return <h3 className="text-light">isLoading</h3>
  if(serverError) return <h3 className="text-light">{serverError || "Unknown Error"}</h3>

  return (
    <div className="questions">
      <h2 className="text-light">{question.question}</h2>

      <ul key={question.id}>
        {question.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q$${i}-option`}
              onChange={onSelect()}
            />

            <label className="text-primary" htmlFor={`q$${i}-option`}>
              {q}
            </label>
            <div className="check checked"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
