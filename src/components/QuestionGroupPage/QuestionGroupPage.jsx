import QuestionGroups from "../QuestionGroups/QuestionGroups";
import { getQuestions } from "../requests/requests";
import { useParams } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Link } from "react-router-dom";

const QuestionForm = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const input = useRef(null);

  return (
    <div className="questionFormWrap">
      <form
        className="questionForm"
        onSubmit={(event) => {
          event.preventDefault();
          props.setInCreation(false);
          /*           createQuestionGroup(input.current.value).then((data) => {
            console.log(data);
            setUserContext((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                groupIds: [...prev.user.groupIds, data.id],
              },
            }));
          }); */
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
      <Link to={`/question/`}></Link>
    </li>
  );
};

const QuestionGroupPage = (props) => {
  const { id } = useParams();
  const [userContext, setUserContext] = useContext(UserContext);
  const [inCreation, setInCreation] = useState(false);
  const [questions, setQuestions] = useState([]);

  return (
    <main className="questionGroupPage">
      {inCreation && <QuestionForm setInCreation={setInCreation} />}
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
