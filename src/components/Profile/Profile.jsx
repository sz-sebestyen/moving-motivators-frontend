import React, { useContext, useRef, useState } from "react";
import { editUser } from "../requests/requests";
import { UserContext } from "../Context/Context";

import "./Profile.scss";

const Profile = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const company = useRef(null);
  const position = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await editUser({
      name: firstName.current.value + " " + lastName.current.value,
      company: company.current.value,
      position: position.current.value,
    });

    console.log("edit user response: ", response);
    if (response) {
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    }
  };

  return (
    <div className="profile">
      <form className="profileForm paper" onSubmit={handleSubmit}>
        <div className="firstName formField">
          <label htmlFor="FirstName">First name</label>
          <input
            ref={firstName}
            type="text"
            name="FirstName"
            id="FirstName"
            required
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
          />
        </div>

        <div className="submit formField">
          <button className="btn btnConfirm" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
