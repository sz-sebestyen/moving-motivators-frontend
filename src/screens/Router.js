import Home from "./Home";
import Board from "./Board";
import Login from "./Login";
import Profile from "./Profile";
import Timeline from "./Timeline";
import Groups from "./Groups";
import QuestionGroup from "./QuestionGroup";
import Question from "./Question";
import Register from "./Register";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/board">
        <Board />
      </Route>

      <Route path="/groups">
        <Groups />
      </Route>

      <Route path="/question-group/:id">
        <QuestionGroup />
      </Route>

      <Route path="/question/:groupId/:questionId">
        <Question />
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
  </BrowserRouter>
);

export default Router;
