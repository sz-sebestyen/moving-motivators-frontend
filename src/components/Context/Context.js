import React from "react";

/**
 * Context module is responsible for the contexts used in the app
 * and keeping the user logged in between sessions by saving the
 * user id and token to localStorage.
 */

export const UserContext = React.createContext();
export const GroupsContext = React.createContext();
export const QuestionsContext = React.createContext();

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

/**
 * Default value given to the states in App which manage the contexts.
 */
export const defaultUser = {
  loggedIn: false,
  dataLoaded: false,
  user: {},
  sent: [],
  received: [],
};

export const defaultGroups = [];

export const defaultQuestions = [];
