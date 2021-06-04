import { Link } from "react-router-dom";
import styled from "styled-components";
import { paper } from "../../components/UI/css/paper";

const Question = (props) => {
  const date = new Date(props.question.date);
  return (
    <StyledQuestion>
      <StyledLink to={`/question/${props.groupId}/${props.question.id}`}>
        {props.question.value}
      </StyledLink>
      <span className="questionDate">{`${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`}</span>
    </StyledQuestion>
  );
};

const StyledQuestion = styled.li`
  flex-basis: 100%;
  padding: 6px 10px;
  ${paper}
  cursor: default;
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default Question;
