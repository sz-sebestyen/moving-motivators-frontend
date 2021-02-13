import { createQuestion, searchUser, newInvite } from "../requests/requests";
import { useParams } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import {
  UserContext,
  GroupsContext,
  QuestionsContext,
} from "../Context/Context";
import { Link } from "react-router-dom";

import "./QuestionGroupPage.scss";

/**
 * InvitationPopUP component is responsible for rendering a form and search
 *  bar where the use can search for other users to invite to the group.
 */
const InvitationPopUp = (props) => {
  const input = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchAnswer = await searchUser(input.current.value);
    console.log("searchAnswer:", searchAnswer);
    setSearchResults(searchAnswer);
  };

  const handleInvite = async (user) => {
    // TODO: invite user
    const inviteAnswer = await newInvite(props.currentGroup, user.id);
    console.log("inviteAnswer", inviteAnswer);
  };

  return (
    <div className="invitationPopUpWrap">
      <div className="invitationPopUp paper">
        <form className="search" onSubmit={handleSearch}>
          <input
            required
            ref={input}
            type="text"
            name="invitationName"
            id="invitationName"
            placeholder="exact fullname"
          />
          <button className="btn btnConfirm" type="submit">
            Search
          </button>
          <button
            className="btn btnSecondary"
            type="button"
            onClick={() => props.setInInvitation(false)}
          >
            Cancel
          </button>
        </form>
        <ul className="searchResults">
          {searchResults.map((user) => (
            <li key={user.id} className="paper">
              <span className="resultName">{user.name}</span>{" "}
              <span className="resultCompany">{user.company}</span>
              <button
                className="btn btnConfirm"
                type="button"
                onClick={() => handleInvite(user)}
              >
                Invite
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * QuestionForm component is responsible for rendering a form which the user can
 * use to add new questions to the group.
 *
 * @param {*} props
 */
const QuestionForm = (props) => {
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const input = useRef(null);

  return (
    <div className="questionFormWrap">
      <form
        className="questionForm paper"
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
        <button className="btn btnConfirm" type="submit">
          Create
        </button>
        <button
          className="btn btnSecondary"
          type="button"
          onClick={() => props.setInCreation(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const Question = (props) => {
  const date = new Date(props.question.date);
  return (
    <li className="question paper">
      <Link to={`/question/${props.groupId}/${props.question.id}`}>
        {props.question.value}
      </Link>
      <span className="questionDate">{`${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`}</span>
    </li>
  );
};

/**
 * QuestionGroupPage is responsible for rendering a page where the user
 * can view their questions in a question group. They can also delete
 * the group, and a new question or invite another user to the group.
 *
 * @param {*} props
 */
const QuestionGroupPage = (props) => {
  const { id } = useParams();
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const [groupsContext, setGroupsContext] = useContext(GroupsContext);
  const [userContext, setUserContext] = useContext(UserContext);
  const [inCreation, setInCreation] = useState(false);
  const [inInvitation, setInInvitation] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(() =>
      questionsContext
        .sort((a, b) => b.id - a.id)
        .filter((que) => que.groupId.toString() === id)
    );
  }, [questionsContext, id]);

  const currentGroup = groupsContext.find(
    (group) => group.id.toString() === id
  );

  return (
    <main className="questionsPage">
      {inCreation && (
        <QuestionForm setInCreation={setInCreation} groupId={id} />
      )}
      {inInvitation && (
        <InvitationPopUp
          setInInvitation={setInInvitation}
          currentGroup={currentGroup}
        />
      )}

      {/* only visible for owner */}
      {currentGroup && currentGroup.ownerId === userContext.user.id && (
        <div className="questionsMenu">
          <button
            type="button"
            className="btn"
            onClick={() => setInCreation(true)}
          >
            Add question
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => setInInvitation(true)}
          >
            Invite member
          </button>
          <button className="btn btnDelete" type="button">
            Delete group
          </button>
        </div>
      )}

      <h1 className="groupTitle">{currentGroup && currentGroup.value}</h1>

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
