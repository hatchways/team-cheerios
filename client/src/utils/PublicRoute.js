import React from "react";
import { Route, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import { UserContext } from "../contexts/UserContext";

const styles = { position: "absolute", left: "50%", top: "50%" };

export default function PublicRoute({
  component: Component,
  restricted = true,
  ...rest
}) {
  const {
    state: { authenticated, loading },
  } = React.useContext(UserContext);

  return loading ? (
    <CircularProgress style={styles} />
  ) : (
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
