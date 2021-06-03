import Menu from "../styled/Menu";
import ButtonWithResponse from "../styled/buttons/ButtonWithResponse";

const AnswerPageMenu = ({ isClosedAnswer, save, close, finalizeStatus }) => (
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
