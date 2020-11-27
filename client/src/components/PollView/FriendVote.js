import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

dayjs.extend(relativeTime);

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #E8EBF6",
    padding: "0 2rem",
    maxWidth: 600,
    height: 100,
  },
  friendName: {
    flexGrow: 1,
    paddingLeft: "1rem",
  },
  votedImage: {
    width: 60,
    height: 60,
    objectFit: "cover",
  },
}));

export default function FriendVote({
  name,
  image,
  voteFor,
  updatedAt,
  images,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={name} src={image} />

      <div className={classes.friendName}>
        <Typography variant="h6">{name}</Typography>

        <Typography variant="body2" color="textSecondary">
          {dayjs(updatedAt).fromNow()}
        </Typography>
      </div>

      <img
        src={voteFor === "1" ? images[0] : images[1]}
        alt={`${name}'s choice`}
        className={classes.votedImage}
      />
    </div>
  );
}
