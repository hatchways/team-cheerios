import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      height: 40,
    },
    avatar: {
      width: 40,
      height: 40,
    },
    badge: {
      width: 12,
      height: 12,
      borderRadius: 6,
      border: "2px solid #FFFFFF",
      backgroundColor: "#48DF2A",
    },
    name: {
      marginLeft: "0.75rem",
      fontSize: "1rem",
      textTransform: "none",
      color: "black",
    },
  })
);

export default function User({ _id, name, image, active, ...rest }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={rest?.style}>
      <Link to={`/${_id}/profile`} style={{ textDecoration: "none" }}>
        <Badge
          invisible={!active}
          overlap="circle"
          variant="dot"
          color="secondary"
          classes={{ badge: classes.badge }}
        >
          <Avatar alt={name} src={image} className={classes.avatar} />
        </Badge>
        <span className={classes.name}>{name}</span>
      </Link>
    </div>
  );
}
