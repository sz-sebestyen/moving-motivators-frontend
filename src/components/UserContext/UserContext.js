import React from "react";

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

export const user = {
  loggedIn: false,
  token: "",
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  company: "",
  position: "",
  defaultCards: [],
  groups: [],
};
