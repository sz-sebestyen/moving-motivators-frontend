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

const AnswerPage = (props) => {
  const { groupId, questionId } = useParams();
  const [userContext, setUserContext] = useContext(UserContext);
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  const [question, setQuestion] = useState({});
  const note = useRef(null);

  const [starterCards, setStarterCards] = useState();
  const [saveCards, setSaveCards] = useState();

  useEffect(() => console.log("question: ", question));

  const loadDefault = async () => {
    if (userContext.user.defaultCardListId) {
      const cardList = await getCardList(userContext.user.defaultCardListId);
      console.log("got card list: ", cardList);

      // TODO: set starterCards  BLOCKED
      //setStarterCards(cardList);
    }
  };

  const loadPrevAnswer = async (que) => {
    const cardList = await getCardList(que.answerId);
    console.log("prevAnswerCardList: ", cardList);
    setStarterCards(cardList);
  };

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

  const Close = async () => {
    if (!question) return;
    const closeAnswre = await closeQuestion(question.id);
    console.log("closeAnswer:", closeAnswre);
    setUserContext((prev) => ({ ...prev, dataLoaded: false }));
  };

  return (
    <main className="answerPage">
      <div className="answerMenu">
        <button type="button" onClick={Save} disabled={question.closed}>
          Save
        </button>
        <button type="button" onClick={Close} disabled={question.closed}>
          Finalize
        </button>
      </div>

      <h1 className="title">{question.value || ""}</h1>

      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />

      <div className="note">
        <textarea
          ref={note}
          defaultValue={question.note}
          placeholder="save a note"
          disabled={question.closed}
          style={{ resize: "none" }}
        ></textarea>
      </div>
    </main>
  );
};

export default AnswerPage;
