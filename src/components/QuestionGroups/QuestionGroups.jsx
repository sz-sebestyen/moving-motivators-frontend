import { UserContext } from "../UserContext/UserContext";
import React, { useContext, useState } from "react";

const QuestionGroups = (props) => {
  const user = useContext(UserContext);
  return (
    <div className="questionGroups">
      {user.loggedIn ? "My Groups" : "Log in to manage your question groups!"}
    </div>
  );
};

export default QuestionGroups;
