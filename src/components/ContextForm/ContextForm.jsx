import style from "./ContextForm.module.css";

import React, { useContext, useState } from "react";

import { UserContext } from "../UserContext/UserContext";

import { Redirect } from "react-router-dom";

import axios from "axios";

/*     const register = {
      company: "Test Corp.",
      email: "test@corp.com",
      name: "Testy Testface",
      password: "test",
      roles: ["test"],
    }; */

const ContextForm = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [company, setCompany] = useState();
  const [position, setPosition] = useState();

  const [redirect, setRedirect] = useState(userContext.loggedIn);

  const postData = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    };
    const login = {
      email: "string",
      password: "string",
    };

    return axios
      .post(
        "https://cors-anywhere-herokuapp.com/https://codecool-moving-motivators.herokuapp.com/login/",
        login,
        config
      )
      .then((res) => {
        console.log(res.data);
        /* setToken(res.data.token);
        setLocalStorageSession(res.data.user.id);
        setLocalStorageUsername(res.data.user.username);
        setLocalStorageHobbies(res.data.user.fieldsOfInterests);
        setHobbies(res.data.user.fieldsOfInterests);
        setUsername(res.data.user.username);
        setSession(res.data.user.id); */
        //props.history.push("/");
      })
      .catch((error) => {
        alert("Wrong password or email!");
        console.log({ error });
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

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
      postData();

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
