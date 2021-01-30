import "./style.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import cardIMG0 from "../../images/card-acceptance.png";
import cardIMG1 from "../../images/card-curiosity.png";
import cardIMG2 from "../../images/card-freedom.png";
import cardIMG3 from "../../images/card-goal.png";
import cardIMG4 from "../../images/card-honor.png";
import cardIMG5 from "../../images/card-mastery.png";
import cardIMG6 from "../../images/card-order.png";
import cardIMG7 from "../../images/card-power.png";
import cardIMG8 from "../../images/card-relatedness.png";
import cardIMG9 from "../../images/card-status.png";

const uuidList = (length) =>
  Array(length)
    .fill()
    .map(() => uuidv4());

const cardMap = [
  cardIMG0,
  cardIMG1,
  cardIMG2,
  cardIMG3,
  cardIMG4,
  cardIMG5,
  cardIMG6,
  cardIMG7,
  cardIMG8,
  cardIMG9,
];

const getCards = () => {
  return Array(10)
    .fill()
    .map((_, index) => ({ type: index, value: 1 }));
};

const MMCard = (props) => {
  // console.log("render MMCard");

  return (
    <img
      className="MMCard"
      draggable
      onDragStart={(event) => props.handleDragStart(event, props.value)}
      src={cardMap[props.card.type]}
      alt="card"
      style={{
        width: "100%",
        objectFit: "contain",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};

const MMBTKeys = uuidList(3);

const MMBColumn = (props) => {
  // console.log("render MMBColumn");

  const updateCards = (event, targetValue, isDrop = true) => {
    event.stopPropagation();
    event.preventDefault();

    if (props.dragTarget.value !== undefined) {
      props.changeCardsOrder(props.dragTarget.index, props.index, targetValue);
    }

    props.setDragTarget({
      value: isDrop ? undefined : targetValue,
      index: isDrop ? undefined : props.index,
    });
  };

  const handleDragStart = (event, targetValue) => {
    event.stopPropagation();
    props.setDragTarget({
      value: targetValue,
      index: props.index,
    });
  };

  return (
    <div className="MMBColumn">
      {Array(3)
        .fill()
        .map((_, value) => (
          <div
            className="mmbTile"
            key={MMBTKeys[value]}
            onDrop={(event) => updateCards(event, value)}
            onDragEnter={(event) => {
              if (
                props.dragEnterTarget.value !== value ||
                props.dragEnterTarget.index !== props.index
              ) {
                props.setDragEnterTarget({ value, index: props.index });
                updateCards(event, value, false);
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
          >
            {value === props.card.value && (
              <MMCard
                value={value}
                card={props.card}
                handleDragStart={handleDragStart}
              ></MMCard>
            )}
          </div>
        ))}
    </div>
  );
};

const MMBCKeys = uuidList(10);

const MMBoard = (props) => {
  // console.log("render MMBoard");

  const [cards, setCards] = useState(getCards());

  const changeCardsOrder = (startIndex, endIndex, value) => {
    setCards((prevState) => {
      const movedCardType = prevState[startIndex].type;

      const endIndexIsSmaller = Math.min(startIndex, endIndex) === endIndex;
      const newState = [];
      prevState.forEach((card, index) => {
        if (endIndexIsSmaller && index === endIndex)
          newState.push({ type: movedCardType, value });
        if (index !== startIndex)
          newState.push({ type: card.type, value: card.value });
        if (!endIndexIsSmaller && index === endIndex)
          newState.push({ type: movedCardType, value });
      });

      return newState;
    });
  };

  const [dragTarget, setDragTarget] = useState({
    value: undefined,
    index: undefined,
  });

  const [dragEnterTarget, setDragEnterTarget] = useState({
    value: undefined,
    index: undefined,
  });

  return (
    <div className="mmb">
      {Array(10)
        .fill()
        .map((_, index) => (
          <MMBColumn
            key={MMBCKeys[index]}
            index={index}
            card={cards[index]}
            changeCardsOrder={changeCardsOrder}
            onDragStart={(event) => event.preventDefault()}
            dragTarget={dragTarget}
            setDragTarget={setDragTarget}
            dragEnterTarget={dragEnterTarget}
            setDragEnterTarget={setDragEnterTarget}
          />
        ))}
    </div>
  );
};

export default MMBoard;
