import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/Context";
import { acceptInvite, declineInvite, getUser } from "../../requests/requests";

import styled from "styled-components";
import ButtonConfirm from "../styled/buttons/ButtonConfirm";
import ButtonDecline from "../styled/buttons/ButtonDecline";
import { paper } from "../styled/css/paper";

/**
 * Notification component renders a list item that whows an invitation to
 * another group. The user can accept or decline the invitation by two
 * different buttons.
 *
 * @param {*} props
 */
const Notification = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [origin, setOrigin] = useState();

  const [status, setStatus] = useState();

  console.log("showing notification", props.data);

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

  const handleAccept = async () => {
    setStatus("loading");
    const acceptAns = await acceptInvite(props.data);
    console.log("acceptAns:", acceptAns);
    if (acceptAns) {
      setStatus("done");
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    } else {
      setStatus();
    }
  };

  const handleDecline = async () => {
    setStatus("loading");
    const declineAns = await declineInvite(props.data);
    console.log("declineAns:", declineAns);
    setStatus();
    setUserContext((prev) => ({ ...prev, dataLoaded: false }));
  };

  return (
    <StyledNotification>
      <span>
        {origin
          ? `${origin.inviter.name} invited you to a group (${props.data.groupId})!`
          : ""}
      </span>

      <ButtonConfirm
        type="button"
        title="Accept invitation"
        disabled={status}
        onClick={handleAccept}
        state={status}
      >
        Accept
      </ButtonConfirm>

      <ButtonDecline
        title="Decline invitation"
        type="button"
        disabled={status}
        onClick={handleDecline}
        state={status}
      >
        Decline
      </ButtonDecline>
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
