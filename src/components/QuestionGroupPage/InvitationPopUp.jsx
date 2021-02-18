import { createQuestion, searchUser, newInvite } from "../requests/requests";
import { useState, useContext, useRef, useEffect } from "react";

/**
 * InvitationPopUP component is responsible for rendering a form and search
 *  bar where the use can search for other users to invite to the group.
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
    // TODO: invite user
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
          <button className="btn btnConfirm" type="submit">
            Search
          </button>
          <button
            className="btn btnSecondary"
            type="button"
            onClick={() => setInInvitation(false)}
          >
            Cancel
          </button>
        </form>
        <ul className="searchResults">
          {searchResults.map((user) => (
            <li key={user.id} className="paper">
              <span className="resultName">{user.name}</span>{" "}
              <span className="resultCompany">{user.company}</span>
              <button
                className="btn btnConfirm"
                type="button"
                onClick={() => handleInvite(user)}
              >
                Invite
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvitationPopUp;
