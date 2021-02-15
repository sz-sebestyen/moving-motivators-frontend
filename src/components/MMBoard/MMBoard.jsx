import "./MMBoard.scss";
import { useState, useRef, useContext, useEffect } from "react";

import zoomOut from "../../images/search-minus-solid.svg";
import zoomIn from "../../images/search-plus-solid.svg";

import {
  cardMap,
  NUMBER_OF_CARDS,
  stringToNumCard,
  numToStringCard,
  stringToNumValue,
  numToStringValue,
} from "../CardLib/CardLib";

/**
 * MMBoard component is responsible for rendering a board where the user can
 * arrange the moving motivators' cards.
 */

const MIN_VALUE = 0;
const MAX_VALUE = 2;
const MIN_INDEX = 0;
const MAX_INDEX = 9;

const TILE_SIZE = 120;
const CARD_SIZE = 120;
const DEFAULT_CARD_VALUE = 1;

const ZOOM = 3;
const ZOOM_TOP = 0;
const ZOOM_LEFT = 420;
const ZOOM_Z_INDEX = 999;

const DRAGGED_CARD_OPACITY = 0;

/**
 * Provides a fallback card arrangement.
 */
const getCards = () => {
  return Array(NUMBER_OF_CARDS)
    .fill()
    .map((_, index) => ({ index, value: DEFAULT_CARD_VALUE }));
};

/**
 * Renders a card.
 * @param {*} props
 */
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

/**
 * Computes the index and value of the place that is being draged over.
 *
 * @param {*} event
 * @param {*} mmb Reference to the board div.
 * @param {*} dragOffset the position of the cursor compared to the cards
 * top left corner when the drag started.
 */
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

const MMBoard = (props) => {
  const mmb = useRef(null);

  /**
   * Transform data into a usable form.
   */
  let cardList = Array(10).fill();
  if (props.starterCards) {
    props.starterCards.forEach((card) => {
      cardList[stringToNumCard[card.type]] = {
        value: stringToNumValue[card.value],
        index: card.position,
      };
    });
  } else {
    cardList = getCards();
  }

  const [cards, setCards] = useState(cardList);
  const [dragTarget, setDragTarget] = useState();
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragOverTarget, setDragOverTarget] = useState({});

  /**
   * Sets the new state of the cards.
   *
   * @param {*} startIndex Index of the place where the drag started.
   * @param {*} endIndex Index of the place where the drag ended.
   * @param {*} value The new value of the dragged card.
   */
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

  useEffect(() => {
    //update parent state
    const saveList = cards.map((card, type) => ({
      position: card.index,
      type: numToStringCard[type],
      value: numToStringValue[card.value],
    }));

    console.log("cards updated: ", saveList);
    props.setSaveCards(saveList);
  }, [cards]);

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
        {cards &&
          Array(NUMBER_OF_CARDS)
            .fill()
            .map((_, type) => (
              <MMCard
                type={type}
                card={cards[type]}
                key={type}
                setDragTarget={setDragTarget}
                setDragOffset={setDragOffset}
                isDragged={dragTarget === cards[type].index}
              />
            ))}
      </div>
    </div>
  );
};

export default MMBoard;
