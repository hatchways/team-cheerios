import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import { theme } from "./themes/theme";
import PrivateRoute from "./utils/PrivateRoute";
import routes from "./routes";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Switch>
            {routes.map((route, i) =>
              route.auth ? (
                <PrivateRoute
                  exact
                  path={route.path}
                  component={route.component}
                  key={`route-${i}`}
                />
              ) : (
                <Route
                  exact
                  path={route.path}
                  component={route.component}
                  key={`route-${i}`}
                />
              )
            )}
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
