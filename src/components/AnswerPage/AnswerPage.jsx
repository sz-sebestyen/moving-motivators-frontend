import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";

import { QuestionsContext, UserContext } from "../Context/Context";
import { setAnswer, closeQuestion, editNote } from "../../requests/requests";
import useCards from "../../hooks/useCards";

import MMBoard from "../MMBoard/MMBoard";

import styled from "styled-components";
import ButtonConfirm from "../styled/buttons/ButtonConfirm";
import ButtonDecline from "../styled/buttons/ButtonDecline";
import Menu from "../styled/Menu";
import Page from "../styled/Page";

/**
 * AnswerPage component is responsible for redering a page where the user can
 * arrange their cards and set a note to a question in a question group.
 *
 * @param {*} props
 */
const AnswerPage = (props) => {
  const { /* groupId, */ questionId } = useParams();
  const [userContext, setUserContext] = useContext(UserContext);
  const [questionsContext, setQuestionsContext] = useContext(QuestionsContext);

  const [question, setQuestion] = useState(
    questionsContext.find((que) => que.id.toString() === questionId)
  );
  useEffect(() => {
    setQuestion(
      questionsContext.find((que) => que.id.toString() === questionId)
    );
  }, [questionsContext]);
  useEffect(() => console.log("question: ", question), [question]);

  const note = useRef(null);
  const [saveCards, setSaveCards] = useState();

  const defaultCards = useCards(userContext.user.defaultCardListId);
  const previousCards = useCards(question && question.answerId);

  const [saveStatus, setSaveStatus] = useState();
  const [finalizeStatus, setFinalizeStatus] = useState();

  const Save = async () => {
    if (!question) return;

    setSaveStatus("loading");

    let setAnsAnswer;
    let noteAnswer;

    if (saveCards) {
      console.log("cards to be saved:", saveCards);
      setAnsAnswer = await setAnswer(question.id, saveCards);
      console.log("setAnswer answer:", setAnsAnswer);
    }

    if (note.current.value !== "") {
      noteAnswer = await editNote(question.id, note.current.value);
      console.log("noteAnswer:", noteAnswer);
    }

    if (setAnsAnswer || noteAnswer) {
      setSaveStatus("done");
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    } else {
      setSaveStatus();
    }
  };

  useEffect(() => {
    setSaveStatus();
  }, [saveCards]);

  /**
   * Finalize the answer to the question. It will no longer be editable.
   */
  const Close = async () => {
    if (!question) return;
    setFinalizeStatus("loading");
    const closeAnswre = await closeQuestion(question.id);
    console.log("closeAnswer:", closeAnswre);
    setFinalizeStatus();

    // TODO: set question closed
    setUserContext((prev) => ({ ...prev, dataLoaded: false }));
  };

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

export default AnswerPage;
