import MMBoard from "./components/MMBoard/MMBoard.component";
import ContextForm from "./components/ContextForm/ContextForm";
import Profile from "./components/Profile/Profile";

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
          <Navigation />

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
              <Route path="/profile">
                <Profile />
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

function Navigation(props) {
  const [active, setActive] = useState(0);

  const links = [
    <Link to="/">Home</Link>,
    <Link to="/board">Board</Link>,
    <Link to="/groups">My groups</Link>,
    <Link to="/profile">Profile</Link>,
    <LogInOutLink to="/login" />,
  ];
  return (
    <nav>
      <ul>
        {links.map((link, index) => {
          return (
            <li
              key={index}
              className={index === active ? "active" : ""}
              onClick={(event) => setActive(index)}
            >
              {link}
            </li>
          );
        })}
      </ul>
    </nav>
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
