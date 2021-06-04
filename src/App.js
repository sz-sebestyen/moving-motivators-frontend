import Navigation from "./components/Navigation";

import Home from "./screens/Home";

// pages
import BoardPage from "./components/BoardPage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Timeline from "./components/Timeline";
import GroupsPage from "./components/GroupsPage";
import QuestionsPage from "./components/QuestionsPage";
import AnswerPage from "./components/AnswerPage/AnswerPage";
import Registration from "./components/Registration";

import {
  UserContext,
  GroupsContext,
  QuestionsContext,
  defaultUser,
  defaultGroups,
  defaultQuestions,
  getToken,
  getUserId,
  removeToken,
  removeUserId,
} from "./context";

import {
  getUser,
  getQuestionGroups,
  getAllQuestions,
  getSentNotifications,
  getReceivedNotifications,
  getInvited,
} from "./requests";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

/**
 * App component is responsible for rendering the navigation bar and routing
 * the pages. And providing context with the fetched groups and guestions.
 */
function App() {
  const [userContext, setUserContext] = useState(defaultUser);
  const [groupsContext, setGroupsContext] = useState(defaultGroups);
  const [questionsContext, setQuestionsContext] = useState(defaultQuestions);

  const updateQuestions = async (newGroups) => {
    const newQuestionRows = await getAllQuestions(newGroups);
    console.log("new questions: ", newQuestionRows);

    /* Merge array of arrays into one array */
    const merged = [].concat.apply([], newQuestionRows);
    console.log("nextQContext: ", merged);
    setQuestionsContext(() => merged);
  };

  const updateGroups = async (user) => {
    const responses = await Promise.allSettled([
      getQuestionGroups(user.groupIds),
      getInvited(),
    ]);

    const newGroups =
      responses[0].status === "fulfilled" ? responses[0].value : [];

    // someetimes invited is fulfilled but the value is undefined
    const invited =
      responses[1].status === "fulfilled" ? responses[1].value || [] : [];

    console.log("groups: ", newGroups);
    console.log("invited Answer:", invited);

    const allGroups = [...newGroups, ...invited].sort((a, b) => b.id - a.id);

    if (allGroups) {
      setGroupsContext(() => allGroups);
      updateQuestions(allGroups);
    }
  };

  /**
   * Update userContext with fetched data.
   */
  const updateUser = async () => {
    if (getToken() && getUserId()) {
      const user = !userContext.loggedIn
        ? await getUser(getUserId())
        : userContext.user;
      console.log("user:", user);

      if (user) {
        const responses = await Promise.allSettled([
          getSentNotifications(),
          getReceivedNotifications(),
        ]);

        const sentNoties =
          responses[0].status === "fulfilled" ? responses[0].value : [];
        const receivedNoties =
          responses[1].status === "fulfilled" ? responses[1].value : [];

        console.log("sent notifications:", sentNoties);
        console.log("received notifications:", receivedNoties);

        setUserContext((prev) => ({
          ...prev,
          loggedIn: true,
          user: user,
          received: receivedNoties || [],
          sent: sentNoties || [],
          dataLoaded: true,
        }));

        updateGroups(user);
      } else {
        removeUserId();
        removeToken();
      }
    }
  };

  useEffect(() => {
    if (!userContext.dataLoaded) {
      updateUser();
    }
  }, [userContext]); // eslint-disable-line

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <GroupsContext.Provider value={[groupsContext, setGroupsContext]}>
        <QuestionsContext.Provider
          value={[questionsContext, setQuestionsContext]}
        >
          <Router>
            <Navigation />

            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Registration />
              </Route>
              <Route path="/board">
                <BoardPage />
              </Route>
              <Route path="/groups">
                <GroupsPage />
              </Route>
              <Route path="/question-group/:id">
                <QuestionsPage />
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
          </Router>
        </QuestionsContext.Provider>
      </GroupsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
