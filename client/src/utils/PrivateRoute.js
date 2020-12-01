import React from "react";
import { Route, Redirect } from "react-router-dom";

import DashboardSkeleton from "../components/Skeletons/DashboardSkeleton";
import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const {
    state: { authenticated, loading },
  } = React.useContext(UserContext);

  return !loading ? (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  ) : (
    <DashboardSkeleton />
  );
}
