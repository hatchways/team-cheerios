import React from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {isEqual} from "lodash"

import User from "../User";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderBottom: "0.5px solid #E8EBF6",
      alignItems: "center",
      padding: "0.5rem",
      height: 64,
    },
    addBtn: {
      borderRadius: 15,
      background: "#62CD4D",
      height: 30,
      width: 64,
      color: "#FFFFFF",
      "&:hover": {
        border: "1px solid #62CD4D",
        background: "unset",
        color: "#62CD4D",
      },
    },
  })
);

export default function Friend({ user, friendsList, handleAdd, handleDelete }) {
  const classes = useStyles();

  const added = friendsList.some((id) => isEqual(id, user._id));

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        {added && (
          <IconButton onClick={() => handleDelete(user._id)}>
            <CloseIcon />
          </IconButton>
        )}
      </Grid>

      <Grid item xs>
        <User name={user.name} image={user.image} />
      </Grid>

      <Grid item xs={2}>
        {added ? (
          <Button disabled>Added</Button>
        ) : (
          <Button onClick={() => handleAdd(user._id)} className={classes.addBtn}>
            Add
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
