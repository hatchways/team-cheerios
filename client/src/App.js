import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import PictureUpload from './pages/PictureUpload'
import { theme } from "./themes/theme";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={PictureUpload} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
