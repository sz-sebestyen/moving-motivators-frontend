import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { acceptInvite, declineInvite, getUser } from "../../requests";

import styled from "styled-components";
import { paper } from "../../components/UI/css/paper";
import ButtonWithResponse from "../../components/UI/buttons/ButtonWithResponse";

/**
 * Notification component renders a list item that whows an invitation to
 * another group. The user can accept or decline the invitation by two
 * different buttons.
 *
 * @param {*} props
 */
const Notification = (props) => {
  const [, /* userContext */ setUserContext] = useContext(UserContext);

  const [origin, setOrigin] = useState();

  // console.log("showing notification", props.data);

  /**
   * Loads information about the user who sent the invitation.
   */
  const loadNotiData = async () => {
    const inviter = await getUser(props.data.senderId);
    // console.log("inviter", inviter);

    // forbidden 403 can not access others groups
    /*     const theGroup = await getQuestionGroup(props.data.groupId);
    console.log("theGroup:", theGroup); */

    setOrigin(() => ({ inviter }));
  };

  useEffect(() => {
    loadNotiData();
  }, []); // eslint-disable-line

  const handleAccept = async () => {
    const acceptAns = await acceptInvite(props.data);
    // console.log("acceptAns:", acceptAns);
    if (acceptAns) {
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    }
  };

  const handleDecline = async () => {
    const declineAnswer = await declineInvite(props.data);
    // console.log("declineAnswer:", declineAnswer);
    if (declineAnswer) {
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    }
  };

  return (
    <StyledNotification>
      <span>
        {origin
          ? `${origin.inviter.name} invited you to a group (${props.data.groupId})!`
          : ""}
      </span>

      <ButtonWithResponse
        variant="confirm"
        title="Accept invitation"
        onClick={handleAccept}
      >
        Accept
      </ButtonWithResponse>

      <ButtonWithResponse
        variant="danger"
        title="Decline invitation"
        onClick={handleDecline}
      >
        Decline
      </ButtonWithResponse>
    </StyledNotification>
  );
};

const StyledNotification = styled.li`
  flex-basis: 100%;
  padding: 6px 10px;
  ${paper}

  &.notify {
    border: 2px solid #f0ad4e;
  }

  display: flex;
  gap: 15px;
  align-items: center;

  span {
    cursor: default;
    margin-right: auto;
  }
`;

export default Notification;
