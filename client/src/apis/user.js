import axios from "axios";
import { SET_UNAUTHENTICATED, SET_USER } from "../contexts/types";

const TOKEN_KEY = "HatchwayToken";

export const checkLoggedIn = (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;

    return axios
      .get("/api/users/me")
      .then((res) => {
        const { name, image, email, _id: id } = res.data;
        dispatch({
          type: SET_USER,
          payload: { user: { name, image, email, id } },
        });
      })
      .catch((err) => console.error(err));
  }
  return false;
};

export const logout = (dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common["x-auth-token"];
  dispatch({ type: SET_UNAUTHENTICATED });
};
