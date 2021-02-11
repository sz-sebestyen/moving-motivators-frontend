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

  useEffect(() => {
    setQuestion(
      questionsContext.find((que) => que.id.toString() === questionId)
    );
  }, [questionsContext, groupId, questionId]);

  /* 		questionsContext[groupId].find((question) => question.id === questionId)
			.value */

  const loadCardList = async () => {
    if (userContext.user.defaultCardListId) {
      const cardList = await getCardList(userContext.user.defaultCardListId);
      console.log("got card list: ", cardList);

      // TODO: set starterCards
    }
  };

  useEffect(() => {
    loadCardList();
  }, [userContext]);

  const Save = async () => {
    if (saveCards) {
      /* 					console.log("cards to be saved:", saveCards);
					const data = await saveDefault(saveCards); // not default
					console.log("saveDefaultCards answer:", data); */
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
        <textarea placeholder="save a note"></textarea>
      </div>
    </main>
  );
};

export default AnswerPage;
