import MMBoard from "./components/MMBoard/MMBoard.component";
import ContextForm from "./components/ContextForm/ContextForm";
import Profile from "./components/Profile/Profile";
import Timeline from "./components/Timeline/Timeline";
import QuestionGroups from "./components/QuestionGroups/QuestionGroups";
import { UserContext, user } from "./components/UserContext/UserContext";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const testerUser = {
  name: "Testy Tester",
  company: "Test Corp.",
  position: "CEO",
};

function App() {
  const [userContext, setUserContext] = useState(user);
  const [resp, setResp] = useState();

  useEffect(() => {
    const putUser = async () => {
      try {
        const res = await axios.put(
          "https://codecool-moving-motivators.herokuapp.com/",
          testerUser
        );
        return res;
      } catch (error) {
        console.log("error: ", error);
      }
    };
    setResp(putUser());
    console.log("responses: ", resp);
  }, []);

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <Router>
        <div
          className="App"
          onDragStart={(event) => event.preventDefault()}
          onClick={() => console.log(resp)}
        >
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
  const [active, setActive] = useState(0);

  const links = [
    <Link to="/">Home</Link>,
    <Link to="/board">Board</Link>,
    <Link to="/groups">My groups</Link>,
    <Link to="/timeline">Timeline</Link>,
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
