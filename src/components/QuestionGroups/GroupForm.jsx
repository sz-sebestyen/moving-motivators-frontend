import React, { useContext, useState, useEffect, useRef } from "react";
import { GroupsContext, UserContext } from "../Context/Context";
import {
  createQuestionGroup,
  acceptInvite,
  declineInvite,
  getUser,
} from "../requests/requests";

import ButtonSecondary from "../styles/buttons/ButtonSecondary";
import ButtonConfirm from "../styles/buttons/ButtonConfirm";

/**
 * GroupFrom component renders a form where the user can create a new group.
 */
const GroupForm = (props) => {
  const [groupsContext, setGroupsContext] = useContext(GroupsContext);
  const input = useRef(null);

  return (
    <div className="groupFormWrap">
      <form
        className="groupForm form"
        onSubmit={async (event) => {
          event.preventDefault();
          props.setInCreation(false);
          const newGroup = await createQuestionGroup(input.current.value);

          console.log("newGroup: ", newGroup);

          if (newGroup) {
            setGroupsContext((prev) => [...prev, newGroup]);
          }
        }}
      >
        <input
          ref={input}
          type="text"
          name="newGroupName"
          id="newGroupName"
          placeholder="new group name"
          required
          autoFocus
        />
        <ButtonConfirm type="submit">Create</ButtonConfirm>
        <ButtonSecondary
          type="button"
          onClick={() => props.setInCreation(false)}
        >
          Cancel
        </ButtonSecondary>
      </form>
    </div>
  );
};

export default GroupForm;
