import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { changeYourVote } from "../../apis/poll";

export default function ConfirmationDialog({
  pollId,
  vote,
  open,
  setReload,
  handleClose,
}) {
  const handleChange = async () => {
    await changeYourVote(pollId, vote).then(() => {
      setReload(true);
      handleClose();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle>Changing Your Opinion</DialogTitle>

      <DialogContent>
        <DialogContentText color="inherit">
          You already voted. Do you want change your vote?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleChange} color="primary">
          Yes, change my vote
        </Button>
      </DialogActions>
    </Dialog>
  );
}
