import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Link } from "react-router-dom";

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

    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  friendName: {
    paddingLeft: "1rem",
  },
  spacer: {
    flexGrow: 1,
  },
  votedImage: {
    width: 60,
    height: 60,
    objectFit: "cover",
    float: "right",
  },
}));

export default function FriendVote({
  data: { name, image, voteFor, updatedAt, userId, pollId },
  images,
  ...rest
}) {
  const classes = useStyles();

  return (
    <div className={classes.root} {...rest}>
      <Link to={`/${userId}/profile`}>
        <Avatar alt={name} src={image} />
      </Link>

      <div className={classes.friendName}>
        <Link to={`/${userId}/profile`}>
          <Typography variant="h6">{name}</Typography>
        </Link>

        <Typography variant="body2" color="textSecondary">
          {dayjs(updatedAt).fromNow()}
        </Typography>
      </div>

      <Link to={`/dashboard/poll/${pollId}`} className={classes.spacer}>
        <img
          src={voteFor === "1" ? images[0] : images[1]}
          alt={`choice${voteFor}`}
          className={classes.votedImage}
        />
      </Link>
    </div>
  );
}
