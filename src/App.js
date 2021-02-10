import MMBoard from "./components/MMBoard/MMBoard";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Timeline from "./components/Timeline/Timeline";
import QuestionGroups from "./components/QuestionGroups/QuestionGroups";
import Navigation from "./components/Navigation/Navigation";
import QuestionGroupPage from "./components/QuestionGroupPage/QuestionGroupPage";
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
    const newQuestions = await getAllQuestions(newGroups);
    console.log("new questions: ", newQuestions);

    const byGroupId = newQuestions.map((questions) => ({
      ...(questions[0] ? { [questions[0].groupId]: questions } : {}),
    }));
    // TODO: set questions
    console.log("byGroupId: ", byGroupId);
    setQuestionsContext((prev) => {
      const nextQContext = Object.assign({}, ...byGroupId);
      console.log("nextQContext: ", nextQContext);
      return nextQContext;
    });
  };

  const updateGroups = async (user) => {
    const newGroups = await getQuestionGroups(user.groupIds);
    console.log("groups: ", newGroups);
    // TODO: format newGroups into list by ownerIds
    if (newGroups) {
      setGroupsContext((prev) => ({
        ...prev,
        ownGroups: newGroups,
      }));
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
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

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
                    <MMBoard />
                  </Route>
                  <Route path="/groups">
                    <QuestionGroups />
                  </Route>
                  <Route path="/question-group/:id">
                    <QuestionGroupPage />
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
