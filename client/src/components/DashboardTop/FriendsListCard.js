import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import FriendsListItem from "./FriendsListItem";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    marginRight: "1.25rem",
    background: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(221, 224, 233, 0.5)",
    width: 340,
    height: 340,
    textDecoration: "none",
  },
  header: {
    borderBottom: "1px solid #E8EBF6",
    padding: "1.5rem",
    width: "100%",
    height: 90,
  },
  title: {
    textTransform: "capitalize",
  },
  settingIcon: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    color: "#0000008A",
  },
  list: {
    padding: "1.5rem",
    maxHeight: 250,
    overflow: "scroll",
  },
}));

export default function FriendsListCard({ ...data }) {
  const classes = useStyles();
  const { title, users } = data;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5" component="h3" className={classes.title}>
          {title}
        </Typography>

        <Typography variant="body1" component="p" color="textSecondary">
          {users.length} friends
        </Typography>

        <IconButton
          className={classes.settingIcon}
          onClick={() => console.log("edit friends list")}
        >
          <SettingsIcon />
        </IconButton>
      </div>

      <div className={classes.list}>
        {users.map((info, i) => (
          <FriendsListItem {...info} key={`friend-${i}`} />
        ))}
      </div>
    </div>
  );
}
