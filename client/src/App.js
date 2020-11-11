import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PictureUpload from './pages/PictureUpload'
import { UserProvider } from "./contexts/UserContext";
import { theme } from "./themes/theme";
import PrivateRoute from "./utils/PrivateRoute";
import routes from "./routes";

function App() {
  return (
    <UserProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
        <Route path="/picture" component={PictureUpload} />

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
      </MuiThemeProvider>
    </UserProvider>
  );
}

export default App;
