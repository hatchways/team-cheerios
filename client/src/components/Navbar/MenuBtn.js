import React from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textDecoration: "none",
    },
    btn: {
      margin: "0 1rem",
      fontSize: 16,
      textTransform: "none",
    },
  })
);

export default function MenuBtn({ to, text, ...rest }) {
  const classes = useStyles();

  return (
    <Link to={to} className={classes.root} {...rest}>
      <Button className={classes.btn}>{text}</Button>
    </Link>
  );
}
