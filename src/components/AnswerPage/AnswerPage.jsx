import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { QuestionsContext, UserContext } from "../Context/Context";
import {
  getCardList,
  setAnswer,
  closeQuestion,
  editNote,
} from "../requests/requests";

import MMBoard from "../MMBoard/MMBoard";

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
      questionsContext[groupId].find((que) => que.id.toString() === questionId)
    );
  }, [questionsContext, groupId, questionId]);

  console.log("group:", questionsContext[groupId]);

  console.log(
    questionsContext[groupId].find((que) => que.id.toString() === questionId)
      .value
  );
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
      <MMBoard starterCards={starterCards} setSaveCards={setSaveCards} />
      <textarea placeholder="save a note"></textarea>
    </main>
  );
};

export default AnswerPage;
