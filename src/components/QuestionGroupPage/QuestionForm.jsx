import { createQuestion, searchUser, newInvite } from "../requests/requests";
import { useState, useContext, useRef, useEffect } from "react";
import {
  UserContext,
  GroupsContext,
  QuestionsContext,
} from "../Context/Context";

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
        className="questionForm form"
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
          autoFocus
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

export default QuestionForm;
