import "./style.css";
import { useState, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../UserContext/UserContext";

import zoomOut from "../../images/search-minus-solid.svg";
import zoomIn from "../../images/search-plus-solid.svg";

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
  const [zoom, setZoom] = useState(false);

  return (
    <div
      className={`MMCard ${props.isDragged ? "" : "nice"}`}
      onDragStart={(event) => {
        event.stopPropagation();
        event.dataTransfer.effectAllowed = "move";
        props.setDragTarget(props.card.index);
        const box = event.target.getBoundingClientRect();
        props.setDragOffset({
          x: event.clientX - box.x,
          y: event.clientY - box.y,
        });
      }}
      onDragEnd={() => props.setDragTarget()}
      style={
        zoom
          ? {
              top: 0 + "px",
              left: 420 + "px",
              width: 360 + "px",
              height: 360 + "px",
              zIndex: 999,
            }
          : {
              top: props.card.value * CARD_SIZE + "px",
              left: props.card.index * CARD_SIZE + "px",
              opacity: props.isDragged ? 0 : 1,
            }
      }
      draggable
    >
      <img src={cardMap[props.type]} alt="card" />
      <img
        src={zoom ? zoomOut : zoomIn}
        alt="zoom toggle"
        className="zoom"
        onClick={() => setZoom((prev) => !prev)}
      />
    </div>
  );
};

const getDropCoords = (event, mmb, dragOffset) => {
  const box = mmb.getBoundingClientRect();
  let index = Math.floor(
    (event.clientX + CARD_SIZE / 2 - dragOffset.x - box.x) / TILE_SIZE
  );
  let value = Math.floor(
    (event.clientY + CARD_SIZE / 2 - dragOffset.y - box.y) / TILE_SIZE
  );
  if (index < 0) index = 0;
  else if (index > 9) index = 9;
  if (value < 0) value = 0;
  else if (value > 2) value = 2;
  return [index, value];
};

const MMBCardKeys = uuidList(NUMBER_OF_CARDS);

const MMBoard = (props) => {
  const mmb = useRef(null);
  const [cards, setCards] = useState(getCards());
  const [dragTarget, setDragTarget] = useState();
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragOverTarget, setDragOverTarget] = useState({});

  const [userContext, setUserContext] = useContext(UserContext);

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
    event.dataTransfer.dropEffect = "move";
    const [index, value] = getDropCoords(event, mmb.current, dragOffset);
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
    <div className="mmbOuter">
      <div className="direction">
        <div className="left">Least important</div>
        <div className="right">Most important</div>
      </div>

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
              setDragOffset={setDragOffset}
              isDragged={dragTarget === cards[type].index}
            />
          ))}
      </div>
      <div className="mmbSave">
        <button
          type="butotn"
          onClick={(event) => {
            setUserContext((prev) => ({
              ...prev,
              defaultCards: [cards, ...prev.defaultCards],
            }));
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MMBoard;
