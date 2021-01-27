import "./style.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const uuidList = (length) =>
  Array(length)
    .fill()
    .map(() => uuidv4());

const cardMap = [
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
];

const getCards = () => {
  return Array(10)
    .fill()
    .map((_, index) => ({ type: index, value: index % 3 }));
};

const MMCard = (props) => {
  console.log("render MMCard");

  return (
    <div
      className="MMCard"
      style={{ backgroundColor: cardMap[props.card.type] }}
      draggable
      onDragStart={(event) => props.handleDragStart(event, props.value)}
    ></div>
  );
};

const MMBTKeys = uuidList(3);

const MMBColumn = (props) => {
  console.log("render MMBColumn");

  const handleDrop = (event, targetValue) => {
    event.preventDefault();
    const startTargetValue = event.dataTransfer.getData("targetValue");
    const startTargetIndex = event.dataTransfer.getData("targetIndex");
    event.dataTransfer.clearData();

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
