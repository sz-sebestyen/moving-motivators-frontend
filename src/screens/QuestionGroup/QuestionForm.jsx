import { createQuestion } from "../../requests";
import { useContext, useRef } from "react";
import { QuestionsContext } from "../../context";

import ButtonSecondary from "../../components/UI/buttons/ButtonSecondary";
import PopUpWrap from "../../components/UI/PopUpWrap";
import PopUpForm from "../../components/UI/PopUpForm";
import ButtonWithResponse from "../../components/UI/buttons/ButtonWithResponse";

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

  const submitNewQuestion = async () => {
    // TODO: store input value in state, and disable Create button when input is empty
    const newQuestionTitle = input.current.value.trim();
    if (!newQuestionTitle) return false;

    const newQuestion = await createQuestion({
      groupId: props.groupId,
      value: newQuestionTitle,
    });

    console.log("newQuestion: ", newQuestion);

    if (newQuestion) {
      //props.setInCreation(false);
      setQuestionsContext((prev) => [...prev, newQuestion]);
      return true;
    }
  };

  return (
    <PopUpWrap>
      <PopUpForm>
        <input
          ref={input}
          type="text"
          name="newQuestionName"
          id="newQuestionName"
          placeholder="New Question"
          required
          autoFocus
        />

        <ButtonWithResponse variant="confirm" onClick={submitNewQuestion}>
          Create
        </ButtonWithResponse>

        <ButtonSecondary
          type="button"
          onClick={() => props.setInCreation(false)}
        >
          Cancel
        </ButtonSecondary>
      </PopUpForm>
    </PopUpWrap>
  );
};

export default QuestionForm;
