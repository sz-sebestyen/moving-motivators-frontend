import style from "./Login.module.scss";
import { Redirect } from "react-router-dom";
import React, { useContext, useState, useRef } from "react";

import { UserContext, setToken, setUserId } from "../Context/Context";
import { login, getUser } from "../requests/requests";

/**
 * Logincomponent is responsible for rendering a page where the user can
 * log in with a from.
 * @param {*} props
 */
const Login = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleSave = async (event) => {
    if (emailInput.current.value && passwordInput.current.value) {
      const data = await login({
        email: emailInput.current.value,
        password: passwordInput.current.value,
      });

      if (data) {
        setToken(data.token);
        setUserId(data.user.id);

        setUserContext((prev) => ({
          ...prev,
          loggedIn: true,
          user: data.user,
        }));
      }
    }
  };

  if (userContext.loggedIn) {
    return <Redirect push to="/" />;
  }

  return (
    <form className={style.loginForm + " form"}>
      <div className={style.email}>
        <label htmlFor="loginFormEmail">Email</label>
        <input
          ref={emailInput}
          type="email"
          name="loginFormEmail"
          id="loginFormEmail"
        />
      </div>
      <div className={style.password}>
        <label htmlFor="loginFormPassword">Password</label>
        <input
          ref={passwordInput}
          type="password"
          name="loginFormPassword"
          id="loginFormPassword"
        />
      </div>
      <div className={style.submit}>
        <button className="btn" type="button" onClick={handleSave}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
