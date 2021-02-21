import React, { useContext, useState, useEffect } from "react";
import { GroupsContext, UserContext } from "../Context/Context";

import "./GroupsPage.scss";

import GroupForm from "./GroupForm";
import Notification from "./Notification";
import Group from "./Group";

import ButtonPrimary from "../styled/buttons/ButtonPrimary";

/**
 * GroupsPage component renders the groups which the user is a member of.
 * TODO: The groups are separated into different sections by owner id.
 *
 * @param {*} props
 */
const GroupsPage = (props) => {
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
        <ButtonPrimary onClick={() => setInCreation(true)}>
          Add group
        </ButtonPrimary>
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

export default GroupsPage;
