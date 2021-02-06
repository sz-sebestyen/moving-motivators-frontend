import MMBoard from "./components/MMBoard/MMBoard";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Timeline from "./components/Timeline/Timeline";
import QuestionGroups from "./components/QuestionGroups/QuestionGroups";
import { UserContext, user } from "./components/UserContext/UserContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import React, { useContext, useState } from "react";

import "./App.css";

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

function Navigation(props) {
  const links = [
    <NavLink to="/" activeClassName="activeNavLink" exact>
      Home
    </NavLink>,
    <NavLink to="/board" activeClassName="activeNavLink">
      Board
    </NavLink>,
    <NavLink to="/groups" activeClassName="activeNavLink">
      My groups
    </NavLink>,
    <NavLink to="/timeline" activeClassName="activeNavLink">
      Timeline
    </NavLink>,
    <NavLink to="/profile" activeClassName="activeNavLink">
      Profile
    </NavLink>,
    <LogInOutLink to="/login" activeClassName="activeNavLink" />,
  ];
  return (
    <nav>
      <ul>
        {links.map((link, index) => {
          return <li key={index}>{link}</li>;
        })}
      </ul>
    </nav>
  );
}

function LogInOutLink(props) {
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    <>
      {userContext.loggedIn ? (
        <NavLink
          {...props}
          onClick={(event) =>
            setUserContext((prev) => ({ ...prev, loggedIn: false }))
          }
        >
          Log out
        </NavLink>
      ) : (
        <NavLink {...props}>Log in</NavLink>
      )}
    </>
  );
}

function Home() {
  const [userContext] = useContext(UserContext);
  return <p>{userContext.loggedIn ? "logged in" : "logged out"}</p>;
}

export default App;
