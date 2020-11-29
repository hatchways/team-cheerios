import React from "react";
import { Route, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import { UserContext } from "../contexts/UserContext";

export default function PublicRoute({
  component: Component,
  restricted = true,
  ...rest
}) {
  const { state } = React.useContext(UserContext);
  const authenticated = state.authenticated ?? false;

  if (state.loading)
    return (
      <CircularProgress
        style={{ position: "absolute", left: "50%", top: "50%" }}
      />
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
