import { useState, useRef, useContext } from "react";
import { UserContext } from "../Context/Context";

const Timeline = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    <div className="timeline">
      {/* userContext.defaultCards.map((cards) => (
        <div>
          {cards.map((card, index) => (
            <div>
              {`type: ${index}, position: ${card.index}, value: ${card.value}`}
            </div>
          ))}
          <div>--------------------------------</div>
        </div>
      )) */}
    </div>
  );
};

export default Timeline;
