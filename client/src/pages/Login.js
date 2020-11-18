import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

import { SET_USER } from "../contexts/types";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { state, dispatch } = React.useContext(UserContext);
  let history = useHistory();

  if (state.authenticated) history.push("/dashboard");

  const handleClick = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
    };

    loginUser(newUser);
    dispatch({
      type: SET_USER,
      payload: {
        user: {
          name: "Hatchway",
          image: "",
        },
      },
    });
    history.push("/dashboard");
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>This is our Login page.</h1>

      <input
        id="email"
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="password"
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

const loginUser = async (user) => {
  try {
    const res = await axios.post("/api/auth", user);
    setAuth(res.data);
  } catch (err) {
    console.error(err);
  }
};

const setAuth = (token) => {
  localStorage.setItem("HatchwayToken", token);
  axios.defaults.headers.common["x-auth-token"] = token;
};
