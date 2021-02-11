import React, { useContext, useState, useEffect, useRef } from "react";
import { GroupsContext, UserContext } from "../Context/Context";
import { createQuestionGroup } from "../requests/requests";
import { Link } from "react-router-dom";

import "./QuestionGroups.scss";

const GroupForm = (props) => {
  const [groupsContext, setGroupsContext] = useContext(GroupsContext);
  const input = useRef(null);

  return (
    <div className="groupFormWrap">
      <form
        className="groupForm"
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
        />
        <button type="submit">Create</button>
        <button type="button" onClick={() => props.setInCreation(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const Notification = (props) => {
  return (
    <li className="notification">
      {`id: ${props.data.id} ownerId: ${props.data.ownerId} group: ${props.data.groupId}`}
    </li>
  );
};

const Group = (props) => {
  return (
    <li className="group">
      <Link to={`/question-group/${props.group.id}`}>
        {`id: ${props.group.id} ownerId: ${props.group.ownerId} name: ${props.group.value}`}
      </Link>
    </li>
  );
};

const QuestionGroups = (props) => {
  const [groupsContext, setGroupsContext] = useContext(GroupsContext);
  const [userContext, setUserContext] = useContext(UserContext);
  const [inCreation, setInCreation] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups((prev) => groupsContext);
  }, [groupsContext]);

  return (
    <main className="groupsPage">
      {inCreation && <GroupForm setInCreation={setInCreation} />}

      <div className="questionGroupMenu">
        <button className="createGroup" onClick={() => setInCreation(true)}>
          Add group
        </button>
      </div>

      <div className="notifications">
        <h2 className="notificationsTitle">Notifications</h2>
        <ul>
          {userContext.received.map((notif) => (
            <Notification key={notif.id} data={notif} />
          ))}
        </ul>
      </div>

      <ul className="allGroups">
        {/* TODO: format groups into list by ownerIds */}
        {groups.map((group) => (
          <Group key={group.id} group={group}></Group>
        ))}
      </ul>
    </main>
  );
};

export default QuestionGroups;
