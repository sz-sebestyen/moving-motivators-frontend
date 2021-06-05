import { useState, useCallback } from "react";
import zoomOut from "./images/zoom/search-minus-solid.svg";
import zoomIn from "./images/zoom/search-plus-solid.svg";

import styled from "styled-components";
import { CARD_SIZE } from "./MMCardView";

const ZOOM = 3;
const ZOOM_TOP = 0;
const ZOOM_LEFT = 420;
const ZOOM_Z_INDEX = 999;

const WithZoom = (Component) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed((prev) => !prev);

  const cardPositionChange = isZoomed ? zoomedCardPosition : {};

  // without usecallback transitions don't work
  return useCallback(
    ({ style = {}, ...rest }) => (
      <Component style={{ ...style, ...cardPositionChange }} {...rest}>
        <ZoomToggleIcon
          src={isZoomed ? zoomOut : zoomIn}
          alt="zoom"
          onClick={toggleZoom}
        />
      </Component>
    ),
    [isZoomed] // eslint-disable-line
  );
};

export default WithZoom;

const ZoomToggleIcon = styled.img`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16%;
  height: 16%;
  cursor: pointer;
`;

const zoomedCardPosition = {
  top: ZOOM_TOP + "px",
  left: ZOOM_LEFT + "px",
  width: CARD_SIZE * ZOOM + "px",
  height: CARD_SIZE * ZOOM + "px",
  zIndex: ZOOM_Z_INDEX,
};
