import { searchUser, newInvite } from "../../requests";
import { useState, useRef } from "react";

import styled from "styled-components";
import ButtonPrimary from "../UI/buttons/ButtonPrimary";
import ButtonSecondary from "../UI/buttons/ButtonSecondary";
import PopUpWrap from "../UI/PopUpWrap";
import PopUpForm from "../UI/PopUpForm";
import ButtonWithResponse from "../UI/buttons/ButtonWithResponse";

/**
 * InvitationPopUp component renders a form and searchbar
 *  where the user can search for other users to invite to the group.
 */
const InvitationPopUp = (props) => {
  const { currentGroup, setInInvitation } = props;
  const input = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchAnswer = await searchUser(input.current.value);
    console.log("searchAnswer:", searchAnswer);
    setSearchResults(searchAnswer);
  };

  const handleInvite = async (user) => {
    const inviteAnswer = await newInvite(currentGroup, user.id);
    console.log("inviteAnswer", inviteAnswer);
  };

  return (
    <PopUpWrap>
      <PopUpForm onSubmit={handleSearch}>
        <input
          required
          ref={input}
          type="text"
          name="invitationName"
          id="invitationName"
          placeholder="Exact Full Name"
          autoFocus
        />
        <ButtonPrimary type="submit">Search</ButtonPrimary>
        <ButtonSecondary type="button" onClick={() => setInInvitation(false)}>
          Cancel
        </ButtonSecondary>

        <ResultList>
          {searchResults.map((user) => (
            <li key={user.id} className="paper">
              <span className="resultName">{user.name}</span>{" "}
              <span className="resultCompany">{user.company}</span>
              <ButtonWithResponse
                variant="confirm"
                onClick={async () => await handleInvite(user)}
              >
                Invite
              </ButtonWithResponse>
            </li>
          ))}
        </ResultList>
      </PopUpForm>
    </PopUpWrap>
  );
};

const ResultList = styled.ul`
  list-style: none;
  flex-basis: 100%;

  li {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 2px 5px;

    .resultCompany {
      color: lightgray;
    }

    span:first-child {
      margin-right: auto;
    }
  }
`;

export default InvitationPopUp;
