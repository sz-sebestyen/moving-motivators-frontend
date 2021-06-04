import React, { useContext, useState, useEffect } from "react";
import { GroupsContext, UserContext } from "../../context";

import GroupForm from "./GroupForm";
import Notification from "./Notification";
import Group from "./Group";
import Navigation from "../../components/Navigation";

import styled from "styled-components";
import ButtonPrimary from "../../components/UI/buttons/ButtonPrimary";
import Menu from "../../components/UI/Menu";
import Page from "../../components/UI/Page";

/**
 * Groups screen renders the groups which the user is a member of.
 * TODO: The groups are separated into different sections by owner id.
 *
 * @param {*} props
 */
const Groups = (props) => {
  const [groupsContext /* , setGroupsContext */] = useContext(GroupsContext);
  const [userContext /* , setUserContext */] = useContext(UserContext);
  const [inCreation, setInCreation] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups((prev) => groupsContext);
  }, [groupsContext]);

  return (
    <>
      <Navigation />
      <Page>
        {inCreation && <GroupForm setInCreation={setInCreation} />}

        <Menu>
          <ButtonPrimary onClick={() => setInCreation(true)}>
            Add group
          </ButtonPrimary>
        </Menu>

        {userContext.received.length !== 0 && (
          <section className="notifications">
            <GroupTitle>Notifications</GroupTitle>
            <GroupList>
              {userContext.received.map((notif) => (
                <Notification key={notif.id} data={notif} />
              ))}
            </GroupList>
          </section>
        )}

        <section className="ownGroups">
          <GroupTitle>My own groups</GroupTitle>
          <GroupList>
            {groups
              .filter((group) => group.ownerId === userContext.user.id)
              .map((group) => (
                <Group key={group.id} group={group}></Group>
              ))}
          </GroupList>
        </section>

        <section className="otherGroups">
          <GroupTitle>Other groups</GroupTitle>
          <GroupList>
            {/* TODO: format groups into lists by ownerIds */}
            {groups
              .filter((group) => group.ownerId !== userContext.user.id)
              .map((group) => (
                <Group key={group.id} group={group}></Group>
              ))}
          </GroupList>
        </section>
      </Page>
    </>
  );
};

const GroupTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const GroupList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export default Groups;
