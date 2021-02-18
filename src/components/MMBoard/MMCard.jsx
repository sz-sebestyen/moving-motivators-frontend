import { useState } from "react";
import zoomOut from "../../images/search-minus-solid.svg";
import zoomIn from "../../images/search-plus-solid.svg";
import { cardMap } from "./CardLib";

export const TILE_SIZE = 120;
export const CARD_SIZE = 120;

const ZOOM = 3;
const ZOOM_TOP = 0;
const ZOOM_LEFT = 420;
const ZOOM_Z_INDEX = 999;

const DRAGGED_CARD_OPACITY = 0;

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

export default MMCard;
