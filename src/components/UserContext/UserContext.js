import React, { useContext } from "react";
import { getUser } from "../requests/requests";

export const UserContext = React.createContext();

export const setToken = (token) => {
  return localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setUserId = (userId) => {
  return localStorage.setItem("userId", userId);
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const removeUserId = () => {
  localStorage.removeItem("userId");
};

/* export const UpdateAppContext = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const user = getUser(getUserId());

  if (user) {
    setUserContext((prev) => ({
      ...prev,
      user,
    }));
  }
  return user;
}; */

export const appContext = {
  loggedIn: false,
  email: "",
  user: {},
  roles: [],
};
