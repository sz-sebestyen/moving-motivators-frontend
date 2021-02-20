import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/Context";
import { acceptInvite, declineInvite, getUser } from "../../requests/requests";

import ButtonConfirm from "../styles/buttons/ButtonConfirm";
import ButtonDecline from "../styles/buttons/ButtonDecline";

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
    <li className="notification paper notify">
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
    </li>
  );
};

export default Notification;
