import React from "react";
import { useHistory } from "react-router-dom";

import { LOADING_USER, SET_AUTHENTICATED, SET_USER } from "../contexts/types";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const { state, dispatch } = React.useContext(UserContext);
  let history = useHistory();

  if (state.authenticated) history.push("/dashboard");

  const handleClick = () => {
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

  // for checking purpose
  const handleLoading = () => {
    dispatch({ type: SET_AUTHENTICATED });
    dispatch({ type: LOADING_USER });

    history.push("/dashboard");
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>This is our Login page.</h1>

      {/* for checking */}
      <button onClick={handleClick}>authenticate</button>
      <button onClick={handleLoading}>loading(skeleton)</button>
    </div>
  );
}
