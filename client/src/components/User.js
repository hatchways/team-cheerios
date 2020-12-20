import React from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

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
      right: "5%",
      width: 14,
      height: 14,
      borderRadius: 7,
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
