import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { button } from "./button";
import Loading from "./Loading";
import Success from "./Success";

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

const ButtonWithResponse = ({
  variant,
  children,
  onClick: asyncAction,
  disabled = false,
  ...rest
}) => {
  const ButtonType = buttonTypes[variant];

  const [isBusy, setIsBusy] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);

  const isMounted = useRef(true);

  const handleClick = async (event) => {
    setIsBusy(true);
    await asyncAction(event);

    if (isMounted.current) {
      setIsBusy(false);
      setHasSucceeded(true);
      setTimeout(() => {
        setHasSucceeded(false);
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const shouldDisable = isBusy || disabled;

  return (
    <ButtonType
      type="button"
      onClick={handleClick}
      disabled={shouldDisable}
      {...rest}
    >
      {children}
      {hasSucceeded && <Success />}
      {isBusy && <Loading />}
    </ButtonType>
  );
};

export default ButtonWithResponse;
