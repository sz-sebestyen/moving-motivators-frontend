import style from "./ContextForm.module.css";

import React, { useContext } from "react";

import { UserContext } from "../UserContext/UserContext";

const ContextForm = (props) => {
  const user = useContext(UserContext);

  return (
    <form className={style.contextForm}>
      <div className={style.firstName}>
        <label htmlFor="contextFormFirstName">First name</label>
        <input
          type="text"
          name="contextFormFirstName"
          id="contextFormFirstName"
        />
      </div>
      <div className={style.lastName}>
        <label htmlFor="contextFormLastName">Last name</label>
        <input
          type="text"
          name="contextFormLastName"
          id="contextFormLastName"
        />
      </div>
      <div className={style.company}>
        <label htmlFor="contextFormCompany">Company</label>
        <input type="text" name="contextFormCompany" id="contextFormCompany" />
      </div>
      <div className={style.position}>
        <label htmlFor="contextFormPosition">Position</label>
        <input
          type="text"
          name="contextFormPosition"
          id="contextFormPosition"
        />
      </div>
      <div className={style.submit}>
        <button type="button" onClick={() => user.logIn()}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ContextForm;
