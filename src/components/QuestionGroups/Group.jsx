import { Link } from "react-router-dom";

const Group = (props) => {
  return (
    <li className="group paper">
      <Link to={`/question-group/${props.group.id}`}>
        {`${/* props.group.id */ ""} ${props.group.value}`}
      </Link>
    </li>
  );
};

export default Group;
