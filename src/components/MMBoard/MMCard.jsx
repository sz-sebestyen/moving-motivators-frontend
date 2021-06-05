import { memo } from "react";
import MMCardView from "./MMCardView";
import WithZoom from "./WithZoom";
import { CARD_SIZE } from "./MMCardView";

const DRAGGED_CARD_OPACITY = 0;

const MMCard = ({ card, setDragTarget, setDragOffset, isDragged, type }) => {
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

  const handleDragEnd = () => {
    setDragTarget();
    console.log("end");
  };

  const MMCardViewWithZoom = WithZoom(MMCardView);

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
    <MMCardViewWithZoom
      style={inlineCardStyle}
      {...{
        isDragged,
        handleDragStart,
        handleDragEnd,
        type,
      }}
    />
  );
};

export default memo(MMCard);
