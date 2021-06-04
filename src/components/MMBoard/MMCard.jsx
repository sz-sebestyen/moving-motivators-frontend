import { useState } from "react";
import zoomOut from "./images/zoom/search-minus-solid.svg";
import zoomIn from "./images/zoom/search-plus-solid.svg";
import { cardMap } from "./CardLib";

import styled from "styled-components";

export const TILE_SIZE = 120;
export const CARD_SIZE = 120;

const ZOOM = 3;
const ZOOM_TOP = 0;
const ZOOM_LEFT = 420;
const ZOOM_Z_INDEX = 999;

const DRAGGED_CARD_OPACITY = 0;

const MMCard = ({ card, setDragTarget, setDragOffset, isDragged, type }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDragStart = (event) => {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = "move";
    setDragTarget(card.index);
    const { x, y } = event.target.getBoundingClientRect();
    setDragOffset({
      x: event.clientX - x,
      y: event.clientY - y,
    });
  };

  const handleDragEnd = () => setDragTarget();

  const toggleZoom = () => setIsZoomed((prev) => !prev);

  const cardOpacity = isDragged ? { opacity: DRAGGED_CARD_OPACITY } : {};

  const notZoomedCardPosition = {
    top: card.value * CARD_SIZE + "px",
    left: card.index * CARD_SIZE + "px",
  };

  const cardPosition = isZoomed ? zoomedCardPosition : notZoomedCardPosition;

  const inlineCardStyle = {
    ...cardPosition,
    ...cardOpacity,
  };

  return (
    <MmCard
      className={isDragged && "noTransition"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={inlineCardStyle}
      draggable
    >
      <CardImage src={cardMap[type]} alt="card" />

      <ZoomToggleIcon
        src={isZoomed ? zoomOut : zoomIn}
        alt="zoom"
        onClick={toggleZoom}
      />
    </MmCard>
  );
};

const zoomedCardPosition = {
  top: ZOOM_TOP + "px",
  left: ZOOM_LEFT + "px",
  width: CARD_SIZE * ZOOM + "px",
  height: CARD_SIZE * ZOOM + "px",
  zIndex: ZOOM_Z_INDEX,
};

const ZoomToggleIcon = styled.img`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16%;
  height: 16%;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MmCard = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  cursor: grab;
  overflow: hidden;

  &:not(.noTransition) {
    transition: top 250ms ease, left 250ms ease, width 250ms ease,
      height 250ms ease;
  }
`;

export default MMCard;
