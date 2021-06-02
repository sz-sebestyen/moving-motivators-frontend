import { useState } from "react";
import Loading from "./Loading";
import Success from "./Success";

const ButtonWithAsyncAction = (ButtonComponent) => {
  const NewComponentView = ({
    children,
    hasSucceeded = false,
    isBusy,
    ...rest
  }) => (
    <ButtonComponent type="button" {...rest}>
      {children}
      {hasSucceeded && <Success />}
      {isBusy && <Loading />}
    </ButtonComponent>
  );

  const NewComponent = ({
    onClick: asyncAction,
    disabled = false,
    ...rest
  }) => {
    const [isBusy, setIsBusy] = useState(false);

    const handleClick = async (event) => {
      setIsBusy(true);
      await asyncAction(event);
      setIsBusy(false);
    };

    const shouldDisable = isBusy || disabled;

    return (
      <NewComponentView
        onClick={handleClick}
        disabled={shouldDisable}
        isBusy={isBusy}
        {...rest}
      />
    );
  };

  return NewComponent;
};

export default ButtonWithAsyncAction;
