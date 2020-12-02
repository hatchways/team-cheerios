import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";

import { createNewPoll, editPoll } from "../../apis/poll";
import uploadtoS3 from "../../utils/uploadtoS3";
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

export default function Poll({
  open,
  handleClose,
  editMode = false,
  ...props
}) {
  const classes = useStyles();
  const [topImage, setTopImage] = React.useState(null);
  const [botImage, setBotImage] = React.useState(null);
  const [question, setQuestion] = React.useState("");
  const [friendsListId, setFriendsListId] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    if (editMode) {
      const { question, images, friendsListId } = props.poll;
      setTopImage(images[0]);
      setBotImage(images[1]);
      setQuestion(question);
      setFriendsListId(friendsListId);
    }
  }, [editMode, props.poll]);

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

  const getImageUrl = async (data) => {
    let formData = new FormData();
    formData.append("image", data);

    return uploadtoS3(formData).then((res) => res[0]);
  };

  const handleSubmitPoll = async (event) => {
    event.preventDefault();
    setUploading(true);

    if (editMode) {
      let updatingData = { question, friendsListId, images: [] };

      updatingData.images[0] =
        typeof topImage === "string" ? topImage : await getImageUrl(topImage);

      updatingData.images[1] =
        typeof botImage === "string" ? botImage : await getImageUrl(botImage);

      await editPoll(props.poll._id, updatingData);

      setUploading(false);
      handleClose();
    } else {
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
      <DialogTitle className={classes.title}>
        {editMode ? "Edit My Poll" : "Create a Poll"}
      </DialogTitle>

      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.contentWrapper}>
        <DialogContents
          defaultList={friendsListId}
          defaultQuestion={question}
          onChangeList={onChangeList}
          onChangeQuestion={OnChangeQuestion}
        />

        <div className={classes.dropZoneWrapper}>
          <DropZone
            onChange={handleChangeTop}
            accept="image/*"
            defaultImg={topImage}
          />
          <DropZone
            onChange={handleChangeBot}
            accept="image/*"
            defaultImg={botImage}
          />
        </div>
      </DialogContent>

      <DialogActions className={classes.btnWrapper} disableSpacing>
        <Button
          onClick={handleSubmitPoll}
          className={classes.btn}
          disabled={uploading}
          classes={{ disabled: classes.disabledButton }}
        >
          {editMode ? "Save Change" : "Create"}
        </Button>
        {uploading && (
          <CircularProgress size={30} className={classes.btnProgress} />
        )}
      </DialogActions>
    </Dialog>
  );
}
