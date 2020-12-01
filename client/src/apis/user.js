import axios from "axios";
import { SET_UNAUTHENTICATED, SET_USER } from "../contexts/types";

const TOKEN_KEY = "HatchwayToken";

export const checkLoggedIn = async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;

    try {
      const res = await axios.get("/api/users/me");
      const { name, image, email, _id: id } = res.data;
      dispatch({
        type: SET_USER,
        payload: { user: { name, image, email, id } },
      });
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
    return res.data.user;
  } catch (err) {
    console.error(err);
  }
};

export const signup = async (user) => {
  try {
    const res = await axios.post("/api/users", user);
    setToken(res.data.token);
    return res.data.user;
  } catch (err) {
    console.error(err);
  }
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common["x-auth-token"] = token;
};

export const logout = (dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common["x-auth-token"];
  dispatch({ type: SET_UNAUTHENTICATED });
};
