import { createQuestion } from "../../requests/requests";
import { useContext, useRef, useState } from "react";
import { QuestionsContext } from "../Context/Context";

import ButtonSecondary from "../styled/buttons/ButtonSecondary";
import ButtonConfirm from "../styled/buttons/ButtonConfirm";
import PopUpWrap from "../styled/PopUpWrap";
import PopUpForm from "../styled/PopUpForm";

/**
 * QuestionForm component is responsible for rendering a form which the user can
 * use to add new questions to the group.
 *
 * @param {*} props
 */
const QuestionForm = (props) => {
  const [, /* questionsContext */ setQuestionsContext] =
    useContext(QuestionsContext);
  const input = useRef(null);

  const [status, setStatus] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    const newQuestion = await createQuestion({
      groupId: props.groupId,
      value: input.current.value,
    });

    console.log("newQuestion: ", newQuestion);

    if (newQuestion) {
      setStatus("done");
      //props.setInCreation(false);
      setQuestionsContext((prev) => [...prev, newQuestion]);
    } else {
      setStatus();
    }
  };

  const handleInput = (event) => {
    return status === "done" && setStatus();
  };

  return (
    <PopUpWrap>
      <PopUpForm onSubmit={handleSubmit}>
        <input
          ref={input}
          type="text"
          name="newQuestionName"
          id="newQuestionName"
          placeholder="New question"
          required
          autoFocus
          onInput={handleInput}
          disabled={status === "loading"}
        />
        <ButtonConfirm type="submit" state={status} disabled={status}>
          Create
        </ButtonConfirm>
        <ButtonSecondary
          type="button"
          onClick={() => props.setInCreation(false)}
          disabled={status === "loading"}
        >
          Cancel
        </ButtonSecondary>
      </PopUpForm>
    </PopUpWrap>
  );
};

export default QuestionForm;