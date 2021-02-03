import React from "react";

export const UserContext = React.createContext();

export const user = {
  loggedIn: false,
  Id: "",
  firstName: "",
  lastName: "",
  company: "",
  position: "",
  groups: ["aasd", "dsa"],
};
