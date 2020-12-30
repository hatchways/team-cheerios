import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  NAVBAR_HEIGHT,
  MOBILE_NAV_HEIGHT,
  BOTTOM_NAV_HEIGHT,
} from "../utils/constants";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  children: {
    display: "flex",
    marginTop: NAVBAR_HEIGHT,
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,

    [theme.breakpoints.down("sm")]: {
      marginTop: MOBILE_NAV_HEIGHT,
      height: `calc(100vh - ${MOBILE_NAV_HEIGHT + BOTTOM_NAV_HEIGHT}px)`,
    },
  },
}));

export default function DashboardLayout({ children, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />

      <div className={classes.children} {...props}>
        {children}
      </div>

      <BottomNav />
    </div>
  );
}
