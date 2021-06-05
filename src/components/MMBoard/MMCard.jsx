import { useState } from "react";
import MMCardView from "./MMCardView";

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

  return (
    <MMCardView
      {...{
        card,
        isDragged,
        handleDragStart,
        handleDragEnd,
        type,
        isZoomed,
        toggleZoom,
      }}
    />
  );
};

export default MMCard;
