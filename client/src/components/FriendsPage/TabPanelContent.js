import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import FriendCard from "./FriendCard";

const useStyles = makeStyles({
  list: {
    margin: "0 auto",
    height: "60vh",
    overflow: "scroll",
  },
});

export default function TabPanelContent({
  friends,
  index,
  keywords,
  setKeywords,
}) {
  const classes = useStyles();

  const handleClick = (id) => {
    console.log(`change friendId:${id} status`);
  };

  const handleChange = (e) => {
    const newKeywords = [...keywords];
    newKeywords[index] = e.target.value;

    setKeywords(newKeywords);
  };

  return !friends.length ? (
    <p>No Friends yet</p>
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

      <div className={classes.list}>
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
