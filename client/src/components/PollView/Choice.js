import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import HeartIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(() => ({
  choice: {
    display: "flex",
    flexDirection: "column",
    marginRight: "0.5rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textAlign: "center",
    cursor: "pointer",
  },
  image: {
    marginBottom: "0.75rem",
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > svg": {
      width: "1rem",
      height: "0.875rem",
      color: "#FF5D5D",
    },
  },
}));

export default function Choice({ image, vote, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.choice} {...props}>
      <img src={image} alt="choice" className={classes.image} />
      <span className={classes.likes}>
        <HeartIcon />
        {vote}
      </span>
    </div>
  );
}
