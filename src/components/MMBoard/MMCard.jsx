import { memo, useState } from "react";
import MMCardWithZoom from "./MMCardWithZoom";
import { CARD_SIZE } from "./MMCardView";

const DRAGGED_CARD_OPACITY = 0;

const MMCard = ({ card, setDragTarget, setDragOffset, type }) => {
  const [isDragged, setIsDragged] = useState(false);

  const handleDragStart = (event) => {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = "move";
    setDragTarget(card.index);
    const { x, y } = event.target.getBoundingClientRect();
    setDragOffset({
      x: event.clientX - x,
      y: event.clientY - y,
    });

    setIsDragged(true);
  };

  const handleDragEnd = () => {
    setDragTarget();
    setIsDragged(false);
  };

  const notZoomedCardPosition = {
    top: card.value * CARD_SIZE + "px",
    left: card.index * CARD_SIZE + "px",
  };

  const cardOpacity = isDragged ? { opacity: DRAGGED_CARD_OPACITY } : {};

  const inlineCardStyle = {
    ...notZoomedCardPosition,
    ...cardOpacity,
  };

  return (
    <MMCardWithZoom
      style={inlineCardStyle}
      className={isDragged && "noTransition"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
      {...{
        type,
      }}
    />
  );
};

export default memo(MMCard);
