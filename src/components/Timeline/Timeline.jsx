import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../Context/Context";

import { getCardLists } from "../requests/requests";

/**
 * Timeline component is responsible for rendering a page where
 * the user can view their previously saved default card
 * arangements. Starting with the most recent.
 *
 * @param {*} props
 */
const Timeline = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  const [olderLists, setOlderLists] = useState();

  const loadLists = async () => {
    const gotList = await getCardLists(
      userContext.user.olderCardListsIds.sort((a, b) => b - a)
    );
    console.log("older carsLists:", gotList);
    setOlderLists(() => gotList);
  };

  useEffect(() => {
    if (userContext.user.olderCardListsIds) {
      loadLists();
    }
  }, []);

  return (
    <div className="timeline">
      {olderLists &&
        olderLists.map((cards, index) => (
          <div key={index}>
            {cards
              .sort((a, b) => a.position - b.position)
              .map((card) => (
                <span key={card.position}>{`${card.type} | `}</span>
              ))}
            <div>--------------------------------</div>
          </div>
        ))}
    </div>
  );
};

export default Timeline;
