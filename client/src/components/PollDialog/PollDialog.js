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
  CircularProgress,
} from "@material-ui/core";

import { createNewPoll } from "../../apis/poll";
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
    flexWrap: "wrap",
  },
  dropZoneWrapper: {
    display: "flex",
    flex: "50%",
    flexWrap: "wrap",
    justifyContent: "space-around",
    position: "relative",
  },
  btnWrapper: {
    position: "relative",
  },
  btnProgress: {
    color: "tomato",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -15,
    marginLeft: -15,
  },
  disabledButton: {
    background: "#999999",
    color: "unset",
  },
}));

export default function Poll({ open, handleClose, ...props }) {
  const classes = useStyles();
  const [topImage, setTopImage] = React.useState(null);
  const [botImage, setBotImage] = React.useState(null);
  const [question, setQuestion] = React.useState("");
  const [friendsListId, setFriendsListId] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  const onChangeList = (newList) => {
    setFriendsListId(newList);
  };
  const OnChangeQuestion = (newQuestion) => {
    setQuestion(newQuestion);
  };

  const handleChangeTop = (newFile) => {
    setTopImage(newFile);
  };
  const handleChangeBot = (newFile) => {
    setBotImage(newFile);
  };

  const handleSubmitPoll = (event) => {
    event.preventDefault();
    setUploading(true);

    if (topImage && botImage && question && friendsListId) {
      let formData = new FormData();
      formData.append("image", topImage);
      formData.append("image", botImage);

      createNewPoll(formData, {
        question,
        friendsListId,
      }).then(() => {
        setUploading(false);
        handleClose();
      });
    } else {
      setUploading(false);
      handleClose();
    }
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
          onChangeQuestion={OnChangeQuestion}
        />

        <div className={classes.dropZoneWrapper}>
          <DropZone onChange={handleChangeTop} accept="image/*" />
          <DropZone onChange={handleChangeBot} accept="image/*" />
        </div>
      </DialogContent>

      <DialogActions className={classes.btnWrapper} disableSpacing>
        <Button
          onClick={handleSubmitPoll}
          className={classes.btn}
          disabled={uploading}
          classes={{ disabled: classes.disabledButton }}
        >
          Create
        </Button>
        {uploading && (
          <CircularProgress size={30} className={classes.btnProgress} />
        )}
      </DialogActions>
    </Dialog>
  );
}
