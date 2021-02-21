import React, { useContext, useRef, useState } from "react";
import { GroupsContext } from "../Context/Context";
import { createQuestionGroup } from "../../requests/requests";

import ButtonSecondary from "../styles/buttons/ButtonSecondary";
import ButtonConfirm from "../styles/buttons/ButtonConfirm";

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
    <div className="groupFormWrap">
      <form className="groupForm form" onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default GroupForm;
