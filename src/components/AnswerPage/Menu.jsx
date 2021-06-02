import Menu from "../styled/Menu";
import ButtonWithResponse from "../styled/buttons/ButtonWithResponse";

const AnswerPageMenu = ({
  isClosedAnswer,
  save,
  close,
  isSaved,
  finalizeStatus,
}) => (
  <Menu>
    {isClosedAnswer ? (
      <ButtonWithResponse variant="danger" disabled>
        Finalized
      </ButtonWithResponse>
    ) : (
      <>
        <ButtonWithResponse
          variant="confirm"
          onClick={save}
          disabled={finalizeStatus}
          hasSucceeded={isSaved}
        >
          Save
        </ButtonWithResponse>

        <ButtonWithResponse
          variant="danger"
          onClick={close}
          disabled={finalizeStatus}
        >
          Finalize
        </ButtonWithResponse>
      </>
    )}
  </Menu>
);

export default AnswerPageMenu;
