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

import dragnone from "../../images/dragnone.png";

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
    .map((_, index) => ({ index, value: 1 }));
};

const MMCard = (props) => {
  // console.log("render MMCard");

  return (
    <img
      className="MMCard"
      draggable
      onDragStart={(event) => {
        event.stopPropagation();
        props.handleDragStart(event, props.card.value, props.card.index);
      }}
      src={cardMap[props.type]}
      alt="card"
      style={{
        top: props.card.value * 120 + "px",
        left: props.card.index * 120 + "px",
      }}
    />
  );
};

const getDropCoords = (event) => {
  const box = document.querySelector(".mmb").getBoundingClientRect();
  // console.log(event.clientX, event.clientY, box.x, box.y);

  const abs = { x: event.clientX - box.x, y: event.clientY - box.y };
  // console.log(abs);

  const dropIndex = Math.floor(abs.x / 120);
  const dropValue = Math.floor(abs.y / 120);
  // console.log("dropcoords", dropIndex, dropValue);
  return [dropIndex, dropValue];
};

const MMBCKeys = uuidList(10);

const MMBoard = (props) => {
  // console.log("render MMBoard");

  const [cards, setCards] = useState(getCards());

  const changeCardsOrder = (startIndex, endIndex, value) => {
    console.log("changeorder");

    setCards((prevState) => {
      const endIndexIsSmaller = Math.min(startIndex, endIndex) === endIndex;
      return prevState.map((card) => {
        if (card.index === startIndex) return { value, index: endIndex };
        else if (
          endIndexIsSmaller &&
          card.index < startIndex &&
          card.index >= endIndex
        )
          return { value: card.value, index: card.index + 1 };
        else if (card.index > startIndex && card.index <= endIndex)
          return { value: card.value, index: card.index - 1 };
        else return card;
      });
    });
  };

  const [dragTarget, setDragTarget] = useState({
    value: undefined,
    index: undefined,
  });

  const [dragOverTarget, setDragOverTarget] = useState({
    value: undefined,
    index: undefined,
  });

  // from column
  const handleDragStart = (event, value, index) => {
    console.log(index, value);
    // console.log(event);
    // console.log(event.target.getBoundingClientRect());
    const targetBox = event.target.getBoundingClientRect();
    const img = new Image();
    img.src = dragnone;
    event.dataTransfer.setDragImage(
      img,
      0,
      -10
      // event.clientX - targetBox.x,
      // event.clientY - targetBox.y
    );

    event.stopPropagation();
    setDragTarget({
      value,
      index,
    });
  };

  const updateCards = (event, isDrop = true) => {
    event.stopPropagation();
    event.preventDefault();

    const [dropIndex, dropValue] = getDropCoords(event);

    if (dragTarget.value !== undefined && dragTarget.index !== undefined) {
      changeCardsOrder(dragTarget.index, dropIndex, dropValue);
    }

    setDragTarget({
      value: isDrop ? undefined : dropValue,
      index: isDrop ? undefined : dropIndex,
    });
  };

  return (
    <div
      className="mmb"
      onDragStart={(event) => event.preventDefault()}
      onDragOver={(event) => {
        event.preventDefault();
        const [dropIndex, dropValue] = getDropCoords(event);
        if (
          dragOverTarget.value !== dropValue ||
          dragOverTarget.index !== dropIndex
        ) {
          setDragOverTarget({ value: dropValue, index: dropIndex });
          updateCards(event, false);
        }
      }}
      onDrop={(event) => updateCards(event)}
    >
      {Array(10)
        .fill()
        .map((_, type) => (
          <MMCard
            type={type}
            card={cards[type]}
            key={MMBCKeys[type]}
            handleDragStart={handleDragStart}
          />
        ))}
    </div>
  );
};

export default MMBoard;
