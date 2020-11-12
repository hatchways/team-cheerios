import React from "react";
import DialogContents from "./DialogContents";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "2rem",
    textAlign: "center",
    "& h2": {
      fontSize: 25,
    },
  },
  btn: {
    margin: "1rem auto",
    borderRadius: 25,
    background: "#000000",
    padding: "0 1.5rem",
    height: 50,
    width: 150,
    color: "#FFFFFF",
    "&:hover": {
      border: "1px solid",
      background: "unset",
      color: "unset",
    },
  },
  closeButton: {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
  },
}));

export default function Poll({ open, handleClose, ...rest }) {
  const classes = useStyles();

  const handleClick = (event) => {
    //TODO: Poll creation

    handleClose();
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        {...rest}
      >
        <DialogTitle className={classes.title}>Create a Poll</DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <DialogContents handleClose={handleClose} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClick} className={classes.btn}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
}
