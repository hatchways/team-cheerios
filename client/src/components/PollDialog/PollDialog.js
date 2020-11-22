import React from "react";
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

import SubmitPoll from "../../utils/SubmitPoll";
import DialogContents from "./DialogContents";
import DropZone from "./DropZone";

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
    top: "1rem",
    right: "1rem",
  },
  contentWrapper: {
    display: "flex",
  },
  dropZoneWrapper: {
    display: "flex",
    flex: "50%",
    justifyContent: "space-around",
  },
}));

export default function Poll({ open, handleClose, ...props }) {
  const classes = useStyles();
  const [topImage, setTopImage] = React.useState(null);
  const [botImage, setBotImage] = React.useState(null);
  const [text, setText] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");

  const onChangeList = (newList) => {
    setSelectedOption(newList);
  };
  const OnChangeText = (newText) => {
    setText(newText);
  };

  const handleChangeTop = (newFile) => {
    setTopImage(newFile);
  };
  const handleChangeBot = (newFile) => {
    setBotImage(newFile);
  };

  const handleSubmitPoll = (event) => {
    event.preventDefault();

    if (topImage && botImage && text && selectedOption) {
      let formData = new FormData();
      formData.append("image", topImage);
      formData.append("image", botImage);
      SubmitPoll(formData, text, selectedOption);
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      {...props}
    >
      <DialogTitle className={classes.title}>Create a Poll</DialogTitle>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.contentWrapper}>
        <DialogContents
          onChangeList={onChangeList}
          onChangeText={OnChangeText}
        />

        <div className={classes.dropZoneWrapper}>
          <DropZone onChange={handleChangeTop} accept="image/*" />
          <DropZone onChange={handleChangeBot} accept="image/*" />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmitPoll} className={classes.btn}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
