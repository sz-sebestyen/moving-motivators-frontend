import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/Context";
import { Redirect } from "react-router-dom";
import { registerUser } from "../requests/requests";

import "./Registration.scss";

const Registration = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [toLogin, setToLogin] = useState(false);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const company = useRef(null);
  const position = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await registerUser({
      name: firstName.current.value + " " + lastName.current.value,
      email: email.current.value,
      company: company.current.value,
      position: position.current.value,
      password: password.current.value,
    });

    console.log("register response: ", response);

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
    <form className="registrationForm" onSubmit={handleSubmit}>
      <div className="firstName formField">
        <label htmlFor="FirstName">First name</label>
        <input
          ref={firstName}
          type="text"
          name="FirstName"
          id="FirstName"
          required
        />
      </div>

      <div className="lastName formField">
        <label htmlFor="LastName">Last name</label>
        <input
          ref={lastName}
          type="text"
          name="LastName"
          id="LastName"
          required
        />
      </div>

      <div className="email formField">
        <label htmlFor="Email">Email</label>
        <input ref={email} type="email" name="Email" id="Email" required />
      </div>

      <div className="company formField">
        <label htmlFor="Company">Company</label>
        <input ref={company} type="text" name="Company" id="Company" required />
      </div>
      <div className="position formField">
        <label htmlFor="Position">Position</label>
        <input
          ref={position}
          type="text"
          name="Position"
          id="Position"
          required
        />
      </div>

      <div className="password formField">
        <label htmlFor="Password">Password</label>
        <input
          ref={password}
          type="password"
          name="Password"
          id="Password"
          required
        />
      </div>

      <div className="submit formField">
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default Registration;
