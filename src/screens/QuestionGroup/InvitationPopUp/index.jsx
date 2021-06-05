import { searchUser } from "../../../requests";
import { useState, useRef } from "react";

import SearchResult from "./SearchResult";

import styled from "styled-components";
import ButtonSecondary from "../../../components/UI/buttons/ButtonSecondary";
import PopUpWrap from "../../../components/UI/PopUpWrap";
import PopUpForm from "../../../components/UI/PopUpForm";
import ButtonWithResponse from "../../../components/UI/buttons/ButtonWithResponse";

/**
 * InvitationPopUp component renders a form and searchbar
 *  where the user can search for other users to invite to the group.
 */
const InvitationPopUp = ({ currentGroup, setInInvitation }) => {
  const input = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const searchUserName = async () => {
    const userName = input.current.value.trim();
    if (!userName) return;
    const searchAnswer = await searchUser(userName);
    console.log("searchAnswer:", searchAnswer);
    setSearchResults(searchAnswer);

    const isSearchSuccessful = searchAnswer.length !== 0;

    return isSearchSuccessful;
  };

  return (
    <PopUpWrap>
      <PopUpForm>
        <input
          required
          ref={input}
          type="text"
          name="invitedUserName"
          id="invitedUserName"
          placeholder="Exact Full Name"
          autoFocus
        />

        <ButtonWithResponse variant="confirm" onClick={searchUserName}>
          Search
        </ButtonWithResponse>
        <ButtonSecondary type="button" onClick={() => setInInvitation(false)}>
          Cancel
        </ButtonSecondary>

        <ResultList>
          {searchResults.map((user) => (
            <SearchResult {...{ user, currentGroup }} key={user.id} />
          ))}
        </ResultList>
      </PopUpForm>
    </PopUpWrap>
  );
};

const ResultList = styled.ul`
  list-style: none;
  flex-basis: 100%;
`;

export default InvitationPopUp;
