import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import { NAVBAR_HEIGHT } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "0 2.5rem",
    background: "#FFFFFF",
    minHeight: NAVBAR_HEIGHT,
  },
  spacer: {
    flexGrow: 1,
  },
  rect: {
    marginLeft: "1.5rem",
    width: 150,
    height: 40,
  },
}));

export default function NavbarSkeleton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton variant="circle" height={50} width={50} />

      <div className={classes.spacer} />

      <Skeleton variant="rect" className={classes.rect} />
      <Skeleton variant="rect" className={classes.rect} />
      <Skeleton variant="rect" className={classes.rect} />
      <Skeleton variant="rect" className={classes.rect} />
    </div>
  );
}
