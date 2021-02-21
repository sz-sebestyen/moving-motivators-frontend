import React, { useContext, useRef, useState } from "react";
import { editUser } from "../../requests/requests";
import { UserContext } from "../Context/Context";

import "./Profile.scss";

import ButtonConfirm from "../styled/buttons/ButtonConfirm";

/**
 * Profile isresponsible for rendering a page where the user can
 * update their user information.
 *
 * @param {*} props
 */
const Profile = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const company = useRef(null);
  const position = useRef(null);

  const [status, setStatus] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    const response = await editUser({
      name: firstName.current.value + " " + lastName.current.value,
      company: company.current.value,
      position: position.current.value,
    });

    console.log("edit user response: ", response);
    if (response) {
      setStatus("done");
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    } else {
      setStatus();
    }
  };

  const handleInput = (event) => {
    return status === "done" && setStatus();
  };

  return (
    <div className="profile">
      <form className="profileForm form" onSubmit={handleSubmit}>
        <div className="firstName formField">
          <label htmlFor="FirstName">First name</label>
          <input
            ref={firstName}
            type="text"
            name="FirstName"
            id="FirstName"
            required
            onInput={handleInput}
            disabled={status}
          />
        </div>

        <div className="lastName formField">
          <label htmlFor="LastName">Last name</label>
          <input
            ref={lastName}
            type="text"
            name="LastName"
            id="LastName"
            required
            onInput={handleInput}
            disabled={status}
          />
        </div>

        <div className="company formField">
          <label htmlFor="Company">Company</label>
          <input
            ref={company}
            type="text"
            name="Company"
            id="Company"
            required
            onInput={handleInput}
            disabled={status}
          />
        </div>
        <div className="position formField">
          <label htmlFor="Position">Position</label>
          <input
            ref={position}
            type="text"
            name="Position"
            id="Position"
            required
            onInput={handleInput}
            disabled={status}
          />
        </div>

        <div className="submit formField">
          <ButtonConfirm
            type="submit"
            title="Save changes"
            state={status}
            disabled={status}
          >
            Save
          </ButtonConfirm>
        </div>
      </form>
    </div>
  );
};

export default Profile;
