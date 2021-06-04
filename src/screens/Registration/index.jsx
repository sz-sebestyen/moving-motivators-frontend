import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../requests";

import Form from "../../components/UI/Form/Form";
import ButtonWithResponse from "../../components/UI/buttons/ButtonWithResponse";

/**
 * Registration component renders a page where the user can register.
 * After successful registration the user is redirected to the login
 * page.
 *
 * @param {*} props
 */
const Registration = (props) => {
  const [userContext /* , setUserContext */] = useContext(UserContext);

  const [toLogin, setToLogin] = useState(false);

  const [isBusy, setIsBusy] = useState(false);

  const name = useRef(null);
  const email = useRef(null);
  const company = useRef(null);
  const position = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
    // TODO: refactor to be more dry
    const userInfo = {
      name: name.current.value.trim(),
      email: email.current.value.trim(),
      company: company.current.value.trim(),
      position: position.current.value.trim(),
      password: password.current.value.trim(),
    };

    // TODO: check for empty inputs, and alert user

    if (Object.values(userInfo).find((value) => value === "") === "") return;

    setIsBusy(true);

    const response = await registerUser(userInfo);

    console.log("register response: ", response);

    setIsBusy(false);

    if (response) {
      setToLogin(true);
    }
  };

  if (toLogin) {
    return <Redirect push to="/login" />;
  }

  if (userContext.loggedIn) {
    return <Redirect push to="/" />;
  }

  return (
    <Form>
      <div>
        <label htmlFor="Name">Name</label>
        <input
          ref={name}
          type="text"
          name="Name"
          id="Name"
          required
          disabled={isBusy}
        />
      </div>

      <div>
        <label htmlFor="Email">Email</label>
        <input
          ref={email}
          type="email"
          name="Email"
          id="Email"
          required
          disabled={isBusy}
        />
      </div>

      <div>
        <label htmlFor="Company">Company</label>
        <input
          ref={company}
          type="text"
          name="Company"
          id="Company"
          required
          disabled={isBusy}
        />
      </div>
      <div>
        <label htmlFor="Position">Position</label>
        <input
          ref={position}
          type="text"
          name="Position"
          id="Position"
          required
          disabled={isBusy}
        />
      </div>

      <div>
        <label htmlFor="Password">Password</label>
        <input
          ref={password}
          type="password"
          name="Password"
          id="Password"
          required
          disabled={isBusy}
        />
      </div>

      <div>
        <ButtonWithResponse variant="confirm" onClick={handleSubmit}>
          Register
        </ButtonWithResponse>
      </div>
    </Form>
  );
};

export default Registration;
