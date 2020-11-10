import React from "react";
import { useHistory } from "react-router-dom";

import { SET_USER } from "../contexts/types";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const { state, dispatch } = React.useContext(UserContext);
  let history = useHistory();

  if (state.authenticated) history.push("/");

  const handleClick = (e) => {
    e.preventDefault();

    dispatch({
      type: SET_USER,
      payload: {
        user: {
          name: "Hatchway",
          image: "",
        },
      },
    });
    history.push("/");
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>This is our Login page.</h1>

      <button onClick={handleClick}>authenticate</button>
    </div>
  );
}
