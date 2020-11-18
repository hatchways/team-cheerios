import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/PermIdentity";

import FriendCard from "./FriendCard";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    margin: "0 auto",
    height: "60vh",
    overflow: "scroll",
  },
  noFriends: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  },
  personIcon: {
    width: "5rem",
    height: "5rem",
    color: theme.palette.text.secondary,
  },
}));

export default function TabPanelContent({
  friends,
  index,
  keywords,
  setKeywords,
  handleClick,
}) {
  const classes = useStyles();

  const handleChange = (e) => {
    const newKeywords = [...keywords];
    newKeywords[index] = e.target.value;

    setKeywords(newKeywords);
  };

  return !friends.length ? (
    <div className={classes.noFriends}>
      <PersonIcon className={classes.personIcon} />
      <Typography variant="h6" component="p" color="textSecondary">
        No Friends Yet
      </Typography>
    </div>
  ) : (
    <>
      <TextField
        id={`friend-search-${index}`}
        fullWidth
        variant="outlined"
        value={keywords[index]}
        placeholder="Search Friends name"
        onChange={handleChange}
      />

      <div className={classes.cardWrapper}>
        {friends.map((friend, i) => (
          <FriendCard
            {...friend}
            handleClick={handleClick}
            key={`friend-${i}`}
          />
        ))}
      </div>
    </>
  );
}
