import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import { NAVBAR_HEIGHT } from "../utils/constants";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
    },
    children: {
      paddingTop: NAVBAR_HEIGHT,
    },
  })
);

export default function DashboardLayout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />

      <section className={classes.children}>{children}</section>
    </div>
  );
}
