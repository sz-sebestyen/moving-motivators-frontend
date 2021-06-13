import { useState, useRef, useEffect, useCallback } from "react";
import {
  NUMBER_OF_CARDS,
  stringToNumCard,
  numToStringCard,
  stringToNumValue,
  numToStringValue,
} from "./CardLib";
import MMCard from "./MMCard";
import { CARD_SIZE, TILE_SIZE } from "./MMCardView";

import styled from "styled-components";

/**
 * MMBoard component is responsible for rendering a board where the user can
 * arrange the moving motivators' cards.
 */

const MIN_VALUE = 0;
const MAX_VALUE = 2;
const MIN_INDEX = 0;
const MAX_INDEX = 9;

/**
 * Computes the index and value of the place that is being draged over.
 *
 * @param {*} target Target HTMLElement
 * @param {*} mmb Reference to the board div.
 */
const getDropCoords = (target, mmb) => {
  const box = mmb.getBoundingClientRect();
  const targetBound = target.getBoundingClientRect();

  let index = Math.floor((targetBound.x + CARD_SIZE / 2 - box.x) / TILE_SIZE);
  let value = Math.floor((targetBound.y + CARD_SIZE / 2 - box.y) / TILE_SIZE);

  if (index < MIN_INDEX) index = MIN_INDEX;
  else if (index > MAX_INDEX) index = MAX_INDEX;
  if (value < MIN_VALUE) value = MIN_VALUE;
  else if (value > MAX_VALUE) value = MAX_VALUE;
  return [index, value];
};

/**
 * Provides a fallback card arrangement.
 */
const getFallbackCards = () => {
  return Array(NUMBER_OF_CARDS)
    .fill()
    .map((_, index) => ({ index, value: 1 }));
};

const MMBoard = ({ starterCards, setSaveCards }) => {
  const mmb = useRef(null);

  const [cards, setCards] = useState(getFallbackCards());

  /**
   * Transform data into a usable form.
   */
  useEffect(() => {
    let cardList = Array(10).fill();
    if (starterCards) {
      starterCards.forEach((card) => {
        cardList[stringToNumCard[card.type]] = {
          value: stringToNumValue[card.value],
          index: card.position,
        };
      });

      setCards(cardList);
    }
  }, [starterCards]);

  const [dragTarget, setDragTarget] = useState();

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
    setSaveCards(saveList);
  }, [cards]); // eslint-disable-line

  const handleDragOver = useCallback(
    (target, cursorX, cursorY) => {
      const [index, value] = getDropCoords(target, mmb.current);

      if (
        dragTarget &&
        (dragTarget.value !== value || dragTarget.index !== index)
      ) {
        setDragTarget({ index, value });
        changeCardsOrder(dragTarget.index, index, value);
      }
    },
    [dragTarget]
  );

  return (
    <MmbWrap>
      <Directions>
        <div className="left">Least important</div>
        <div className="right">Most important</div>
      </Directions>

      <Mmb ref={mmb} onDragStart={(event) => event.preventDefault()}>
        {cards &&
          Array(NUMBER_OF_CARDS)
            .fill()
            .map((_, type) => (
              <MMCard
                mmbRef={mmb}
                type={type}
                card={cards[type]}
                key={type}
                setDragTarget={setDragTarget}
                handleDragOver={handleDragOver}
              />
            ))}
      </Mmb>
    </MmbWrap>
  );
};

const MmbWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Directions = styled.div`
  position: relative;
  display: flex;
  justify-content: stretch;
  font-size: 1.4em;
  padding-bottom: 10px;

  .left {
    flex-basis: 50%;
    text-align: left;
  }

  .right {
    flex-basis: 50%;
    text-align: right;
  }
`;

const Mmb = styled.div`
  box-sizing: content-box;
  position: relative;
  width: 100%;
  height: 360px;
`;

export default MMBoard;
