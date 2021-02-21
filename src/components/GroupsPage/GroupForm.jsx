import React, { useContext, useRef, useState } from "react";
import { GroupsContext } from "../Context/Context";
import { createQuestionGroup } from "../../requests/requests";

import ButtonSecondary from "../styled/buttons/ButtonSecondary";
import ButtonConfirm from "../styled/buttons/ButtonConfirm";
import PopUpWrap from "../styled/PopUpWrap";
import PopUpForm from "../styled/PopUpForm";

/**
 * GroupFrom component renders a form where the user can create a new group.
 */
const GroupForm = (props) => {
  const [groupsContext, setGroupsContext] = useContext(GroupsContext);
  const input = useRef(null);

  const [status, setStatus] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    const newGroup = await createQuestionGroup(input.current.value);

    console.log("newGroup: ", newGroup);

    if (newGroup) {
      setStatus("done");
      setGroupsContext((prev) => [...prev, newGroup]);
    } else {
      setStatus();
    }
  };

  const handleInput = (event) => {
    return status === "done" && setStatus();
  };

  return (
    <PopUpWrap>
      <PopUpForm onSubmit={handleSubmit}>
        <input
          ref={input}
          type="text"
          name="newGroupName"
          id="newGroupName"
          placeholder="new group name"
          required
          autoFocus
          onInput={handleInput}
          disabled={status === "loading"}
        />
        <ButtonConfirm type="submit" state={status} disabled={status}>
          Create
        </ButtonConfirm>
        <ButtonSecondary
          type="button"
          onClick={() => props.setInCreation(false)}
          disabled={status === "loading"}
        >
          Cancel
        </ButtonSecondary>
      </PopUpForm>
    </PopUpWrap>
  );
};

export default GroupForm;
