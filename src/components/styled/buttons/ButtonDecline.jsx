import styled from "styled-components";
import { button } from "./button";
import Loading from "./Loading";

const buttonColor = "#d9534f";

const InnerButtonConfirm = styled.button`
  ${button}

  color: #fff;
  background-color: ${buttonColor};

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

const ButtonConfirm = (props) => {
  const { state, children, ...rest } = props;
  return (
    <InnerButtonConfirm {...rest}>
      {children}
      {state === "loading" && <Loading />}
    </InnerButtonConfirm>
  );
};

export default ButtonConfirm;
