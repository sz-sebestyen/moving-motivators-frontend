import React, { useContext, useState } from "react";
import { GroupsContext } from "../Context/Context";
import { createQuestionGroup } from "../../requests/requests";

import ButtonSecondary from "../styled/buttons/ButtonSecondary";
import PopUpWrap from "../styled/PopUpWrap";
import PopUpForm from "../styled/PopUpForm";
import ButtonWithResponse from "../styled/buttons/ButtonWithResponse";

/**
 * GroupFrom component renders a form where the user can create a new group.
 */
const GroupForm = (props) => {
  const [, /* groupsContext */ setGroupsContext] = useContext(GroupsContext);
  const [groupName, setGroupName] = useState("");

  const [hasSucceeded, setHasSucceeded] = useState(false);

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
      setHasSucceeded(true);
      setGroupsContext((prev) => [...prev, newGroup]);
    }
  };

  const handleInput = (event) => {
    hasSucceeded && setHasSucceeded(false);

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
          disabled={hasSucceeded === "loading"}
        />

        <ButtonWithResponse
          variant="confirm"
          onClick={createGroup}
          hasSucceeded={hasSucceeded}
        >
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
