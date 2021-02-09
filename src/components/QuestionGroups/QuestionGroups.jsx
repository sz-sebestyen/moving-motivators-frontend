import { UserContext } from "../UserContext/UserContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import { getToken, getUserId } from "../UserContext/UserContext";
import { getQuestionGroups, createQuestionGroup } from "../requests/requests";

import "./QuestionGroups.css";

const GroupForm = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const input = useRef(null);

  return (
    <div className="groupFormWrap">
      <form
        className="groupForm"
        onSubmit={(event) => {
          event.preventDefault();
          props.setInCreation(false);
          createQuestionGroup(input.current.value).then((data) => {
            console.log(data);
            setUserContext((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                groupIds: [...prev.user.groupIds, data.id],
              },
            }));
          });
        }}
      >
        <input
          ref={input}
          type="text"
          name="newGroupName"
          id="newGroupName"
          placeholder="new group name"
          required
        />
        <button type="submit">Create</button>
        <button type="button" onClick={() => props.setInCreation(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const Group = (props) => {
  return (
    <div className="group">{`id: ${props.group.id} ownerId: ${props.group.ownerId}`}</div>
  );
};

const QuestionGroups = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [inCreation, setInCreation] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (userContext.user.groupIds) {
      getQuestionGroups(userContext.user.groupIds).then((newGroups) => {
        console.log(newGroups);
        // TODO: format newGroups into list by ownerIds
        setGroups(newGroups);
      });
    }
  }, [userContext]);

  return (
    <div className="groupsPage">
      {inCreation && <GroupForm setInCreation={setInCreation} />}
      <div className="questionGroupMenu">
        <button className="createGroup" onClick={() => setInCreation(true)}>
          Add group
        </button>
      </div>
      <div className="allGroups">
        {groups.map((group) => (
          <Group key={group.id} group={group}></Group>
        ))}
      </div>
    </div>
  );
};

export default QuestionGroups;
