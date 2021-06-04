import Navigation from "../components/Navigation";

import Home from "./Home";

// pages
import BoardPage from "../components/BoardPage";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Timeline from "../components/Timeline";
import GroupsPage from "../components/GroupsPage";
import QuestionsPage from "../components/QuestionsPage";
import AnswerPage from "../components/AnswerPage/AnswerPage";
import Registration from "../components/Registration";

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
