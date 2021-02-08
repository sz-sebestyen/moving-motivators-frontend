import style from "./Login.module.css";
import { Redirect } from "react-router-dom";
import React, { useContext, useState, useRef } from "react";

import { UserContext, setToken, setUserId } from "../UserContext/UserContext";
import { login } from "../requests/requests";

const Login = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const [redirect, setRedirect] = useState(userContext.loggedIn);

  const handleSave = (event) => {
    // TODO: login
    if (emailInput.current.value && passwordInput.current.value) {
      login({
        email: emailInput.current.value,
        password: passwordInput.current.value,
      }).then((data) => {
        if (data) {
          setUserContext((prev) => ({
            ...prev,
            loggedIn: true,
            user: data.user,
            roles: data.roles,
            email: emailInput.current.value,
          }));

          console.log(data);

          setToken(data.token);
          setUserId(data.user.id);

          setRedirect(true);
        }
      });
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
        <button type="button" onClick={handleSave}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
