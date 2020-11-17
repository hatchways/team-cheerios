import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      margin: "0 1rem",
      borderRadius: 25,
      padding: "0 1.5rem",
      height: 50,
    },
  })
);

export default function OutlinedBtn({ children, ...props }) {
  const classes = useStyles();

  return (
    <Button variant="outlined" className={classes.btn} {...props}>
      {children}
    </Button>
  );
}
