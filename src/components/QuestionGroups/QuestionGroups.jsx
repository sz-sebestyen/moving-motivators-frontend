import React, { useContext, useState, useEffect, useRef } from "react";
import { GroupsContext, UserContext } from "../Context/Context";
import {
  createQuestionGroup,
  acceptInvite,
  declineInvite,
} from "../requests/requests";
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
  const [answered, setAnswered] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);

  // TODO: update notification on answered
  console.log(props.data);

  return (
    <li className="notification">
      <span>
        {`id: ${props.data.id} senderId: ${props.data.senderId} group: ${props.data.groupId}`}
      </span>
      <button
        type="button"
        disabled={answered}
        onClick={async () => {
          const acceptAns = await acceptInvite(props.data);
          console.log("acceptAns:", acceptAns);
          if (acceptAns) setAnswered(true);
          setUserContext((prev) => ({ ...prev, dataLoaded: false }));
        }}
      >
        Accept
      </button>
      <button
        type="button"
        disabled={answered}
        onClick={async () => {
          const declineAns = await declineInvite(props.data);
          console.log("declineAns:", declineAns);
          setAnswered(true);
          setUserContext((prev) => ({ ...prev, dataLoaded: false }));
        }}
      >
        Decline
      </button>
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

      <section className="notifications">
        <h2 className="notificationsTitle">Notifications</h2>
        <ul>
          {userContext.received.map((notif) => (
            <Notification key={notif.id} data={notif} />
          ))}
        </ul>
      </section>

      <section className="ownGroups">
        <h2 className="ownGroupsTitle">My own groups</h2>
        <ul>
          {groups
            .filter((group) => group.ownerId === userContext.user.id)
            .map((group) => (
              <Group key={group.id} group={group}></Group>
            ))}
        </ul>
      </section>

      <section className="otherGroups">
        <h2 className="otherGroupsTitle">Other groups</h2>
        <ul className="allGroups">
          {/* TODO: format groups into lists by ownerIds */}
          {groups
            .filter((group) => group.ownerId !== userContext.user.id)
            .map((group) => (
              <Group key={group.id} group={group}></Group>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default QuestionGroups;
