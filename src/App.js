import MMBoard from "./components/MMBoard/MMBoard";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Timeline from "./components/Timeline/Timeline";
import QuestionGroups from "./components/QuestionGroups/QuestionGroups";
import { UserContext, appContext } from "./components/UserContext/UserContext";
import Navigation from "./components/Navigation/Navigation";
import { getToken, getUserId } from "./components/UserContext/UserContext";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";

import "./App.css";

function App() {
  const [userContext, setUserContext] = useState(appContext);

  useEffect(() => {
    console.log("userContext changed ", userContext);
  }, [userContext]);

  useEffect(() => {
    if (getToken() && getUserId()) {
      setUserContext((prev) => ({
        ...prev,
        loggedIn: true,
      }));
    }
  }, []);

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <Router>
        <div className="App" onDragStart={(event) => event.preventDefault()}>
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
    </UserContext.Provider>
  );
}

function Home() {
  const [userContext] = useContext(UserContext);
  return <p>{userContext.loggedIn ? "logged in" : "logged out"}</p>;
}

export default App;
