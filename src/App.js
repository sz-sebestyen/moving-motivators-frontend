import MMBoard from "./components/MMBoard/MMBoard.component";
import ContextForm from "./components/ContextForm/ContextForm";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import React, { useContext, useState } from "react";

import "./App.css";

import { UserContext, user } from "./components/UserContext/UserContext";

import QuestionGroups from "./components/QuestionGroups/QuestionGroups";

function App() {
  const [userContext, setUserContext] = useState(user);
  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
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
                <LogInOutLink to="/login" />
              </li>
            </ul>
          </nav>

          <div className="pages">
            <Switch>
              <Route path="/login">
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

function LogInOutLink(props) {
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    <React.Fragment>
      {userContext.loggedIn ? (
        <Link
          {...props}
          onClick={(event) =>
            setUserContext((prev) => ({ ...prev, loggedIn: false }))
          }
        >
          Log out
        </Link>
      ) : (
        <Link {...props}>Log in</Link>
      )}
    </React.Fragment>
  );
}

function Home() {
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    <React.Fragment>
      <p>{userContext.loggedIn ? "logged in" : "logged out"}</p>
    </React.Fragment>
  );
}

export default App;
