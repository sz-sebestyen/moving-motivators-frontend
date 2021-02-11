import BoardPage from "./components/BoardPage/BoardPage";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Timeline from "./components/Timeline/Timeline";
import QuestionGroups from "./components/QuestionGroups/QuestionGroups";
import Navigation from "./components/Navigation/Navigation";
import QuestionGroupPage from "./components/QuestionGroupPage/QuestionGroupPage";
import AnswerPage from "./components/AnswerPage/AnswerPage";

import {
  UserContext,
  GroupsContext,
  QuestionsContext,
  defaultUser,
  defaultGroups,
  defaultQuestions,
  getToken,
  getUserId,
} from "./components/Context/Context";
import {
  getUser,
  getQuestionGroups,
  getAllQuestions,
} from "./components/requests/requests";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";

import "./App.css";

function App() {
  const [userContext, setUserContext] = useState(defaultUser);
  const [groupsContext, setGroupsContext] = useState(defaultGroups);
  const [questionsContext, setQuestionsContext] = useState(defaultQuestions);

  useEffect(() => {
    console.log("userContext changed ", userContext);
  }, [userContext]);

  const updateQuestions = async (newGroups) => {
    const newQuestionRows = await getAllQuestions(newGroups);
    console.log("new questions: ", newQuestionRows);

    const merged = [].concat.apply([], newQuestionRows);
    console.log("nextQContext: ", merged);
    setQuestionsContext(() => merged);
  };

  const updateGroups = async (user) => {
    const newGroups = await getQuestionGroups(user.groupIds);
    console.log("groups: ", newGroups);

    if (newGroups) {
      setGroupsContext(() => newGroups);
      updateQuestions(newGroups);
    }
  };

  const updateUser = async () => {
    if (getToken() && getUserId()) {
      const user = await getUser(getUserId());
      console.log(user);
      if (user) {
        setUserContext((prev) => ({
          ...prev,
          loggedIn: true,
          user: user,
        }));

        updateGroups(user);
      }
      console.log("updating");
      setUserContext((prev) => ({ ...prev, dataLoaded: true }));
    }
  };

  useEffect(() => {
    if (!userContext.dataLoaded) {
      updateUser();
    }
  });

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <GroupsContext.Provider value={[groupsContext, setGroupsContext]}>
        <QuestionsContext.Provider
          value={[questionsContext, setQuestionsContext]}
        >
          <Router>
            <div
              className="App"
              onDragStart={(event) => event.preventDefault()}
            >
              <Navigation />

              <div className="pages">
                <Switch>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/board">
                    <BoardPage />
                  </Route>
                  <Route path="/groups">
                    <QuestionGroups />
                  </Route>
                  <Route path="/question-group/:id">
                    <QuestionGroupPage />
                  </Route>
                  <Route path="/question/:groupId/:questionId">
                    <AnswerPage />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/timeline">
                    <Timeline />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </QuestionsContext.Provider>
      </GroupsContext.Provider>
    </UserContext.Provider>
  );
}

function Home() {
  const [userContext] = useContext(UserContext);
  return <p>{userContext.loggedIn ? "logged in" : "logged out"}</p>;
}

export default App;
