import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { UserProvider } from "./contexts/UserContext";
import { theme } from "./themes/theme";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import routes from "./routes";

function App() {
  return (
    <UserProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <Switch>
            {routes.map((route, i) =>
              route.auth ? (
                <PrivateRoute
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                  key={`route-${i}`}
                />
              ) : (
                <PublicRoute
                  exact
                  path={route.path}
                  component={route.component}
                  key={`route-${i}`}
                />
              )
            )}
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserProvider>
  );
}

export default App;
