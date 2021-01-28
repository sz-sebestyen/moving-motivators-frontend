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

/* [
  "#001122",
  "#112233",
  "#223344",
  "#334455",
  "#445566",
  "#556677",
  "#667788",
  "#778899",
  "#8899aa",
  "#99aabb",
]; */

const getCards = () => {
  return Array(10)
    .fill()
    .map((_, index) => ({ type: index, value: 1 }));
};

const MMCard = (props) => {
  console.log("render MMCard");

  return (
    <div
      className="MMCard"
      draggable
      onDragStart={(event) => props.handleDragStart(event, props.value)}
    >
      <img
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
    </div>
  );
};

const MMBTKeys = uuidList(3);

const MMBColumn = (props) => {
  console.log("render MMBColumn");

  const handleDrop = (event, targetValue) => {
    event.preventDefault();
    const startTargetValue = event.dataTransfer.getData("targetValue");
    const startTargetIndex = event.dataTransfer.getData("targetIndex");
    console.log(
      event.dataTransfer.getData("targetValue"),
      event.dataTransfer.getData("targetIndex")
    );
    //event.dataTransfer.clearData();

    if (startTargetValue) {
      props.changeCardsOrder(+startTargetIndex, props.index, targetValue);
    }
  };

  const handleDragStart = (event, targetValue) => {
    event.dataTransfer.setData("targetValue", targetValue);
    event.dataTransfer.setData("targetIndex", props.index);
  };

  return (
    <div className="MMBColumn">
      {Array(3)
        .fill()
        .map((_, index) => (
          <div
            className="mmbTile"
            key={MMBTKeys[index]}
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={(event) => {
              event.preventDefault();
            }}
          >
            {index === props.card.value && (
              <MMCard
                value={index}
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
  console.log("render MMBoard");

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
          />
        ))}
    </div>
  );
};

export default MMBoard;
