import { Link } from "react-router-dom";
import styled from "styled-components";
import { paper } from "../styled/css/paper";

const Group = (props) => {
  return (
    <StyledGroup>
      <StyledLink to={`/question-group/${props.group.id}`}>
        {`${/* props.group.id */ ""} ${props.group.value}`}
      </StyledLink>
    </StyledGroup>
  );
};

const StyledGroup = styled.li`
  flex-basis: 100%;
  padding: 6px 10px;
  ${paper}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default Group;
