import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      margin: "1rem auto",
    },
    circle: {
      marginRight: "1rem",
      width: 40,
      height: 40,
    },
    text: {
      width: 120,
    },
  })
);
export default function UserSkeleton({ props }) {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      <Skeleton variant="circle" className={classes.circle} />
      <Skeleton variant="text" className={classes.text} />
    </div>
  );
}
