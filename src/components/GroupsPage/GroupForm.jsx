import React, { useContext, useState } from "react";
import { GroupsContext } from "../../context";
import { createQuestionGroup } from "../../requests";

import ButtonSecondary from "../UI/buttons/ButtonSecondary";
import PopUpWrap from "../UI/PopUpWrap";
import PopUpForm from "../UI/PopUpForm";
import ButtonWithResponse from "../UI/buttons/ButtonWithResponse";

/**
 * GroupFrom component renders a form where the user can create a new group.
 */
const GroupForm = (props) => {
  const [, /* groupsContext */ setGroupsContext] = useContext(GroupsContext);
  const [groupName, setGroupName] = useState("");

  const createGroup = async (event) => {
    event.preventDefault();

    const cleanGroupName = groupName.trim();

    if (!cleanGroupName) {
      // TODO: alert user for empty input
      return;
    }

    const newGroup = await createQuestionGroup(cleanGroupName);

    // console.log("newGroup: ", newGroup);

    if (newGroup) {
      setGroupsContext((prev) => [...prev, newGroup]);
    }
  };

  const handleInput = (event) => {
    setGroupName(event.target.value);
  };

  return (
    <PopUpWrap>
      <PopUpForm>
        <input
          type="text"
          name="groupName"
          id="groupName"
          placeholder="Group Name"
          required
          autoFocus
          onInput={handleInput}
          value={groupName}
          // disabled={hasSucceeded === "loading"}
        />

        <ButtonWithResponse variant="confirm" onClick={createGroup}>
          Create
        </ButtonWithResponse>

        <ButtonSecondary
          type="button"
          onClick={() => props.setInCreation(false)}
        >
          Cancel
        </ButtonSecondary>
      </PopUpForm>
    </PopUpWrap>
  );
};

export default GroupForm;
