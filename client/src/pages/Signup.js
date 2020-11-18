import React from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function Signup() {
  const { state } = React.useContext(UserContext);
  let history = useHistory();

  if (state.authenticated) history.push("/dashboard");

  return (
    <div>
      <h1>This is our Signup page.</h1>
    </div>
  );
}
