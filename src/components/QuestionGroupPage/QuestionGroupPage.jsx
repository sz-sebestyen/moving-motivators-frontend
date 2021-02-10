import { createQuestion } from "../requests/requests";
import { useParams } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import {
  UserContext,
  GroupsContext,
  QuestionsContext,
} from "../Context/Context";
import { Link } from "react-router-dom";

import "./QuestionGroupPage.css";

const QuestionForm = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const input = useRef(null);

  return (
    <div className="questionFormWrap">
      <form
        className="questionForm"
        onSubmit={async (event) => {
          event.preventDefault();
          props.setInCreation(false);
          const sendData = {
            groupId: props.groupId,
            value: input.current.value,
          };
          const newQuestion = await createQuestion(sendData);
          console.log(newQuestion);
          /* if (newQuestion) {
            // TODO: set questions
          } */
        }}
      >
        <input
          ref={input}
          type="text"
          name="newQuestionName"
          id="newQuestionName"
          placeholder="new question"
          required
        />
        <button type="submit">Create</button>
        <button type="button" onClick={() => props.setInCreation(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const Question = (props) => {
  return (
    <li className="question">
      <Link to={`/question/${props.question.id}`}>{props.question.value}</Link>
    </li>
  );
};

const QuestionGroupPage = (props) => {
  const { id } = useParams();
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const [inCreation, setInCreation] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions((prev) => questionsContext[id] || []);
  }, [questionsContext, id]);

  return (
    <main className="questionGroupPage">
      {inCreation && (
        <QuestionForm setInCreation={setInCreation} groupId={id} />
      )}
      <div className="questionsMenu">
        <button className="createQuestion" onClick={() => setInCreation(true)}>
          Add question
        </button>
        <button>Invite member</button>
        <button>Delete group</button>
      </div>
      <ul className="allQuestions">
        {questions.map((question) => (
          <Question key={question.id} question={question}></Question>
        ))}
      </ul>
    </main>
  );
};

export default QuestionGroupPage;
