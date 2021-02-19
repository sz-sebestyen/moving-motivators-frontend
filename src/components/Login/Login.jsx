import style from "./Login.module.scss";
import { Redirect } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";

import { UserContext, setToken, setUserId } from "../Context/Context";
import { login } from "../requests/requests";

import ButtonConfirm from "../styles/buttons/ButtonConfirm";

/**
 * Logincomponent is responsible for rendering a page where the user can
 * log in with a from.
 * @param {*} props
 */
const Login = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const [status, setStatus] = useState();

  const handleSave = async (event) => {
    if (emailInput.current.value && passwordInput.current.value) {
      setStatus("loading");

      const data = await login({
        email: emailInput.current.value,
        password: passwordInput.current.value,
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
        <ButtonConfirm
          type="button"
          onClick={handleSave}
          state={status}
          onDone="success"
          disabled={status}
        >
          Login
        </ButtonConfirm>
      </div>
    </form>
  );
};

export default Login;
