import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";

import { QuestionsContext, UserContext } from "../../context";
import { setAnswer, closeQuestion, editNote } from "../../requests";
import useCards from "../../hooks/useCards";

import MMBoard from "../../components/MMBoard/MMBoard";
import Navigation from "../../components/Navigation";

import styled from "styled-components";
import Page from "../../components/UI/Page";

import Menu from "./Menu";

/**
 * Question screen is responsible for redering a page where the user can
 * arrange their cards and set a note to a question in a question group.
 *
 * @param {*} props
 */
const Question = (props) => {
  const { /* groupId, */ questionId } = useParams();
  const [userContext, setUserContext] = useContext(UserContext);
  const [questionsContext /*, setQuestionsContext */] =
    useContext(QuestionsContext);

  const [question, setQuestion] = useState(
    questionsContext.find((que) => que.id.toString() === questionId)
  );
  useEffect(() => {
    setQuestion(
      questionsContext.find((que) => que.id.toString() === questionId)
    );
  }, [questionsContext, questionId]);
  // useEffect(() => console.log("question: ", question), [question]);

  const note = useRef(null);
  const [saveCards, setSaveCards] = useState();

  const defaultCards = useCards(userContext.user.defaultCardListId);
  const previousCards = useCards(question && question.answerId);

  const [finalizeStatus, setFinalizeStatus] = useState();

  const save = async () => {
    if (!question) return;

    let setAnsAnswer;
    let noteAnswer;

    if (saveCards) {
      // console.log("cards to be saved:", saveCards);
      setAnsAnswer = await setAnswer(question.id, saveCards);
      // console.log("setAnswer answer:", setAnsAnswer);
    }

    if (note.current.value !== "") {
      noteAnswer = await editNote(question.id, note.current.value);
      // console.log("noteAnswer:", noteAnswer);
    }

    if (setAnsAnswer || noteAnswer) {
      setUserContext((prev) => ({ ...prev, dataLoaded: false }));
    }
  };

  /**
   * Finalize the answer to the question. It will no longer be editable.
   */
  const close = async () => {
    if (!question) return;
    setFinalizeStatus("loading");
    /* const closeAnswre = */ await closeQuestion(question.id);
    // console.log("closeAnswer:", closeAnswre);
    setFinalizeStatus();

    // TODO: set question closed
    setUserContext((prev) => ({ ...prev, dataLoaded: false }));
  };

  return (
    <>
      <Navigation />
      <Page>
        <Menu
          isClosedAnswer={question && question.closed}
          {...{ save, close, finalizeStatus }}
        />

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
    </>
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

export default Question;
