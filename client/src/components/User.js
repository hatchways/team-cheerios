import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      height: 40,
    },
    avatar: {
      marginRight: theme.spacing(1),
      width: 40,
      height: 40,
    },
    userName: {
      fontSize: 18,
      textTransform: "none",
      color: "black",
    },
  })
);

export default function Friend({ name, image }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={name} src={image} className={classes.avatar} />
      <span className={classes.userName}>{name}</span>
    </div>
  );
}
