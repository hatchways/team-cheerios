import axios from "axios";

import {
  SET_ACTIVE_USERS,
  SET_UNAUTHENTICATED,
  SET_USER,
} from "../contexts/types";
import socket, { socketWithToken } from "../utils/socket";

const TOKEN_KEY = "HatchwayToken";

export const checkLoggedIn = async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;

    try {
      const res = await axios.get("/api/users/me");
      const { name, image, email, _id } = res.data;
      dispatch({
        type: SET_USER,
        payload: { user: { name, image, email, _id } },
      });
      socket.emit("log in", _id);
      setActiveUsers(dispatch);
    } catch (err) {
      dispatch({ type: SET_UNAUTHENTICATED });
      console.error(err);
    }
  } else {
    dispatch({ type: SET_UNAUTHENTICATED });
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post("/api/auth", user);
    setToken(res.data.token);
    socketWithToken(res.data.token).emit("log in", res.data.user?._id);
    return res.data.user;
  } catch (err) {
    console.error(err);
  }
};

export const signup = async (user) => {
  try {
    const res = await axios.post("/api/users", user);
    setToken(res.data.token);
    socketWithToken(res.data.token).emit("log in", res.data.user?._id);
    return res.data.user;
  } catch (err) {
    console.error(err);
  }
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common["x-auth-token"] = token;
};

export const logout = (userId, dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common["x-auth-token"];
  dispatch({ type: SET_UNAUTHENTICATED });
  socket.emit("log out", userId).disconnect();
};

export const setActiveUsers = (dispatch) =>
  socket.on("online users", (data) => {
    dispatch({
      type: SET_ACTIVE_USERS,
      payload: { activeUsers: new Set(data) },
    });
  });
