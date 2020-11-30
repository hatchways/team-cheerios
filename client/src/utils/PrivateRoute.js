import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { state } = React.useContext(UserContext);
  const authenticated = state.authenticated ?? false;
  const loading = state.loading;

  return (
    !loading && 
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    /> 
  );
}
