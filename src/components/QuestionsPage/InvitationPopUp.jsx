import { searchUser, newInvite } from "../../requests/requests";
import { useState, useRef } from "react";

import ButtonPrimary from "../styled/buttons/ButtonPrimary";
import ButtonSecondary from "../styled/buttons/ButtonSecondary";
import ButtonConfirm from "../styled/buttons/ButtonConfirm";

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
    <div className="invitationPopUpWrap">
      <div className="invitationPopUp form">
        <form className="search" onSubmit={handleSearch}>
          <input
            required
            ref={input}
            type="text"
            name="invitationName"
            id="invitationName"
            placeholder="exact fullname"
            autoFocus
          />
          <ButtonPrimary type="submit">Search</ButtonPrimary>
          <ButtonSecondary type="button" onClick={() => setInInvitation(false)}>
            Cancel
          </ButtonSecondary>
        </form>
        <ul className="searchResults">
          {searchResults.map((user) => (
            <li key={user.id} className="paper">
              <span className="resultName">{user.name}</span>{" "}
              <span className="resultCompany">{user.company}</span>
              <ButtonConfirm type="button" onClick={() => handleInvite(user)}>
                Invite
              </ButtonConfirm>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvitationPopUp;
