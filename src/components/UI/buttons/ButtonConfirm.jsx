import styled from "styled-components";
import { button } from "./button";
import Loading from "./Loading";
import Success from "./Success";

const buttonColor = "#5cb85c";

const InnerButtonConfirm = styled.button`
  ${button}

  color: #fff;
  background-color: ${buttonColor};

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

const ButtonConfirm = (props) => {
  const { state, children, ...rest } = props;
  return (
    <InnerButtonConfirm {...rest}>
      {children}
      {state === "done" && <Success />}
      {state === "loading" && <Loading />}
    </InnerButtonConfirm>
  );
};

export default ButtonConfirm;
