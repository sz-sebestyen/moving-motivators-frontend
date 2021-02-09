import React, { useContext, useState, useEffect, useRef } from "react";
import { getToken, getUserId, UserContext } from "../Context/Context";
import { getQuestionGroups, createQuestionGroup } from "../requests/requests";
import { Link } from "react-router-dom";

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
    <li className="group">
      <Link to={`/question-group/${props.group.id}`}>
        {`id: ${props.group.id} ownerId: ${props.group.ownerId}`}
      </Link>
    </li>
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

    // TODO: cancel requests before unmounting
  }, [userContext]);

  return (
    <main className="groupsPage">
      {inCreation && <GroupForm setInCreation={setInCreation} />}
      <div className="questionGroupMenu">
        <button className="createGroup" onClick={() => setInCreation(true)}>
          Add group
        </button>
      </div>
      <ul className="allGroups">
        {groups.map((group) => (
          <Group key={group.id} group={group}></Group>
        ))}
      </ul>
    </main>
  );
};

export default QuestionGroups;
