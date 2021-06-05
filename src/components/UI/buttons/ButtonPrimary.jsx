import styled from "styled-components";
import { button } from "./button";

const buttonColor = "#3e68ff";

const ButtonConfirm = styled.button`
  ${button}

  color: #fff;
  background-color: ${buttonColor};

  &:hover,
  &:active {
    background-color: #0037fd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #0029be;
  }

  &:disabled {
    background-color: #8b93b1;
    cursor: default;
  }
`;

export default ButtonConfirm;
