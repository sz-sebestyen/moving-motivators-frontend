import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { QuestionsContext, UserContext } from "../Context/Context";
import MMBoard from "../MMBoard/MMBoard";
import {
  getCardList,
  setAnswer,
  closeQuestion,
  editNote,
} from "../requests/requests";

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
  const { groupId, questionId } = useParams();
  const [userContext, setUserContext] = useContext(UserContext);
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const [question, setQuestion] = useState({});
  const note = useRef(null);

  const [starterCards, setStarterCards] = useState();
  const [saveCards, setSaveCards] = useState();

  useEffect(() => console.log("question: ", question));

  /**
   * Fetches the defalut card order previously save by the user.
   */
  const loadDefault = async () => {
    if (userContext.user.defaultCardListId) {
      const cardList = await getCardList(userContext.user.defaultCardListId);
      console.log("got card list: ", cardList);
      setStarterCards(cardList);
    }
  };

  /**
   * Fetches an already saved answer.
   * @param {*} que
   */
  const loadPrevAnswer = async (que) => {
    const cardList = await getCardList(que.answerId);
    console.log("prevAnswerCardList: ", cardList);
    setStarterCards(cardList);
  };

  /**
   * Sets the question to be displayed.
   */
  useEffect(() => {
    const que = questionsContext.find(
      (que) => que.id.toString() === questionId
    );
    setQuestion(que);

    if (que && que.answerId !== null) {
      loadPrevAnswer(que);
    } else {
      loadDefault();
    }
  }, [userContext, questionsContext, groupId, questionId]);

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

      {starterCards && (
        <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />
      )}

      {starterCards && (
        <div className="note">
          <textarea
            ref={note}
            defaultValue={question && question.note}
            placeholder="save a note"
            disabled={question ? question.closed : question}
            style={{ resize: "none" }}
          ></textarea>
        </div>
      )}
    </main>
  );
};

export default AnswerPage;
