import { memo } from "react";
import MMCardWithZoom from "./MMCardWithZoom";
import { CARD_SIZE } from "./MMCardView";
import MakeDraggable from "./MakeDraggable";

const MMCard = ({ card, setDragTarget, handleDragOver, type, mmbRef }) => {
  const handleDragStart = (target, cursorX, cursorY) => {
    setDragTarget(card);
  };

  const handleDragEnd = () => {
    setDragTarget();
  };

  const notZoomedCardPosition = {
    top: card.value * CARD_SIZE + "px",
    left: card.index * CARD_SIZE + "px",
  };

  let offset;
  if (mmbRef.current) {
    const box = mmbRef.current.getBoundingClientRect();
    offset = { x: -box.x, y: -box.y };
  }

  return (
    <MakeDraggable
      onStart={handleDragStart}
      onEnd={handleDragEnd}
      onMove={handleDragOver}
      offset={offset}
      style={{
        transition: "top 200ms, left 200ms",
        ...notZoomedCardPosition,
        position: "absolute",
      }}
    >
      <MMCardWithZoom
        {...{
          type,
        }}
      />
    </MakeDraggable>
  );
};

export default memo(MMCard);
