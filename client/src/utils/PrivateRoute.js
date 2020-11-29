import React from "react";
import { Route, Redirect } from "react-router-dom";

import DashboardSkeleton from "../components/Skeletons/DashboardSkeleton";
import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { state } = React.useContext(UserContext);
  const authenticated = state.authenticated ?? false;

  if (state.loading)
    return <Route {...rest} render={() => <DashboardSkeleton />} />;

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
