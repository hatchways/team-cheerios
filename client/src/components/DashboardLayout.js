import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import { NAVBAR_HEIGHT } from "../utils/constants";
import Navbar from "./Navbar";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    },
    children: {
      display: "flex",
      marginTop: NAVBAR_HEIGHT,
    },
  })
);

export default function DashboardLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />

      <div className={classes.children}>{children}</div>
    </div>
  );
}
