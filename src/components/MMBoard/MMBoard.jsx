import "./MMBoard.css";
import { useState, useRef, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../UserContext/UserContext";
import { getCardList, saveDefault } from "../requests/requests";

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

const MIN_VALUE = 0;
const MAX_VALUE = 2;
const MIN_INDEX = 0;
const MAX_INDEX = 9;

const TILE_SIZE = 120;
const CARD_SIZE = 120;
const NUMBER_OF_CARDS = 10;
const DEFAULT_CARD_VALUE = 1;

const ZOOM = 3;
const ZOOM_TOP = 0;
const ZOOM_LEFT = 420;
const ZOOM_Z_INDEX = 999;

const DRAGGED_CARD_OPACITY = 0;

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

const stringToNumCard = {
  ACCEPTANCE: 0,
  CURIOSITY: 1,
  FREEDOM: 2,
  GOAL: 3,
  HONOR: 4,
  MASTERY: 5,
  ORDER: 6,
  POWER: 7,
  RELATEDNESS: 8,
  STATUS: 9,
};

const numToStringCard = [
  "ACCEPTANCE",
  "CURIOSITY",
  "FREEDOM",
  "GOAL",
  "HONOR",
  "MASTERY",
  "ORDER",
  "POWER",
  "RELATEDNESS",
  "STATUS",
];

const stringToNumValue = {
  POSITIVE: 0,
  NEUTRAL: 1,
  NEGATIVE: 2,
};

const numToStringValue = ["POSITIVE", "NEUTRAL", "NEGATIVE"];

const getCards = () => {
  return Array(NUMBER_OF_CARDS)
    .fill()
    .map((_, index) => ({ index, value: DEFAULT_CARD_VALUE }));
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
              top: ZOOM_TOP + "px",
              left: ZOOM_LEFT + "px",
              width: CARD_SIZE * ZOOM + "px",
              height: CARD_SIZE * ZOOM + "px",
              zIndex: ZOOM_Z_INDEX,
            }
          : {
              top: props.card.value * CARD_SIZE + "px",
              left: props.card.index * CARD_SIZE + "px",
              ...(props.isDragged ? { opacity: DRAGGED_CARD_OPACITY } : {}),
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
  if (index < MIN_INDEX) index = MIN_INDEX;
  else if (index > MAX_INDEX) index = MAX_INDEX;
  if (value < MIN_VALUE) value = MIN_VALUE;
  else if (value > MAX_VALUE) value = MAX_VALUE;
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

  useEffect(() => {
    if (userContext.user.defaultCardListId) {
      getCardList(userContext.user.defaultCardListId).then((data) => {
        console.log(data);
        // TODO: set cards
        if (data) {
          const inList = Array(10).fill();
          data.forEach((card) => {
            inList[stringToNumCard[card.type]] = {
              value: stringToNumValue[card.value],
              index: card.position,
            };
          });
          //setCards(inList);
        }
      });
    }
  }, [userContext]);

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
          type="button"
          onClick={(event) => {
            const outList = cards.map((card, type) => ({
              position: card.index,
              type: numToStringCard[type],
              value: numToStringValue[card.value],
            }));
            console.log(outList);
            saveDefault(outList).then((data) => {
              if (data) {
                console.log(data);
              }
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MMBoard;
