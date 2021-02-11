import { createQuestion } from "../requests/requests";
import { useParams } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import {
  UserContext,
  GroupsContext,
  QuestionsContext,
} from "../Context/Context";
import { Link } from "react-router-dom";

import "./QuestionGroupPage.scss";

const InvitationPopUp = (props) => {
  return (
    <div className="invitationPopUpWrap">
      <div className="invitationPopUp">
        <div className="search">
          <input
            type="text"
            name="invitationName"
            id="invitationName"
            placeholder="full name"
          />
          <button type="button">Search</button>
          <button type="button" onClick={() => props.setInInvitation(false)}>
            Cancel
          </button>
        </div>
        <div className="searchResults"></div>
      </div>
    </div>
  );
};

const QuestionForm = (props) => {
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const input = useRef(null);

  return (
    <div className="questionFormWrap">
      <form
        className="questionForm"
        onSubmit={async (event) => {
          event.preventDefault();
          props.setInCreation(false);
          const newQuestion = await createQuestion({
            groupId: props.groupId,
            value: input.current.value,
          });
          console.log("newQuestion: ", newQuestion);
          if (newQuestion) {
            setQuestionsContext((prev) => [...prev, newQuestion]);
          }
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
  const date = new Date(props.question.date);
  return (
    <li className="question">
      <Link to={`/question/${props.groupId}/${props.question.id}`}>
        {props.question.value}
      </Link>
      <span className="questionDate">{`${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`}</span>
    </li>
  );
};

const QuestionGroupPage = (props) => {
  const { id } = useParams();
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const [groupsContext, setGroupsContext] = useContext(GroupsContext);
  const [inCreation, setInCreation] = useState(false);
  const [inInvitation, setInInvitation] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(() =>
      questionsContext.filter((que) => que.groupId.toString() === id)
    );
  }, [questionsContext, id]);

  return (
    <main className="questionsPage">
      {inCreation && (
        <QuestionForm setInCreation={setInCreation} groupId={id} />
      )}
      {inInvitation && <InvitationPopUp setInInvitation={setInInvitation} />}
      <div className="questionsMenu">
        <button
          type="button"
          className="createQuestion"
          onClick={() => setInCreation(true)}
        >
          Add question
        </button>
        <button type="button" onClick={() => setInInvitation(true)}>
          Invite member
        </button>
        <button type="button">Delete group</button>
      </div>
      <h1 className="groupTitle">
        {groupsContext.find((group) => group.id.toString() === id).value}
      </h1>
      <ul className="allQuestions">
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            groupId={id}
          ></Question>
        ))}
      </ul>
    </main>
  );
};

export default QuestionGroupPage;
