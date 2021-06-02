import styled from "styled-components";
import { button } from "./button";
import ButtonWithAsyncAction from "./ButtonWithAsyncAction";

const StyledDangerButton = styled.button`
  ${button}

  color: #fff;
  background-color: #d9534f;

  &:hover,
  &:active {
    background-color: #c22e2a;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #92221f;
  }

  &:disabled {
    background-color: #f7dcdb;
    cursor: default;
  }
`;

const StyledConfirmButton = styled.button`
  ${button}

  color: #fff;
  background-color: #5cb85c;

  &:hover,
  &:active {
    background-color: #429942;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #327332;
  }

  &:disabled {
    background-color: #def0de;
    cursor: default;
  }
`;

const buttonTypes = {
  danger: StyledDangerButton,
  confirm: StyledConfirmButton,
};

const ButtonWithResponse = ({ variant, ...rest }) => {
  const WrappedButton = ButtonWithAsyncAction(buttonTypes[variant]);

  return <WrappedButton {...rest} />;
};

export default ButtonWithResponse;
