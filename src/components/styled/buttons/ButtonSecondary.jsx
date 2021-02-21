import styled from "styled-components";
import { button } from "./button";

const buttonColor = "white";

const ButtonSecondary = styled.button`
  ${button}

  color: black;
  background-color: ${buttonColor};
  border: 1px solid #adadad;

  &:hover,
  &:active {
    background-color: #cccccc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #999999;
  }

  &:disabled {
    background-color: #adadad;
    cursor: default;
  }
`;

export default ButtonSecondary;
