import style from "./Login.module.css";

import React, { useContext, useState } from "react";

import { UserContext } from "../UserContext/UserContext";

import { Redirect } from "react-router-dom";

import axios from "axios";

const Login = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [redirect, setRedirect] = useState(userContext.loggedIn);

  const handleSave = (event) => {
    if (email && password) {
      setUserContext((prev) => ({
        ...prev,
        loggedIn: true,
        email,
        password,
      }));

      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect push to="/" />;
  }

  return (
    <form className={style.loginForm}>
      <div className={style.email}>
        <label htmlFor="loginFormEmail">Email</label>
        <input
          type="email"
          name="loginFormEmail"
          id="loginFormEmail"
          onInput={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className={style.password}>
        <label htmlFor="loginFormPassword">Password</label>
        <input
          type="password"
          name="loginFormPassword"
          id="loginFormPassword"
          onInput={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className={style.submit}>
        <button type="button" onClick={handleSave}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
