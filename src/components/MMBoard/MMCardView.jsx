import { cardMap } from "./CardLib";

import styled from "styled-components";

export const TILE_SIZE = 120;
export const CARD_SIZE = 120;

const MMCardView = ({ type, children, ...rest }) => {
  return (
    <CardBox {...rest}>
      <CardImage src={cardMap[type]} alt="card" />

      {children}
    </CardBox>
  );
};

export default MMCardView;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBox = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  cursor: grab;
  overflow: hidden;
  /* 
  transition: top 250ms ease, left 250ms ease, width 250ms ease,
    height 250ms ease; */
`;
