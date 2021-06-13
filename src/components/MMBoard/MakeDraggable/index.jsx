import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";
import useMouseTracker from "./useMouseTracker";

const stopSlowDown = "top 0s, left 0s";

function MakeDraggable({
  onStart,
  onEnd,
  onMove,
  children,
  offset,
  style = {},
  ...rest
}) {
  const [xOffset, setXoffset] = useState(null);
  const [yOffset, setYoffset] = useState(null);

  const [isDragged, setIsDragged] = useState();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const start = (event) => {
    const box = event.target.getBoundingClientRect();
    setYoffset(event.clientY - box.y);
    setXoffset(event.clientX - box.x);

    setPos({ x: box.x + offset.x, y: box.y + offset.y });

    setIsDragged(true);
  };

  const end = () => {
    setIsDragged(false);
  };

  const divRef = useRef(null);

  const move = useCallback(
    (x, y) => {
      if (offset) {
        x += offset.x;
        y += offset.y;
      }

      setPos({ x: x - xOffset, y: y - yOffset });
      onMove && onMove(divRef.current, x, y);
    },
    [onMove, xOffset, yOffset, offset]
  );

  useMouseTracker(isDragged, move);

  useEffect(() => {
    if (isDragged) {
      onStart && onStart(divRef.current, pos.x + xOffset, pos.y + yOffset);
      // must specify false so it doesn't trigger on first render
    } else if (isDragged === false) {
      onEnd && onEnd(divRef.current, pos.x + xOffset, pos.y + yOffset);
    }
  }, [isDragged]); // eslint-disable-line

  const transitions = style.transition
    ? `${style.transition}, ${stopSlowDown}`
    : stopSlowDown;

  const dragStyles = {
    transition: transitions,
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    zIndex: 999,
    position: "absolute",
  };

  const styles = {
    ...style,
    ...(isDragged ? dragStyles : {}),
    cursor: "grab",
  };

  return (
    <div
      ref={divRef}
      onMouseDown={start}
      onMouseUp={end}
      style={styles}
      {...rest}
    >
      {children}
    </div>
  );
}

export default MakeDraggable;

export const WithDraggable = (WrappedComponent) => (props) =>
  (
    <MakeDraggable {...props}>
      <WrappedComponent />
    </MakeDraggable>
  );
