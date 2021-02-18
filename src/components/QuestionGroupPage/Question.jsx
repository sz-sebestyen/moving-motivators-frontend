import { Link } from "react-router-dom";

const Question = (props) => {
  const date = new Date(props.question.date);
  return (
    <li className="question paper">
      <Link to={`/question/${props.groupId}/${props.question.id}`}>
        {props.question.value}
      </Link>
      <span className="questionDate">{`${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`}</span>
    </li>
  );
};

export default Question;
