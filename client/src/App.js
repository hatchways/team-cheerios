import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { theme } from "./themes/theme";
import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
