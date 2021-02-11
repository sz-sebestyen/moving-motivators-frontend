import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
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

  const [starterCards, setStarterCards] = useState();
  const [saveCards, setSaveCards] = useState();

  useEffect(() => console.log("question: ", question));

  const loadDefault = async () => {
    if (userContext.user.defaultCardListId) {
      const cardList = await getCardList(userContext.user.defaultCardListId);
      console.log("got card list: ", cardList);

      // TODO: set starterCards
    }
  };

  useEffect(() => {
    const que = questionsContext.find(
      (que) => que.id.toString() === questionId
    );
    setQuestion(que);

    // todo: load question.answerId if not null, default if null
    if (que.answerId !== null) {
      // load answer
    } else {
      loadDefault();
    }
  }, [userContext, questionsContext, groupId, questionId]);

  const Save = async () => {
    if (saveCards && question.id) {
      console.log("cards to be saved:", saveCards);
      const data = await setAnswer(question.id, saveCards);
      console.log("setAnswer answer:", data);
    }
    // TODO: save note as well
  };

  return (
    <main className="answerPage">
      <div className="answerMenu">
        <button type="button" onClick={Save}>
          Save
        </button>
        <button type="button">Finalize</button>
      </div>

      <h1 className="title">{question.value || ""}</h1>

      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />

      <div className="note">
        <textarea
          placeholder="save a note"
          disabled={question.closed}
          style={{ resize: "none" }}
        ></textarea>
      </div>
    </main>
  );
};

export default AnswerPage;
