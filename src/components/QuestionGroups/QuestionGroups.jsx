import React, { useContext, useState, useEffect, useRef } from "react";
import { GroupsContext, UserContext } from "../Context/Context";
import {
  createQuestionGroup,
  acceptInvite,
  declineInvite,
  getUser,
  getQuestionGroup,
} from "../requests/requests";
import { Link } from "react-router-dom";

import "./QuestionGroups.scss";

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
        <button className="btn btnConfirm" type="submit">
          Create
        </button>
        <button
          className="btn btnSecondary"
          type="button"
          onClick={() => props.setInCreation(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

/**
 * Notification component renders a list item that whows an invitation to
 * another group. The user can accept or decline the invitation by two
 * different buttons.
 *
 * @param {*} props
 */
const Notification = (props) => {
  const [answered, setAnswered] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);

  const [origin, setOrigin] = useState();

  console.log(props.data);

  /**
   * Loads information about the user who sent the invitation.
   */
  const loadNotiData = async () => {
    const inviter = await getUser(props.data.senderId);
    console.log("inviter", inviter);

    // forbidden 403 can not access others groups
    /*     const theGroup = await getQuestionGroup(props.data.groupId);
    console.log("theGroup:", theGroup); */

    setOrigin(() => ({ inviter }));
  };

  useEffect(() => {
    loadNotiData();
  }, []);

  return (
    <li className="notification paper notify">
      <span>
        {origin
          ? `${origin.inviter.name} invited you to a group (${props.data.groupId})!`
          : ""}
      </span>

      <button
        className="btn btnConfirm"
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
        className="btn btnDelete"
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
    <li className="group paper">
      <Link to={`/question-group/${props.group.id}`}>
        {`${/* props.group.id */ ""} ${props.group.value}`}
      </Link>
    </li>
  );
};

/**
 * QuestionGroups component renders the groups which the user is a member of.
 * TODO: The groups are separated into different sections by owner id.
 *
 * @param {*} props
 */
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
        <button className="btn" onClick={() => setInCreation(true)}>
          Add group
        </button>
      </div>

      {userContext.received.length !== 0 && (
        <section className="notifications">
          <h2 className="notificationsTitle">Notifications</h2>
          <ul>
            {userContext.received.map((notif) => (
              <Notification key={notif.id} data={notif} />
            ))}
          </ul>
        </section>
      )}

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
