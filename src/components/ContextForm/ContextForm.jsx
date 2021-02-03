import style from "./ContextForm.module.css";

import React, { useContext, useState } from "react";

import { UserContext } from "../UserContext/UserContext";

import { Redirect } from "react-router-dom";

const ContextForm = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [company, setCompany] = useState();
  const [position, setPosition] = useState();

  const [redirect, setRedirect] = useState(userContext.loggedIn);

  const handleSave = (event) => {
    if (firstName && lastName && company && position) {
      setUserContext((prev) => ({
        ...prev,
        loggedIn: true,

        firstName,
        lastName,
        company,
        position,
      }));
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect push to="/" />;
  }

  return (
    <form className={style.contextForm}>
      <div className={style.firstName}>
        <label htmlFor="contextFormFirstName">First name</label>
        <input
          type="text"
          name="contextFormFirstName"
          id="contextFormFirstName"
          onInput={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div className={style.lastName}>
        <label htmlFor="contextFormLastName">Last name</label>
        <input
          type="text"
          name="contextFormLastName"
          id="contextFormLastName"
          onInput={(event) => setLastName(event.target.value)}
        />
      </div>
      <div className={style.company}>
        <label htmlFor="contextFormCompany">Company</label>
        <input
          type="text"
          name="contextFormCompany"
          id="contextFormCompany"
          onInput={(event) => setCompany(event.target.value)}
        />
      </div>
      <div className={style.position}>
        <label htmlFor="contextFormPosition">Position</label>
        <input
          type="text"
          name="contextFormPosition"
          id="contextFormPosition"
          onInput={(event) => setPosition(event.target.value)}
        />
      </div>
      <div className={style.submit}>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ContextForm;
