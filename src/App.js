import Router from "./screens/Router";

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
          <Router />
        </QuestionsContext.Provider>
      </GroupsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
