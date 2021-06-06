import { useState } from "react";
import zoomOut from "./images/zoom/search-minus-solid.svg";
import zoomIn from "./images/zoom/search-plus-solid.svg";

import styled from "styled-components";
import MMCardView, { CARD_SIZE } from "./MMCardView";

const ZOOM = 3;
const ZOOM_TOP = 0;
const ZOOM_LEFT = 420;
const ZOOM_Z_INDEX = 999;

const MMCardWithZoom = ({ style = {}, ...rest }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed((prev) => !prev);

  const cardPositionChange = isZoomed ? zoomedCardPosition : {};

  return (
    <MMCardView style={{ ...style, ...cardPositionChange }} {...rest}>
      <ZoomToggleIcon
        src={isZoomed ? zoomOut : zoomIn}
        alt="zoom"
        onClick={toggleZoom}
      />
    </MMCardView>
  );
};

export default MMCardWithZoom;

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
