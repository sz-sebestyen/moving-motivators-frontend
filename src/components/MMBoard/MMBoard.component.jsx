import "./style.css";
import { useState, useRef } from "react";
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

const TILE_SIZE = 120;
const CARD_SIZE = 120;
const NUMBER_OF_CARDS = 10;

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
  return Array(NUMBER_OF_CARDS)
    .fill()
    .map((_, index) => ({ index, value: 1 }));
};

const MMCard = (props) => {
  return (
    <img
      className={`MMCard ${props.isDragged ? "" : "nice"}`}
      src={cardMap[props.type]}
      onDragStart={(event) => {
        event.stopPropagation();
        props.setDragTarget(props.card.index);
      }}
      onDragEnd={() => props.setDragTarget()}
      style={{
        top: props.card.value * CARD_SIZE + "px",
        left: props.card.index * CARD_SIZE + "px",
        opacity: props.isDragged ? 0 : 1,
      }}
      alt="card"
      draggable
    />
  );
};

const getDropCoords = (event, mmb) => {
  const box = mmb.getBoundingClientRect();
  const index = Math.floor((event.clientX - box.x) / TILE_SIZE);
  const value = Math.floor((event.clientY - box.y) / TILE_SIZE);
  return [index, value];
};

const MMBCardKeys = uuidList(NUMBER_OF_CARDS);

const MMBoard = (props) => {
  const mmb = useRef(null);
  const [cards, setCards] = useState(getCards());
  const [dragTarget, setDragTarget] = useState();
  const [dragOverTarget, setDragOverTarget] = useState({});

  const changeCardsOrder = (startIndex, endIndex, value) => {
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

  const handleDragOver = (event) => {
    event.preventDefault();
    const [index, value] = getDropCoords(event, mmb.current);
    if (
      (dragOverTarget.value !== value || dragOverTarget.index !== index) &&
      Number.isInteger(dragTarget)
    ) {
      setDragOverTarget({ value, index });
      changeCardsOrder(dragTarget, index, value);
      setDragTarget(index);
    }
  };

  return (
    <div
      ref={mmb}
      className="mmb"
      onDragOver={handleDragOver}
      onDragStart={(event) => event.preventDefault()}
    >
      {Array(NUMBER_OF_CARDS)
        .fill()
        .map((_, type) => (
          <MMCard
            type={type}
            card={cards[type]}
            key={MMBCardKeys[type]}
            setDragTarget={setDragTarget}
            isDragged={dragTarget === cards[type].index}
          />
        ))}
    </div>
  );
};

export default MMBoard;
