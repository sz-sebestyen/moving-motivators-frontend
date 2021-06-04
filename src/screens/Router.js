import Navigation from "../components/Navigation";

import Home from "./Home";

// pages
import BoardPage from "./BoardPage";
import Login from "./Login";
import Profile from "./Profile";
import Timeline from "./Timeline";
import GroupsPage from "./GroupsPage";
import QuestionsPage from "./QuestionsPage";
import AnswerPage from "./AnswerPage/AnswerPage";
import Registration from "./Registration";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default Router;
