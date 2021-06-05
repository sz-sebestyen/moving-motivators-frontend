import { newInvite } from "../../../requests";
import ButtonWithResponse from "../../../components/UI/buttons/ButtonWithResponse";

import styled from "styled-components";

const SearchResult = ({ user, currentGroup }) => {
  const inviteUser = async () => {
    const inviteAnswer = await newInvite(currentGroup, user.id);
    console.log("inviteAnswer", inviteAnswer);
  };

  return (
    <SearchReasultItem key={user.id} className="paper">
      <UserName>{user.name}</UserName>
      <Company>{user.company}</Company>
      <ButtonWithResponse variant="confirm" onClick={inviteUser}>
        Invite
      </ButtonWithResponse>
    </SearchReasultItem>
  );
};

export default SearchResult;

const UserName = styled.span`
  margin-right: auto;
`;

const Company = styled.span`
  color: lightgray;
`;

const SearchReasultItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 5px;
`;
