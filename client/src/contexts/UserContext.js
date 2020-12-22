import React from "react";

import { checkLoggedIn } from "../apis/user";
import socket from "../utils/socket";

import {
  LOADING_USER,
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_ACTIVE_USERS,
} from "./types";

const initialState = {
  authenticated: false,
  loading: true,
  user: {},
  token: null,
  error: null,
  activeUsers: null,
};

export const UserContext = React.createContext(initialState);

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.payload.activeUsers,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(UserReducer, initialState);

  React.useEffect(() => {
    checkLoggedIn(dispatch);
  }, []);

  React.useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
