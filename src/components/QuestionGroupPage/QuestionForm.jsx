import { createQuestion } from "../../requests/requests";
import { useContext, useRef } from "react";
import { QuestionsContext } from "../Context/Context";

import ButtonSecondary from "../styles/buttons/ButtonSecondary";
import ButtonConfirm from "../styles/buttons/ButtonConfirm";

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
          placeholder="New question"
          required
          autoFocus
        />
        <ButtonConfirm type="submit">Create</ButtonConfirm>
        <ButtonSecondary
          type="button"
          onClick={() => props.setInCreation(false)}
        >
          Cancel
        </ButtonSecondary>
      </form>
    </div>
  );
};

export default QuestionForm;
