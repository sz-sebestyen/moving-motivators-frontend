import MMBoard from "./components/MMBoard/MMBoard.component";
import ContextForm from "./components/ContextForm/ContextForm";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import React, { useContext } from "react";

import "./App.css";

import { UserContext, user } from "./components/UserContext/UserContext";

import QuestionGroups from "./components/QuestionGroups/QuestionGroups";

function App() {
  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className="App" onDragStart={(event) => event.preventDefault()}>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/board">Board</Link>
              </li>
              <li>
                <Link to="/groups">My groups</Link>
              </li>
              <li>
                <Link to="/form">Form</Link>
              </li>
            </ul>
          </nav>

          <div className="pages">
            <Switch>
              <Route path="/form">
                <ContextForm />
              </Route>
              <Route path="/board">
                <MMBoard />
              </Route>
              <Route path="/groups">
                <QuestionGroups />
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
  const user = useContext(UserContext);
  return (
    <React.Fragment>
      <p>{user.loggedIn ? "logged in" : "logged out"}</p>
    </React.Fragment>
  );
}

export default App;
