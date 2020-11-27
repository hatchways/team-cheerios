import axios from "axios";
import React from "react";

import socket from "../utils/socket";

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
      return initialState;
    default:
      return state;
  }
};

const token = localStorage.HatchwayToken;

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(UserReducer, initialState);

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;

      axios
        .get("/api/users/me")
        .then(({ data: { name, image, email } }) => {
          dispatch({
            type: SET_USER,
            payload: { user: { name, image, email } },
          });
        })
        .catch((err) => console.error(err));
    }
  }, []);

  React.useEffect(() => {
    socket.emit("login");

    return () => {
      socket.emit("logout");
    };
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
