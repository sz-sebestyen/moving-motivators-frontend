import { UserContext } from "../UserContext/UserContext";
import React, { useContext, useState } from "react";

const QuestionGroups = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  console.log(userContext.groups.join());
  return (
    <div className="questionGroups">
      {userContext.loggedIn
        ? `My Groups ${userContext.groups.join()}` // ${userContext.groups.join()}
        : "Log in to manage your question groups!"}
    </div>
  );
};

export default QuestionGroups;
