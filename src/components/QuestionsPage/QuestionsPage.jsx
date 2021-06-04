import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {
  UserContext,
  GroupsContext,
  QuestionsContext,
} from "../Context/Context";

import InvitationPopUp from "./InvitationPopUp";
import QuestionForm from "./QuestionForm";
import Question from "./Question";

import styled from "styled-components";
import ButtonPrimary from "../styled/buttons/ButtonPrimary";
import Menu from "../styled/Menu";
import Page from "../styled/Page";
import ButtonWithResponse from "../styled/buttons/ButtonWithResponse";

/**
 * QuestionsPage is responsible for rendering a page where the user
 * can view their questions in a question group. They can also delete
 * the group, and a new question or invite another user to the group.
 *
 * @param {*} props
 */
const QuestionsPage = (props) => {
  const { id } = useParams();
  const [questionsContext /* , setQuestionsContext */] =
    useContext(QuestionsContext);
  const [groupsContext /* , setGroupsContext */] = useContext(GroupsContext);
  const [userContext /* , setUserContext */] = useContext(UserContext);
  const [inCreation, setInCreation] = useState(false);
  const [inInvitation, setInInvitation] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(() =>
      questionsContext
        .sort((a, b) => b.id - a.id)
        .filter((que) => que.groupId.toString() === id)
    );
  }, [questionsContext, id]);

  const currentGroup = groupsContext.find(
    (group) => group.id.toString() === id
  );

  return (
    <Page>
      {inCreation && (
        <QuestionForm setInCreation={setInCreation} groupId={id} />
      )}
      {inInvitation && (
        <InvitationPopUp
          setInInvitation={setInInvitation}
          currentGroup={currentGroup}
        />
      )}

      {/* only visible for owner */}
      {currentGroup && currentGroup.ownerId === userContext.user.id && (
        <Menu>
          <ButtonPrimary type="button" onClick={() => setInCreation(true)}>
            Add question
          </ButtonPrimary>
          <ButtonPrimary
            title="Invite member"
            type="button"
            onClick={() => setInInvitation(true)}
          >
            Invite
          </ButtonPrimary>

          <ButtonWithResponse
            variant="danger"
            title="Delete this group"
            onClick={() => {}}
          >
            Delete group
          </ButtonWithResponse>
        </Menu>
      )}

      <GroupTitle>{currentGroup && currentGroup.value}</GroupTitle>

      <QuestionList>
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            groupId={id}
          ></Question>
        ))}
      </QuestionList>
    </Page>
  );
};

const GroupTitle = styled.h1`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const QuestionList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export default QuestionsPage;
