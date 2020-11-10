import React from "react";

import {
  LOADING_USER,
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "./types";

const initialState = {
  authenticated: false,
  loading: true,
  user: {},
  token: null,
  error: null,
};

export const UserContext = React.createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
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
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true,
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      default:
        return state;
    }
  }, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
