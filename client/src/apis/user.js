import axios from "axios";

const TOKEN_KEY = "HatchwayToken";

export const checkLoggedIn = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;

    return axios
      .get("/api/users/me")
      .then((res) => res.data)
      .catch((err) => console.error(err));
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
