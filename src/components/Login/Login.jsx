import { Redirect } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";

import { UserContext, setToken, setUserId } from "../Context/Context";
import { login } from "../../requests/requests";

import Form from "../styled/Form/Form";
import ButtonWithResponse from "../styled/buttons/ButtonWithResponse";

/**
 * Login component renders a page where the user can
 * log in with a from.
 * @param {*} props
 */
const Login = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const passwordInput = useRef(null);

  const [isBusy, setIsBusy] = useState(false);
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const handleSave = async (event) => {
    const email = emailState.trim();
    const password = passwordState.trim();

    if (email && password) {
      setIsBusy(true);

      const data = await login({
        email,
        password,
      });

      if (data) {
        setToken(data.token);
        setUserId(data.user.id);

        setUserContext((prev) => ({
          ...prev,
          loggedIn: true,
          user: data.user,
        }));
      } else {
        setIsBusy(false);
        passwordInput.current.setCustomValidity("Wrong password or email!");
        passwordInput.current.reportValidity();
      }
    }
  };

  const handleEmail = (event) => {
    passwordInput.current.setCustomValidity("");
    setEmailState(event.target.value);
  };

  const handlePassword = (event) => {
    passwordInput.current.setCustomValidity("");

    setPasswordState(event.target.value);
  };

  if (userContext.loggedIn) {
    return <Redirect push to="/" />;
  }

  return (
    <Form>
      <div>
        <label htmlFor="loginFormEmail">Email</label>
        <input
          type="email"
          name="loginFormEmail"
          id="loginFormEmail"
          required
          onChange={handleEmail}
          disabled={isBusy}
          value={emailState}
        />
      </div>

      <div>
        <label htmlFor="loginFormPassword">Password</label>
        <input
          ref={passwordInput}
          type="password"
          name="loginFormPassword"
          id="loginFormPassword"
          required
          onChange={handlePassword}
          disabled={isBusy}
          value={passwordState}
        />
      </div>

      <div>
        <ButtonWithResponse variant="confirm" onClick={handleSave}>
          Login
        </ButtonWithResponse>
      </div>
    </Form>
  );
};

export default Login;
