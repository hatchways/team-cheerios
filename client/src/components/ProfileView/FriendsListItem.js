import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    height: 28,
  },
  closeIcon: {
    height: "1rem",
    width: "1rem",
    color: "#0000008A",
  },
  avatar: {
    margin: "0 0.75rem",
    width: 28,
    height: 28,
  },
  name: {},
}));

export default function FriendsListItem({ name, image, ...rest }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CloseIcon className={classes.closeIcon} />
      <Avatar alt={name} src={image} className={classes.avatar} />
      <span className={classes.name}>{name}</span>
    </div>
  );
}
