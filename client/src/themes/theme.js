import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
  palette: {
    primary: { main: "#DF1B1B" },
  },
});
