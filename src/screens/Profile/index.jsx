import React, { useContext, useRef, useState } from "react";
import { editUser } from "../../requests";
import { UserContext } from "../../context";

import Form from "../../components/UI/Form/Form";
import ButtonWithResponse from "../../components/UI/buttons/ButtonWithResponse";

/**
 * Profile isresponsible for rendering a page where the user can
 * update their user information.
 *
 * @param {*} props
 */
const Profile = (props) => {
  const [, /* userContext */ setUserContext] = useContext(UserContext);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const company = useRef(null);
  const position = useRef(null);

  const [isBusy, setIsBusy] = useState(false);

  const saveChanges = async (event) => {
    // TODO: set default values of inputfields the current values

    // TODO: check if inputs are not empty

    setIsBusy(true);

    const response = await editUser({
      name: firstName.current.value + " " + lastName.current.value,
      company: company.current.value,
      position: position.current.value,
    });

    console.log("edit user response: ", response);
    setIsBusy(false);

    if (response) {
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    }
  };

  return (
    <Form>
      <div>
        <label htmlFor="FirstName">First name</label>
        <input
          ref={firstName}
          type="text"
          name="FirstName"
          id="FirstName"
          required
          disabled={isBusy}
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
        <ButtonWithResponse
          variant="confirm"
          title="Save changes"
          onClick={saveChanges}
        >
          Save
        </ButtonWithResponse>
      </div>
    </Form>
  );
};

export default Profile;
