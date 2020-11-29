import React from "react";
import { checkLoggedIn } from "../apis/user";

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

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
