import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/Context";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../requests/requests";

import Form from "../styled/Form/Form";

import ButtonConfirm from "../styled/buttons/ButtonConfirm";

/**
 * Registration component renders a page where the user can register.
 * After successful registration the user is redirected to the login
 * page.
 *
 * @param {*} props
 */
const Registration = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [toLogin, setToLogin] = useState(false);

  const [status, setStatus] = useState();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const company = useRef(null);
  const position = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    const response = await registerUser({
      name: firstName.current.value + " " + lastName.current.value,
      email: email.current.value,
      company: company.current.value,
      position: position.current.value,
      password: password.current.value,
    });

    console.log("register response: ", response);

    if (response) {
      setStatus("done");
      setToLogin(true);
    } else {
      setStatus();
    }
  };

  const handleInput = (event) => {
    return status === "done" && setStatus();
  };

  if (toLogin) {
    return <Redirect push to="/login" />;
  }

  if (userContext.loggedIn) {
    return <Redirect push to="/" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="FirstName">First name</label>
        <input
          ref={firstName}
          type="text"
          name="FirstName"
          id="FirstName"
          required
          onInput={handleInput}
          disabled={status}
        />
      </div>

      <div>
        <label htmlFor="LastName">Last name</label>
        <input
          ref={lastName}
          type="text"
          name="LastName"
          id="LastName"
          required
          onInput={handleInput}
          disabled={status}
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
          onInput={handleInput}
          disabled={status}
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
          onInput={handleInput}
          disabled={status}
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
          onInput={handleInput}
          disabled={status}
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
          onInput={handleInput}
          disabled={status}
        />
      </div>

      <div>
        <ButtonConfirm type="submit" state={status} disabled={status}>
          Register
        </ButtonConfirm>
      </div>
    </Form>
  );
};

export default Registration;
