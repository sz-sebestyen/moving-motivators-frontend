import { useParams } from "react-router-dom";
import { useContext } from "react";
import { QuestionsContext } from "../Context/Context";

const AnswerPage = (props) => {
  const { groupId, questionId } = useParams();
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);
  return <div className="answerPage">{`${groupId} ${questionId}`}</div>;
};

export default AnswerPage;
