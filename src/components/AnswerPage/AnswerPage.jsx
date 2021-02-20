import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { QuestionsContext, UserContext } from "../Context/Context";
import MMBoard from "../MMBoard/MMBoard";
import { setAnswer, closeQuestion, editNote } from "../../requests/requests";
import useCards from "../../hooks/useCards";

import "./AnswerPage.scss";

import ButtonConfirm from "../styles/buttons/ButtonConfirm";
import ButtonDecline from "../styles/buttons/ButtonDecline";

/**
 * AnswerPage component is responsible for redering a page where the user can
 * arrange their cards and set a note to a question in a question group.
 *
 * @param {*} props
 */
const AnswerPage = (props) => {
  const { /* groupId, */ questionId } = useParams();
  const [userContext, setUserContext] = useContext(UserContext);
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const [question, setQuestion] = useState(
    questionsContext.find((que) => que.id.toString() === questionId)
  );
  const note = useRef(null);
  const [saveCards, setSaveCards] = useState();

  const defaultCards = useCards(userContext.user.defaultCardListId);
  const previousCards = useCards(question && question.answerId);

  useEffect(() => console.log("question: ", question));

  const Save = async () => {
    if (!question) return;
    if (saveCards) {
      console.log("cards to be saved:", saveCards);
      const setAnsAnswer = await setAnswer(question.id, saveCards);
      console.log("setAnswer answer:", setAnsAnswer);
    }

    if (note.current.value !== "") {
      const noteAnswer = await editNote(question.id, note.current.value);
      console.log("noteAnswer:", noteAnswer);
    }
    setUserContext((prev) => ({ ...prev, dataLoaded: false }));
  };

  /**
   * Finalize the answer to the question. It will no longer be editable.
   */
  const Close = async () => {
    if (!question) return;
    const closeAnswre = await closeQuestion(question.id);
    console.log("closeAnswer:", closeAnswre);
    setUserContext((prev) => ({ ...prev, dataLoaded: false }));
  };

  return (
    <main className="answerPage">
      <div className="answerMenu">
        <ButtonConfirm
          type="button"
          onClick={Save}
          disabled={question ? question.closed : question}
        >
          Save
        </ButtonConfirm>

        <ButtonDecline
          type="button"
          onClick={Close}
          disabled={question ? question.closed : question}
        >
          Finalize
        </ButtonDecline>
      </div>

      <h1 className="title">{question ? question.value : ""}</h1>

      <MMBoard
        starterCards={previousCards || defaultCards}
        setSaveCards={setSaveCards}
      />

      <div className="note">
        <textarea
          ref={note}
          defaultValue={question && question.note}
          placeholder="save a note"
          disabled={question ? question.closed : question}
          style={{ resize: "none" }}
        ></textarea>
      </div>
    </main>
  );
};

export default AnswerPage;
