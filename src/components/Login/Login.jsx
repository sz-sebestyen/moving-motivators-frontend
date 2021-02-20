import style from "./Login.module.scss";
import { Redirect } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";

import { UserContext, setToken, setUserId } from "../Context/Context";
import { login } from "../../requests/requests";

import ButtonConfirm from "../styles/buttons/ButtonConfirm";

/**
 * Login component renders a page where the user can
 * log in with a from.
 * @param {*} props
 */
const Login = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const [status, setStatus] = useState();

  const handleSave = async (event) => {
    event.preventDefault();
    const email = emailInput.current.value.trim();
    const password = passwordInput.current.value;

    if (email && password) {
      setStatus("loading");

      const data = await login({
        email,
        password,
      });

      if (data) {
        setStatus("done");

        setToken(data.token);
        setUserId(data.user.id);

        setUserContext((prev) => ({
          ...prev,
          loggedIn: true,
          user: data.user,
        }));
      } else {
        setStatus();
        passwordInput.current.setCustomValidity("Wrong password or email!");
        passwordInput.current.reportValidity();
      }
    }
  };

  const handleInput = (event) => {
    passwordInput.current.setCustomValidity("");
    return status === "done" && setStatus();
  };

  if (userContext.loggedIn) {
    return <Redirect push to="/" />;
  }

  return (
    <form className={style.loginForm + " form"} onSubmit={handleSave}>
      <div className={style.email}>
        <label htmlFor="loginFormEmail">Email</label>
        <input
          ref={emailInput}
          type="email"
          name="loginFormEmail"
          id="loginFormEmail"
          required
          onInput={handleInput}
          disabled={status}
        />
      </div>

      <div className={style.password}>
        <label htmlFor="loginFormPassword">Password</label>
        <input
          ref={passwordInput}
          type="password"
          name="loginFormPassword"
          id="loginFormPassword"
          required
          onInput={handleInput}
          disabled={status}
        />
      </div>

      <div className={style.submit}>
        <ButtonConfirm type="submit" state={status} disabled={status}>
          Login
        </ButtonConfirm>
      </div>
    </form>
  );
};

export default Login;
