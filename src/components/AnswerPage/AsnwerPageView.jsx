import MMBoard from "../MMBoard/MMBoard";

import styled from "styled-components";
import ButtonConfirm from "../styled/buttons/ButtonConfirm";
import ButtonDecline from "../styled/buttons/ButtonDecline";
import Menu from "../styled/Menu";
import Page from "../styled/Page";

const AnswerPageView = ({
  isClosed,
  saveAnswer,
  closeAnswer,
  isSaveDisabled,
  isCloseDiabled,
}) => {
  return (
    <Page>
      <Menu>
        {question && question.closed ? (
          <ButtonDecline disabled>Finalized</ButtonDecline>
        ) : (
          <>
            <ButtonConfirm
              type="button"
              onClick={Save}
              disabled={saveStatus || finalizeStatus}
              state={saveStatus}
            >
              Save
            </ButtonConfirm>

            <ButtonDecline
              type="button"
              onClick={Close}
              disabled={finalizeStatus || finalizeStatus}
              state={finalizeStatus}
            >
              Finalize
            </ButtonDecline>
          </>
        )}
      </Menu>

      <QuestionTitle>{question ? question.value : ""}</QuestionTitle>

      <MMBoard
        starterCards={previousCards || defaultCards}
        setSaveCards={setSaveCards}
      />

      <NoteArea
        ref={note}
        defaultValue={question && question.note}
        placeholder="save a note"
        disabled={question && question.closed}
        style={{ resize: "none" }}
      />
    </Page>
  );
};

const QuestionTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

const NoteArea = styled.textarea`
  appearance: none;
  display: block;
  width: 500px;
  height: 50px;
  padding: 5px;
  margin: 25px auto;
`;

export default AnswerPageView;
